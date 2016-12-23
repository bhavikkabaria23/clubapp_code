import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Session} from '../../models/session';
import {SharedService} from '../../providers/shared.service'
import {SessionService} from '../../providers/session.service'

import {SessionCreatePage} from './session.create';
import { SignInPage } from '../user/user.signin';
import { SessionDetailPage } from '../session/session.detail';

@Component({
  selector: 'page-session-list',
  templateUrl: 'session.list.html'
})

export class SessionListPage {
  sessionList: Session[]
  sessionFiltered: Session[];
  constructor(
    public navCtrl: NavController,
    private sessionService: SessionService,
    public sharedService: SharedService) {
    this.sharedService.presentLoading();
    sessionService.getAll().subscribe((res) => {
      this.sessionList = this.sessionFiltered = res;
      this.sharedService.dismissLoading();
    });
  }

  goToCreate() {
    this.navCtrl.push(SessionCreatePage, {
    });
  }

  gotoDetail(session) {
    this.sharedService.presentLoading();
    this.navCtrl.push(SessionDetailPage, {
      sessionKey: session.sessionKey
    });
  }

  // Filter for sessions
  // Handle input event from filter bar
  filter(filtertext) {
    //let term = filtertext.target.value;
    let term = filtertext;
    if (term) {
      // let regexName = new RegExp("^" + term, "i");        
      let regex = new RegExp(term, "i"); // regex to match filter text with case insensitive.
      if (term.trim() != '') {
        this.sessionFiltered = this.sessionList.filter(reg => regex.test(reg.sessionKey));
      }
      else {
        //console.log(this.sessionList);
        this.sessionFiltered = this.sessionList;
      }
    }
    else {
      this.sessionFiltered = this.sessionList;
    }
  }

  onClear() {
    this.sessionFiltered = this.sessionList;
  }

// This is not in use
  // logOut() {
  //   var storage = {};
  //   storage = { token: null, role: null, fFANumber: null }
  //   this.sharedService.settter(storage);
  //   this.navCtrl.push(SignInPage, {
  //   });
  // }
}