import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Coach } from '../../models/coach.detail'
import { CoachService } from '../../providers/coach.service';
import { SharedService } from '../../providers/shared.service'
import { CoachEditPage } from './coach.edit'
// import { ImageManager } from '../../providers/image.manager.component';
import { SessionListPopup } from '../../pages/session/session.list.popup';

// import {PlayerEditPage} from './player.edit';
import * as resources from '../../app/resources'

@Component({
    selector: 'page-coach-detail',
    templateUrl: 'coach.detail.html'
})

export class CoachDetailPage implements OnInit {
    registration: Coach;
    birthDateString: any;
    locale = "en-us";
    // filesrc: any = null;
    coachId = "";
    IsMasterPage = false;
    public base64Image: string = '';
    public cloudinaryImageUri: string = '';
    public cloudinaryThumbUri: string = resources.url.defaultImagePath;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private coachService: CoachService,
        public sharedService: SharedService,
        public alertCtrl: AlertController,
        private viewCtrl: ViewController,
        public modalCtrl: ModalController
        // public imageManager: ImageManager
        ) {
        this.registration = new Coach();
        // this.filesrc = resources.url.defaultImagePath;
    }

    ngOnInit() {        
        if (this.navParams.get('masterPage') == true) {
            //console.log(this.sharedService.getter());            
            if (this.sharedService.getter().coach) {
                this.coachId = this.sharedService.getter().coach._id
                this.IsMasterPage = true;
            }
        }
        else {
            this.coachId = this.navParams.get('coachid');
        }

        if (this.coachId) {
            // let coachid = this.navParams.get('coachid');
            this.registration._id = this.coachId;

            this.coachService.getById(this.coachId).subscribe((obj) => {
                if (obj.hasOwnProperty('givenName')) {
                    this.registration.givenName = obj.givenName
                }
                if (obj.hasOwnProperty('familyName')) {
                    this.registration.familyName = obj.familyName
                }
                if (obj.hasOwnProperty('coachName')) {
                    this.registration.coachName = obj.coachName
                }
                if (obj.hasOwnProperty('fFANumber')) {
                    this.registration.fFANumber = obj.fFANumber
                }
                if (obj.hasOwnProperty('birthDate')) {
                    // this.registration.birthDate = obj.birthDate;
                    let objDate = new Date(obj.birthDate);
                    let month = objDate.toLocaleString(this.locale, { month: "long" });
                    let day = objDate.toLocaleString(this.locale, { day: "2-digit" });
                    let year = objDate.toLocaleString(this.locale, { year: "numeric" });
                    this.birthDateString = day + " " + month + " " + year;
                }

                if (obj.hasOwnProperty('gender')) {
                    this.registration.gender = obj.gender.toUpperCase();
                }

                if (obj.hasOwnProperty('residentialAddress')) {
                    this.registration.residentialAddress = obj.residentialAddress;
                }
                if (obj.hasOwnProperty('homeNumber')) {
                    this.registration.homeNumber = obj.homeNumber;
                }
                if (obj.hasOwnProperty('mobileNumber')) {
                    this.registration.mobileNumber = obj.mobileNumber;
                }
                if (obj.hasOwnProperty('email')) {
                    this.registration.email = obj.email;
                }
                if (obj.hasOwnProperty('contactPerson')) {
                    if (obj.contactPerson.length > 0) {
                        if (obj.contactPerson[0].hasOwnProperty('personName')) {
                            this.registration.contact1_personName = obj.contactPerson[0].personName;
                        }
                        if (obj.contactPerson[0].hasOwnProperty('relationship')) {
                            this.registration.contact1_relationship = obj.contactPerson[0].relationship;
                        }
                        if (obj.contactPerson[0].hasOwnProperty('contactNumber')) {
                            this.registration.contact1_contactNumber = obj.contactPerson[0].contactNumber;
                        }
                        if (obj.contactPerson[0].hasOwnProperty('email')) {
                            this.registration.contact1_email = obj.contactPerson[0].email;
                        }
                    }
                }

                if (obj.hasOwnProperty('clubHistory')) {
                    if (obj.clubHistory.length > 0) {
                        obj.clubHistory.forEach(element => {
                            if (element.hasOwnProperty("year")) {
                                if (element.year == 2015) {
                                    this.registration.previousClub2015 = element.details;
                                }
                                else if (element.year == 2016) {
                                    this.registration.previousClub2016 = element.details;
                                }
                            }
                        });
                    }
                }

                if (obj.hasOwnProperty('suspensionsDetails')) {
                    this.registration.suspensionsDetails = obj.suspensionsDetails;
                }

                if (obj.hasOwnProperty('sessions')) {
                    if (obj.sessions && obj.sessions.length > 0) {
                        obj.sessions.forEach(element => {
                            this.registration.sessions.push(element);
                        });
                    }
                }

                // if (obj.hasOwnProperty('imageManager')) {
                //     if (obj.imageManager !== null && obj.imageManager.length > 0) {
                //         this.imageManager.getImages(obj.imageManager[0].name).subscribe((data) => {
                //             this.filesrc = data;
                //         }, (err) => console.log(err));
                //     }
                //     else {
                //         this.filesrc = resources.url.defaultImagePath;
                //     }
                // }
                this.registration.images = [];

                if (obj.hasOwnProperty('images') && obj.images != null && obj.images.length > 0) {
                    //console.log('got images');
                    //console.log(obj.images);

                    obj.images.map(entry=> {
                        if (entry.name === 'main') {
                            this.cloudinaryImageUri = entry.url;
                        } else if (entry.name === 'main_thumb') {
                            this.cloudinaryThumbUri = entry.url;
                        }
                    });

                    //console.log('this.cloudinaryImageUri ' + this.cloudinaryImageUri);
                    //console.log('this.cloudinaryThumbUri ' + this.cloudinaryThumbUri);

                    this.registration.images = obj.images;

                    //console.log(this.registration.images);
                }
            });
        }
    }

    gotoEdit() {
        this.sharedService.presentLoading();
        this.navCtrl.push(CoachEditPage, {
            coachid: this.registration._id
        });
    }

    AssignToSession() {
        let profileModal = this.modalCtrl.create(SessionListPopup, { sessions: JSON.stringify(this.registration.sessions) });
        profileModal.onDidDismiss(data => {
            if (data) {
                // this.sharedService.presentLoading();
                this.registration.sessions = data;
                this.coachService
                    .AssignToSession(this.registration)
                    .subscribe(res => {
                        if (res.status == true) {
                        }
                        this.sharedService.dismissLoading();
                    });
            }
        });
        profileModal.present();
    }
}