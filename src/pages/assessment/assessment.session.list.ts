import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import {Session} from '../../models/session';
// import {Player} from '../../models/player';
import {SharedService} from '../../providers/shared.service'
import {CoachService} from '../../providers/coach.service'
// import {PlayerDetailPage} from '../player/player.detail'
import {SessionService} from '../../providers/session.service'
// import { SignInPage } from '../user/user.signin';
import { AssessmentService } from '../../providers/assessment.service';
// import {AssessmentCreatePage} from '../assessment/assessment.create';
import {SessionDetailPage} from '../session/session.detail';

// import * as resources from '../../app/resources'

@Component({
  selector: 'assessment-session-list',
  templateUrl: 'assessment.session.list.html'
})

export class AssessmentSessionListPage {
  sessionList: any[]
  session: any = {};
  playerList: any[];
  constructor(
    public navCtrl: NavController,
    private sessionService: SessionService,
    public sharedService: SharedService,
    public coachSevice: CoachService,
    public assessmentService: AssessmentService) {
    // this.sharedService.presentLoading();
    this.checkSessions();
  }
  checkSessions() {
        // sessionService.getAll().subscribe((res) => {
      // this.coachSevice.getById(this.sharedService.getter().coach._id).subscribe(res=>{
      //   console.log(res);
      // })
      // this.sharedService.getter().
      let sessionStart;
      let sessionEnd; 
      let d = new Date();
      let now = d.getTime();
      this.sessionList = this.sharedService.getter().coach.sessions;
      console.log(this.sessionList);
        this.sessionList.map(session => {
          //active 10 mins before
            sessionStart = new Date(session.startDateTime).getTime() - 10 * 60000;
          //session lasts upto 120 mins, active 10 mins after
            sessionEnd = new Date(session.startDateTime).getTime() + 130 * 60000;
            // console.log(sessionStart);
            // console.log(sessionEnd);
            // console.log(now);
            // console.log(now < sessionEnd && now > sessionStart);
            session.now = now < sessionEnd && now > sessionStart && !session.ended;
            // return now < sessionEnd && now > sessionStart && !session.ended; 
        });
        // this.session = this.sessionList[1];
      //get current session based on startDateTime < currentTime > startDateTime+90min

      // if(this.session) {
      //   this.sessionService.getAllBySession(this.session.sessionKey).subscribe((res) => {                
      //       this.session = res.session;
      //       this.playerList = res.players;
      //       this.playerList.map(res => {
      //         let assessmentObj: any = {
      //             player_id:res.fFANumber,
      //             sessionKey:this.session.sessionKey
      //         }
      //         if(this.sharedService.role==3) {
      //           assessmentObj.coach_id = this.sharedService.getter().fFANumber;
      //         }
      //         res.thumbnail = resources.url.defaultImagePath;
      //         if (res.hasOwnProperty('images') && res.images != null && res.images.length > 0) {
                
      //           for (let img of res.images) {
      //               if (img.name == 'main_thumb') {
      //                   res.thumbnail = img.url;
      //               }
      //           }
      //         }
      //         this.assessmentService.checkExists(assessmentObj)
      //         .subscribe(res2 => {
      //             res.assessed = res2.length;
      //         });
      //       });
      //       console.log(this.playerList);
      //       this.sharedService.dismissLoading();
      //   });
      // }

    // });

  }
  // isAssessed(id) {
  //   return this.assessmentService.checkExists({
  //       player_id:id,
  //       sessionKey:this.session.sessionKey
  //   }).subscribe(res2 => {
  //       console.log(res);
  //       return res.length;
  //   });

  // }
  gotoDetail(session) {
    this.sharedService.presentLoading();
    this.navCtrl.push(SessionDetailPage, {
      sessionKey: session.sessionKey
    });
  }
  // gotoDetail(player) {
  //   this.sharedService.presentLoading();
  //   console.log(player);
  //   // this.navCtrl.push(PlayerDetailPage, {
  //   //   playerid: player._id,
  //   //   session: this.session
  //   // });
  //   this.navCtrl.push(AssessmentCreatePage, {
  //       playerId: player._id,
  //       // playerFName: this.registration.givenName,
  //       // playerLName: this.registration.familyName,
  //       session: this.session,
  //       // sessionKey: this.session.key,
  //       // sessionSkills: this.session.skills,
  //       // playerImg: this.cloudinaryThumbUri
  //   });
  // }
}