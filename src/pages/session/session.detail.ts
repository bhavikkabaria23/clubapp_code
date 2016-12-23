import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController} from 'ionic-angular';

import {Session} from '../../models/session';
// import {Player} from '../../models/player';
// import {Coach} from '../../models/coach.detail';
import {Skill} from '../../models/skill';
import {SharedService} from '../../providers/shared.service';
import {SessionService} from '../../providers/session.service';
import { SkillListPopup } from './skill.list.pop';
import { PlayerListPage } from '../player/player.list';
import { CoachListPage } from '../coach/coach.list';
import { AssessmentService } from '../../providers/assessment.service';
import {AssessmentPlayerPopup} from '../assessment/assessment.player.popup';
import {AssessmentCreatePage} from '../assessment/assessment.create';

import * as resources from '../../app/resources'

@Component({
    selector: 'page-session-detail',
    templateUrl: 'session.detail.html'
})

export class SessionDetailPage implements OnInit {
    session: Session;
    playerList: any[];
    coachList: any[];
    skillList: Skill[];
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public sessionService: SessionService,
        public sharedService: SharedService,
        private viewCtrl: ViewController,
        public modalCtrl: ModalController,
        public assessmentService: AssessmentService
    ) {
        this.session = new Session();
    }

    ngOnInit() {
        // if (this.navParams.get('sessionKey') != undefined) {
        //     this.session.sessionKey = this.navParams.get('sessionKey');
        //     this.sessionService.getAllBySession(this.session.sessionKey).subscribe((res) => {                
        //         this.session = res.session;
        //         console.log(res);
        //         this.playerList = res.players;
        //         this.coachList = res.coaches;
        //         this.skillList = this.session.skills;
        //     });
        // }
    }
    ionViewWillEnter() {
        this.checkSessions();    
    }
    checkSessions() {
        if (this.navParams.get('sessionKey') != undefined) {
            this.session.sessionKey = this.navParams.get('sessionKey');
        this.sessionService.getAllBySession(this.session.sessionKey).subscribe((res) => {    
            //console.log(res);
            this.session = res.session;
            this.playerList = res.players;
            this.coachList = res.coaches;
            this.playerList.map(res2 => {
              let assessmentObj: any = {
                  player_id:res2.playerID,
                  sessionKey:this.session.sessionKey
              }
              res2.thumbnail = resources.url.defaultImagePath;
              if (res2.hasOwnProperty('images') && res2.images != null && res2.images.length > 0) {
                
                for (let img of res2.images) {
                    if (img.name == 'main_thumb') {
                        res2.thumbnail = img.url;
                    }
                }
              }
              res2.assessAvg = 0;
              this.assessmentService.checkExists(assessmentObj)
              .subscribe(res3 => {
                  res2.assessed = res3.length;
                  res2.assessments = res3;
                  //console.log(res3);
                  let avgCount = 0;
                  res2.assessments.map(res4=> {
                    if(!res2.coachAssessed)
                        res2.coachAssessed = res4.coach_id===this.sharedService.getter().fFANumber;
                    //console.log(res4);
                    res4.assessments.map(scores => {
                        res2.assessAvg += scores.rating;
                        avgCount++;
                    });
                    
                  });
                  res2.assessAvg = res2.assessAvg/avgCount;
              });
            });
            this.coachList.map(res2 => {
              res2.thumbnail = resources.url.defaultImagePath;
              if (res2.hasOwnProperty('images') && res2.images != null && res2.images.length > 0) {
                
                for (let img of res2.images) {
                    if (img.name == 'main_thumb') {
                        res2.thumbnail = img.url;
                    }
                }
              }
            });
            this.sharedService.dismissLoading();
        });
                
        }
    }
    showSkills() {
        this.sharedService.presentLoading();
        this.navCtrl.push(SkillListPopup, {
            session: this.session
        });
    }

    addCoach() {
        this.sharedService.presentLoading();
        this.navCtrl.push(CoachListPage, {
            session: this.session,
            selection: true
        });
    }
    addPlayer() {
        this.sharedService.presentLoading();
        this.navCtrl.push(PlayerListPage, {
            session: this.session,
            selection: true
        });
    }
    playerClick(player) {
        if(this.sharedService.role===4||this.sharedService.role===1) {
            this.listAssessment(player);
        } else if (this.sharedService.role===3) {
            this.playerAssessment(player);
        }
    }
    playerAssessment(player) {
        this.sharedService.presentLoading();
        //console.log(player);
        this.navCtrl.push(AssessmentCreatePage, {
            player: player,
            session: this.session,
        });
    }
    listAssessment(player) {
        this.sharedService.presentLoading();
        this.navCtrl.push(AssessmentPlayerPopup, {
            session: this.session,
            player: player
        }); 

    }
    position(num) {
        return resources.common.getPreferredPlayingPosition(num);
    }
    removeSkills(skillInd) {
        this.session.skills.splice(skillInd, 1);
        this.sessionService.Update(this.session).subscribe(res=> {
            //console.log(res);
        })
    }
}