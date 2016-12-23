import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

import {Session} from '../../models/session';
import {SharedService} from '../../providers/shared.service'
import {SessionService} from '../../providers/session.service'

@Component({
  selector: 'page-session-list-popup',
  templateUrl: 'session.list.popup.html'
})

export class SessionListPopup {
  sessionList: Session[];
  selectedSession = [];
  preSelected = [];
  IsPlayer=false;
  constructor(
    public navCtrl: NavController,
    private sessionService: SessionService,
    public sharedService: SharedService,
    public navParams: NavParams,
    private viewCtrl: ViewController) {

    this.sharedService.presentLoading();

    if (navParams.get("sessions")) {
      this.preSelected = JSON.parse(navParams.get("sessions"));
    }
    if (navParams.get("IsPlayer")) {
      this.IsPlayer = navParams.get("IsPlayer");      
    }

    sessionService.getAll().subscribe((res) => {
      this.sessionList = res;
      //console.log(res);
      if (this.preSelected && this.preSelected.length > 0) {        
        this.sessionList.map((s) => {
          //console.log(s);
          let index = this.preSelected.map((s2)=> { 
            //console.log(s2);
            return s2['sessionKey']; 
          }).indexOf(s.sessionKey)
          if (index > -1) {
            s.selected = true;
            let sessionObject = new Session();
            sessionObject.sessionKey = s.sessionKey;
            sessionObject.startDateTime = s.startDateTime;
            // sessionObject.selected = true;
            this.selectedSession.push(sessionObject);
            //console.log(this.selectedSession);
          }
          else {
            s.selected = false;
          }
        });
      }
      this.sharedService.dismissLoading();
    });

  }

  tapPlayerSession(session, event) {        
    //if (event.currentTarget.classList.contains("selected-item")) {
    if (session.selected) {
      if (this.selectedSession.length > 0) {
        let index = this.selectedSession.map((c)=> { return c['sessionKey']; }).indexOf(session._id)
        this.selectedSession.splice(index, 1);
      }
      this.sessionList.map((s) => {
        if (s.sessionKey == session.sessionKey) {
          s.selected = false;
        }
      });
      //event.currentTarget.classList.remove("selected-item");
    }
    else {
      // Only for player - send to session    
      this.selectedSession.splice(0, this.selectedSession.length);
      this.sessionList.map((s) => {
        if (s.sessionKey == session.sessionKey) {
          s.selected = true;
        }
        else {
          s.selected = false;
        }
      });
      //------------------
      let sessionObject = new Session();
      sessionObject.sessionKey = session.sessionKey;
      sessionObject.startDateTime = session.startDateTime;
      // sessionObject.selected = true;
      this.selectedSession.push(sessionObject);
      //event.currentTarget.classList.add("selected-item");
    }
  }
  tapCoachSession(session, event) {        
    //if (event.currentTarget.classList.contains("selected-item")) {
    if (session.selected) {
      if (this.selectedSession.length > 0) {
        let index = this.selectedSession.map((c)=> { return c['sessionKey']; }).indexOf(session._id)
        this.selectedSession.splice(index, 1);
      }
      this.sessionList.map(s => {
        if (s.sessionKey == session.sessionKey) {
          s.selected = false;
        }
      });
      //event.currentTarget.classList.remove("selected-item");
    }
    else {                 
      this.sessionList.map((s) => {
        if (s.sessionKey == session.sessionKey) {
          s.selected = true;
        }      
      });      
      let sessionObject = new Session();
      sessionObject.sessionKey = session.sessionKey;
      sessionObject.startDateTime = session.startDateTime;
      // sessionObject.selected = true;
      this.selectedSession.push(sessionObject);
      //event.currentTarget.classList.add("selected-item");
    }
  }

  dismiss() {
    this.selectedSession.splice(0, this.selectedSession.length);
    this.viewCtrl.dismiss();
  }
  apply() {
    this.sharedService.presentLoading();
    this.viewCtrl.dismiss(this.selectedSession);
  }  
}