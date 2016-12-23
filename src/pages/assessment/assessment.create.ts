import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../providers/assessment.service';
import { SharedService } from '../../providers/shared.service';
import { AssessmentSessionListPage } from '../../pages/assessment/assessment.session.list';
import { InstructionsPop } from './instructions.pop';
import { PlayerDetailPage } from '../player/player.detail'
import { PlayerService } from '../../providers/player.service';

import * as resources from '../../app/resources'

@Component({
    selector: 'page-assessment-create',
    templateUrl: 'assessment.create.html'
})
export class AssessmentCreatePage implements OnInit {
    assessmentNew: any = {};
    session: any;
    player: any = {};
    editing = false;
    cloudinaryThumbUri: string = resources.url.defaultImagePath;

    constructor(public navCtrl: NavController,
        public assessmentService: AssessmentService,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public sharedService: SharedService,
        public playerService: PlayerService,
        private viewCtrl: ViewController,
        public popOverCtrl: PopoverController) {
        // this.assessmentNew = new Assessment();
        //player info and session infor should be passed through when they coach logs in.
        //either passed through or saved in shared service.
        // this.player = {
        // this.player.fname = this.navParams.get('playerFName');
        // this.player.lname = this.navParams.get('playerLName');
        // this.assessmentNew.player_id = this.navParams.get('playerId');
        // this.player.img = this.navParams.get('playerImg');
        // }
        // this.session = {skills:[]};
        this.session = this.navParams.get('session');
        //console.log(this.session);
        // this.assessmentNew.assessments = [
        //     {name:'test', rating: 0, instructions:'this is how we do it'},
        //     {name:'test2', rating: 0, instructions:'this is how we do it'},
        //     {name:'test3', rating: 0, instructions:'this is how we do it'},
        //     {name:'test4', rating: 0, instructions:'this is how we do it'}
        // ];
        this.assessmentNew.assessments = this.session.skills;
        this.assessmentNew.coach_id = this.sharedService.getter().fFANumber;
        this.player = this.navParams.get('player');
        this.assessmentNew.player_id = this.player.playerID
        // this.session.sessionKey = this.navParams.get('sessionKey');
        this.assessmentNew.sessionKey = this.session.sessionKey;
        this.assessmentNew.position = this.session.position;
        this.assessmentNew.note = '';
    }

    // cancel() {
    //     console.log('im the assessment cancel');
    //     console.log(this.assessmentNew);
    //     this.navCtrl.setRoot(AssessmentSessionListPage);
    // }
    ngOnInit() {
        //check if current combo exists already (coach id, player id, session id)
        //set to edit mode first if it does
        // this.assessmentService.getAll().subscribe(res=> {
        //     console.log(res);
        //     console.log('get all assessment');
        // });
        this.playerService.getById(this.player._id).subscribe((obj) => {
            this.player.ffaNumber = obj.fFANumber;
            this.player.ageGroup = obj.ageGroup;
            this.player.position = resources.common.getPreferredPlayingPosition(obj.preferredPlayingPosition);
            this.player.fname = obj.givenName;
            this.player.lname = obj.familyName;
            // this.player.img = ;
            obj.images.map(entry => {
                if (entry.name === 'main_thumb') {
                    this.cloudinaryThumbUri = entry.url;
                }
            });


        });
        this.assessmentService.checkExists(this.assessmentNew).subscribe(res => {
            //console.log(this.assessmentNew);
            //console.log(res);
            if (res.length > 0) {
                this.editing = true;
                this.assessmentNew = res[0];
            }
            //console.log('check if current exists');
        });

    }
    // changeRating(skill: any, num: number) {
    //     console.log(skill);
    //     console.log(num);
    //     skill.rating = num;
    // }
    showInfo(instructions: string) {
        let popover = this.popOverCtrl.create(InstructionsPop, { instructions: instructions });
        popover.present();
    }

    viewPlayer() {
        this.sharedService.presentLoading();
        this.navCtrl.push(PlayerDetailPage, {
            playerid: this.player.id
        });
    }
    save() {
        // this.assessmentNew.player_id = this.player.id;
        // this.assessmentNew.coach_id = this.session.coach_id;
        // this.assessmentNew.assessments = this.session.skills.splice();
        // this.assessmentNew.sessionKey = this.session.sessionKey;
        // this.assessmentNew.note = this.session.note;
        //console.log('im the assessment save');
        //console.log(this.assessmentNew);
        this.sharedService.presentLoading();
        if (this.editing) {
            this.assessmentService
                .UpdateAssessment(this.assessmentNew)
                .subscribe(res => {
                    if (res.status == true) {
                        this.navCtrl.setRoot(AssessmentSessionListPage);
                        // //need to work out where this needs to go, probably back to player page or something
                    }
                });
        } else {
            this.assessmentService
                .NewAssessment(this.assessmentNew)
                .subscribe(res => {
                    if (res.status == true) {
                        this.navCtrl.setRoot(AssessmentSessionListPage);
                        // //need to work out where this needs to go, probably back to player page or something
                    }
                });
        }

    }
}

