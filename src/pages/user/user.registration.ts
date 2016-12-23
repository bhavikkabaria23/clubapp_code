import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserService } from '../../providers/user.service'
import { SharedService } from '../../providers/shared.service'
import * as resources from '../../app/resources'
import { PlayerListPage } from '../player/player.list'
import { SignInPage } from '../user/user.signin';

@Component({
    selector: 'page-user-registration',
    templateUrl: 'user.registration.html'
})
export class UserRegistrationPage {
    userRegistration: User;
    userRegistrationForm: FormGroup;
    public userService: UserService;
    constructor(public navCtrl: NavController,
        userService: UserService,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        public sharedService: SharedService ) {
        this.userRegistration = new User();
        this.userService = userService;
        this.userRegistrationForm = formBuilder.group({
            fFANumber: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            address: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            mobileNumber: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            role: ['', Validators.compose([Validators.required])],
        });
    }
    onSubmit() {
        let invalidMessages = "";
        if (!this.userRegistrationForm.valid) {
            if (!invalidMessages) {
                invalidMessages = resources.message.alert_incomplete;
            }
            let invalidAlert = this.alertCtrl.create({
                title: resources.message.alert_signin_title,
                subTitle: invalidMessages,
                buttons: [resources.message.alert_ok]
            });
            invalidAlert.present();
        }
        else {
            this.sharedService.presentLoading();
            this.userService
                .SignUp(this.userRegistration)
                .subscribe(res => {
                    if (res.status == true) {
                        this.navCtrl.setRoot(PlayerListPage);
                    }
                    else {
                        this.sharedService.dismissLoading();
                        let alert = this.alertCtrl.create({
                            title: resources.message.alert_signin_title,
                            subTitle: resources.message.alert_signin_invalid,
                            buttons: [resources.message.alert_ok]
                        });
                        alert.present();
                    }
                });
        }
    }

    // // logOut() {
    // //     var storage = {};
    // //     storage = { token: null, coachID: null }
    // //     this.sharedService.settter(storage);
    // //     this.navCtrl.push(SignInPage);
    // // }
}

