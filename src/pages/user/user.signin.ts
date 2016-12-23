import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, MenuController, ViewController } from 'ionic-angular';

import { User } from '../../models/user';
import { UserService } from '../../providers/user.service'
import { SharedService } from '../../providers/shared.service'
import { PlayerListPage } from '../player/player.list'
import { SessionListPage } from '../session/session.list'
import { AssessmentSessionListPage } from '../assessment/assessment.session.list'

import * as resources from '../../app/resources'

@Component({
    selector: 'page-user-signin',
    templateUrl: 'user.signin.html'
})
export class SignInPage {
    signin: User;
    signinForm: FormGroup;

    constructor(public navCtrl: NavController,
        public viewCtrl: ViewController,
        public userService: UserService,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        public sharedService: SharedService,
        public menuCtrl: MenuController) {
        this.signin = new User();

        this.signinForm = formBuilder.group({
            fFANumber: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
        });
        var storage = {};
        storage = { token: null, role: null, fFANumber: null, coach: null, player: null }
        this.sharedService.settter(storage);
        this.menuCtrl.enable(false, 'root');
    }
    ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
    }
    onSubmit() {
        let invalidMessages = "";
        if (!this.signinForm.valid) {
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
                .SignIn(this.signin)
                .subscribe(res => {
                    //console.log(res);
                    if (res.status == true) {
                        this.menuCtrl.enable(true, 'root');
                        var storage = {};
                        storage = {
                            token: res.token,
                            role: res.role,
                            fFANumber: res.fFANumber,
                            _id: res._id,
                            coach: res.coach,
                            player: res.player
                        };
                        //console.log(storage);
                        this.sharedService.settter(storage);
                        switch (res.role) {
                            case 1:
                                this.menuCtrl.enable(true, 'root');
                                this.menuCtrl.enable(false, 'admin');
                                this.menuCtrl.enable(false, 'coach');
                                this.menuCtrl.enable(false, 'technicalDirector');
                                this.menuCtrl.enable(false, 'player');
                                this.navCtrl.setRoot(PlayerListPage);
                                break;
                            case 2:
                                this.menuCtrl.enable(false, 'root');
                                this.menuCtrl.enable(true, 'admin');
                                this.menuCtrl.enable(false, 'coach');
                                this.menuCtrl.enable(false, 'technicalDirector');
                                this.menuCtrl.enable(false, 'player');
                                this.navCtrl.setRoot(PlayerListPage);
                                break;
                            case 3:
                                this.menuCtrl.enable(false, 'root');
                                this.menuCtrl.enable(false, 'admin');
                                this.menuCtrl.enable(true, 'coach');
                                this.menuCtrl.enable(false, 'technicalDirector');
                                this.menuCtrl.enable(false, 'player');
                                this.navCtrl.setRoot(AssessmentSessionListPage);
                                break;
                            case 4:
                                this.menuCtrl.enable(false, 'root');
                                this.menuCtrl.enable(false, 'admin');
                                this.menuCtrl.enable(false, 'coach');
                                this.menuCtrl.enable(true, 'technicalDirector');
                                this.menuCtrl.enable(false, 'player');
                                this.navCtrl.setRoot(SessionListPage);
                                break;
                            case 5:
                                this.menuCtrl.enable(false, 'root');
                                this.menuCtrl.enable(false, 'admin');
                                this.menuCtrl.enable(false, 'coach');
                                this.menuCtrl.enable(false, 'technicalDirector');
                                this.menuCtrl.enable(true, 'player');
                                break;

                            default:
                                break;
                        }

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
}

