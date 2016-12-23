import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserService } from '../../providers/user.service'
import { SharedService } from '../../providers/shared.service'
import * as resources from '../../app/resources'
import { UserListPage } from '../user/user.list'

@Component({
    selector: 'page-user-edit',
    templateUrl: 'user.edit.html'
})
export class UserEditPage {
    userEdit: User;
    userEditForm: FormGroup;

    constructor(public navCtrl: NavController,
        public userService: UserService,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        public sharedService: SharedService) {
        this.userEdit = new User();

        this.userEditForm = formBuilder.group({
            fFANumber: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            password: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            address: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            mobileNumber: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            role: ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit() {
        if (this.navParams.get('ffanumber') != undefined) {
            let ffanumber = this.navParams.get('ffanumber');

            this.userService.getByFFANumber(ffanumber).subscribe((obj) => {
                if (obj.hasOwnProperty('ffanumber')) {
                    this.userEdit.fFANumber = obj.ffanumber;
                }
                if (obj.hasOwnProperty('_id')) {
                    this.userEdit._id = obj._id;
                }
                if (obj.hasOwnProperty('address')) {
                    this.userEdit.address = obj.address;
                }
                if (obj.hasOwnProperty('role')) {
                    this.userEdit.role = obj.role;
                }
                if (obj.hasOwnProperty('mobileNumber')) {
                    this.userEdit.mobileNumber = obj.mobileNumber;
                }
            });
        }
    }

    onSubmit() {
        let invalidMessages = "";
        if (!this.userEditForm.valid) {
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
                .UpdateUser(this.userEdit)
                .subscribe(res => {
                    if (res.status == true) {
                        this.navCtrl.setRoot(UserListPage);
                    }
                    else if (res.status == false) {
                        this.sharedService.dismissLoading();
                        if (res.message == "duplicateFFA") {
                            let alert = this.alertCtrl.create({
                                title: resources.message.ffa_exist,
                                buttons: [resources.message.alert_ok]
                            });
                            alert.present();
                        }

                    }
                });
        }
    }
}

