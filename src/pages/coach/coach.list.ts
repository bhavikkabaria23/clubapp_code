import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlayerService } from '../../providers/player.service';
import { SharedService } from '../../providers/shared.service';
import { CoachService } from '../../providers/coach.service';
import { Observable } from 'rxjs/Rx';
// import { Coach } from '../../models/coach.detail';
import { CoachDetailPage } from './coach.detail';
// import { SignInPage } from '../user/user.signin';
import * as resources from '../../app/resources'

@Component({
    selector: 'page-coach',
    templateUrl: 'coach.list.html'
})

export class CoachListPage {
    coachList: any[]
    coachFiltered: any[];
    session: any;
    changed: any[];
    selecting: boolean = false;
    constructor(
        public navCtrl: NavController,
        private playerService: PlayerService,
        private coachService: CoachService,
            public navParams: NavParams,
        public sharedService: SharedService) {
             if (this.navParams.get('selection') != undefined) {
               this.selecting = this.navParams.get('selection');
         this.session = this.navParams.get('session');         
       }
        this.sharedService.presentLoading();
        playerService.getAllCoaches().subscribe((res) => {
          // let resTemp = [];          
          // for (let row of res) {
          //     row.thumbnail = resources.url.defaultImagePath;

          //     if (row.images.length > 0) {
          //         for (let img of row.images) {
          //             if (img.name == 'main_thumb') {
          //                 row.thumbnail = img.url;
          //             }
          //         }
          //     }

          //     resTemp.push(row);
          // }

          // res = resTemp;
          res.map(row=>{
            row.thumbnail = resources.url.defaultImagePath;

              if (row.images.length > 0) {
                  for (let img of row.images) {
                      if (img.name == 'main_thumb') {
                          row.thumbnail = img.url;
                      }
                  }
              }
              if(this.session) {
                row.sessions.map(sess=>{
                  if(!row.selected)
                    row.selected = sess.sessionKey === this.session.sessionKey;                  
                });
              }

          })
            this.coachList = this.coachFiltered = res;
            this.sharedService.dismissLoading();
        });
    }

    gotoDetail(coach) {
      if(this.selecting) {
        coach.changed = true;        
        if(coach.selected) {
          coach.selected = false;
          coach.sessions = coach.sessions.filter(res=> {
            return res.sessionKey!==this.session.sessionKey;
          });
        } else {
          coach.selected = true;
          coach.sessions.push({
            sessionKey:this.session.sessionKey,
            ended: this.session.ended,
            startDateTime: this.session.startDateTime
          });
        }          
      } else {
          this.sharedService.presentLoading();
          this.navCtrl.push(CoachDetailPage, {
              coachid: coach._id
          });
      }
        
    }

    // Filter for coaches
    // Handle input event from filter bar
    filter(filtertext) {
        let term = filtertext;
        if (term) {
            // let regexName = new RegExp("^" + term, "i");        
            let regex = new RegExp(term, "i"); // regex to match filter text with case insensitive.
            if (term.trim() != '') {
                this.coachFiltered = this.coachList.filter(reg => regex.test(reg.coachName) || regex.test(reg.givenName) || regex.test(reg.familyName) || regex.test(reg.fFANumber));
            }
            else {
                this.coachFiltered = this.coachList;
            }
        } else {
            this.coachFiltered = this.coachList;
        }
    }

    onClear() {
        this.coachFiltered = this.coachList;
    }

    apply() {      
      this.sharedService.presentLoading();
      Observable.forkJoin(
        this.coachList.filter(res=> {
          return res.changed == true;
        }).map(res=> {
          return this.coachService.AssignToSession(res);
        })
      ).subscribe(()=> {        
        this.navCtrl.pop();
        this.sharedService.dismissLoading();
      });
      // this.navCtrl.pop();
      // this.sharedService.dismissLoading();
    }
}

