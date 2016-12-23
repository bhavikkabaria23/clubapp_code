import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Registration } from '../../models/registration'
import { RegistrationService } from '../../providers/registration.service';
import { SharedService } from '../../providers/shared.service'
// import { SignInPage } from '../user/user.signin';
import { RegistrationDetailPage } from './registration.detail';

import * as resources from '../../app/resources'

@Component({
  selector: 'page-registration-list',
  templateUrl: 'registration.list.html'
})
export class RegistrationListPage {
  registrationFiltered: Registration[];
  registration: Registration[];
  registrationDetail: Registration;
  icon = "add";
  constructor(
    public navCtrl: NavController,
    private registrationService: RegistrationService,
    public sharedService: SharedService
  ) {
    //registrationService.getAll().subscribe(res => this.registration = res)
    this.sharedService.presentLoading();
    registrationService.getAll().subscribe((res) => {

      let resTemp = [];

      for (let row of res) {
        row.thumbnail = resources.url.defaultImagePath;

        if (row.images.length > 0) {
          for (let img of row.images) {
            if (img.name == 'main_thumb') {
              row.thumbnail = img.url;
            }
          }
        }

        resTemp.push(row);
      }

      res = resTemp;

      this.registration = this.registrationFiltered = res;
      this.sharedService.dismissLoading();
      // this.registration.forEach(reg => {
      //   reg.hide = true;
      // });
    });
  }

  // This is not in use
  // toggleDetail(register) {
  //   var itemState = register.hide;
  //   if (register.hide) {
  //     //this.registrationService.getById(register._id).subscribe(res => this.registrationDetail = res);
  //     this.registrationService.getById(register._id).subscribe((res) => {
  //       register.details = JSON.stringify(res);
  //     });
  //   }
  //   register.hide = !itemState;
  // }

  // This is not in use
  // isDetailShown(register) {
  //   return register.hide;
  // }

  gotoDetail(register) {
    this.sharedService.presentLoading();
    this.navCtrl.push(RegistrationDetailPage, {
      registerid: register._id
    });
  }

  // Filter for registration
  // Handle input event from filter bar
  filter(filtertext) {
    //let term = filtertext.target.value;
    let term = filtertext;
    if (term) {
      // let regexName = new RegExp("^" + term, "i");
      let regex = new RegExp(term, "i"); // regex to match filter text with case insensitive.
      if (term.trim() != '') {
        this.registrationFiltered = this.registration.filter(reg => regex.test(reg.playerName) || regex.test(reg.playerID));
      }
      else {
        this.registrationFiltered = this.registration;
      }
    }
    else {
      this.registrationFiltered = this.registration;
    }
  }

  onClear() {
    this.registrationFiltered = this.registration;
  }


}
