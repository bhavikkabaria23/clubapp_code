import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController, ViewController} from 'ionic-angular';
import { AlertController, Platform} from 'ionic-angular';

import {Session} from '../../models/session';
import {SharedService} from '../../providers/shared.service'
import {SessionService} from '../../providers/session.service'

import {SessionListPage} from './session.list';

import * as resources from '../../app/resources'

@Component({
    selector: 'page-session-create',
    templateUrl: 'session.create.html'
})

export class SessionCreatePage {
    session: Session;
    sessionForm: FormGroup;
    private sessionService: SessionService;

    constructor(public navCtrl: NavController,
        sessionService: SessionService,
        private platform: Platform,
        public sharedService: SharedService,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder
    ) {
        this.sessionService = sessionService;
        this.session = new Session();

        this.sessionForm = formBuilder.group({
            sessionKey: ['', Validators.compose([Validators.maxLength(30),
                Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
            startDateTime: ['', Validators.compose([Validators.required])]

        });
    }

    onSubmit() {
        let invalidMessages = "";
        if (!this.sessionForm.valid) {
            if (!this.sessionForm.controls["sessionKey"].valid) {
                invalidMessages += resources.message.session_invalid;
            }
            let invalidAlert = this.alertCtrl.create({
                title: resources.message.invalid_alert_title,
                subTitle: invalidMessages,
                buttons: [resources.message.alert_ok]
            });
            invalidAlert.present();
        }
        else {
            this.sharedService.presentLoading();
            this.sessionService
                .Save(this.session)
                .subscribe(res => {
                    if (res.status == true) {
                        this.navCtrl.setRoot(SessionListPage);
                    }
                    else if (res.message == "duplicatsessionKey") {
                        this.sharedService.dismissLoading();
                        let invalidAlert = this.alertCtrl.create({
                            title: resources.message.invalid_alert_title,
                            subTitle: resources.message.session_exist,
                            buttons: [resources.message.alert_ok]
                        });
                        invalidAlert.present();
                    }
                });
        }
    }
}