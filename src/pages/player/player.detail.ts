import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {Player, SessionAssigned} from '../../models/player'
import {PlayerService} from '../../providers/player.service';
import {SharedService} from '../../providers/shared.service'
// import {ImageManager}from '../../providers/image.manager.component';

import {PlayerEditPage} from './player.edit';
// import {AssessmentCeatePage} from '../assessment/assessment.create';
import { SessionListPopup } from '../session/session.list.popup';
import * as resources from '../../app/resources'

@Component({
    selector: 'page-player-detail',
    templateUrl: 'player.detail.html'
})

export class PlayerDetailPage implements OnInit {
    registration: Player;
    birthDateString: any;
    locale = "en-us";
    // filesrc: any = null;
    public base64Image: string = '';
    public cloudinaryImageUri: string = '';
    public cloudinaryThumbUri: string = "/assets/img/sample.jpg";
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private playerService: PlayerService,
        public sharedService: SharedService,
        public alertCtrl: AlertController,
        private viewCtrl: ViewController,
        public modalCtrl: ModalController
        // public imageManager: ImageManager
        ) {
        this.registration = new Player();
        // this.registration = {};
        // this.filesrc = resources.url.defaultImagePath;
    }

    ngOnInit() {
        if (this.navParams.get('playerid') != undefined) {
            let playerid = this.navParams.get('playerid');
            this.registration._id = playerid;

            this.playerService.getById(playerid).subscribe((obj) => {                
                // if (obj.hasOwnProperty('imageManager')) {                    
                //     if (obj.imageManager.length > 0) {
                //         // let image = new Images();
                //         // image.name = obj.imageManager[0].name;
                //         let imageArray = new Array();
                //         imageArray[0] = obj.imageManager[0].name;                        
                //         // this.registration.images.push(image);                        
                //         this.imageManager.getImages(imageArray).subscribe((res) => {                            
                //             this.imagerecord = res;
                //         });
                //     }
                // }

                if (obj.hasOwnProperty('playerID')) {
                    this.registration.playerID = obj.playerID
                }
                // if (obj.hasOwnProperty('playerName')) {
                //     this.registration.playerName = obj.playerName
                // }
                if (obj.hasOwnProperty('givenName')) {
                    this.registration.givenName = obj.givenName
                }
                if (obj.hasOwnProperty('familyName')) {
                    this.registration.familyName = obj.familyName
                }
                if (obj.hasOwnProperty('fFANumber')) {
                    this.registration.fFANumber = obj.fFANumber
                }
                if (obj.hasOwnProperty('birthDate')) {
                    // this.registration.birthDate = new Date(obj.birthDate);
                    let objDate = new Date(obj.birthDate);
                    let month = objDate.toLocaleString(this.locale, { month: "long" });
                    let day = objDate.toLocaleString(this.locale, { day: "2-digit" });
                    let year = objDate.toLocaleString(this.locale, { year: "numeric" });
                    this.birthDateString = day + " " + month + " " + year;
                }
                // if (obj.birthDate) {
                //     this.registration.birthDate = new Date(obj.birthDate,
                // }
                if (obj.hasOwnProperty('ageGroup')) {
                    this.registration.ageGroup = obj.ageGroup;
                }
                if (obj.hasOwnProperty('preferredPlayingPosition')) {
                    this.registration.preferredPlayingPosition = obj.preferredPlayingPosition;
                    this.registration.preferredPlayingPositionText = resources.common.getPreferredPlayingPosition(obj.preferredPlayingPosition);
                }
                if (obj.hasOwnProperty('gender')) {
                    this.registration.gender = obj.gender.toUpperCase();
                }
                if (obj.hasOwnProperty('objectivesAmbitions')) {
                    this.registration.objectivesAmbitions = obj.objectivesAmbitions;
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
                    if (obj.contactPerson.length > 1) {
                        if (obj.contactPerson[1].hasOwnProperty('personName')) {
                            this.registration.contact2_personName = obj.contactPerson[1].personName;
                        }
                        if (obj.contactPerson[1].hasOwnProperty('relationship')) {
                            this.registration.contact2_relationship = obj.contactPerson[1].relationship;
                        }
                        if (obj.contactPerson[1].hasOwnProperty('contactNumber')) {
                            this.registration.contact2_contactNumber = obj.contactPerson[1].contactNumber;
                        }
                        if (obj.contactPerson[1].hasOwnProperty('email')) {
                            this.registration.contact2_email = obj.contactPerson[1].email;
                        }
                    }
                }

                if (obj.hasOwnProperty('schoolDetails')) {
                    this.registration.schoolDetails = obj.schoolDetails;
                }
                if (obj.hasOwnProperty('employementDetails')) {
                    this.registration.employementDetails = obj.employementDetails;
                }

                // if (obj.hasOwnProperty('previousClub2016')) {
                //     this.registration.previousClub2016 = obj.previousClub2016
                // }
                // if (obj.hasOwnProperty('previousClub2015')) {
                //     this.registration.previousClub2015 = obj.playingHistory.previousClub2015
                // }

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
                if (obj.hasOwnProperty('injuriesDetails')) {
                    this.registration.injuriesDetails = obj.injuriesDetails;
                }

                if (obj.hasOwnProperty('headCoachName')) {
                    this.registration.headCoachName = obj.headCoachName;
                }
                if (obj.hasOwnProperty('contactDetails')) {
                    this.registration.contactDetails = obj.contactDetails;
                }
                if (obj.hasOwnProperty('academicSessionPerWeekCount')) {
                    this.registration.academicSessionPerWeekCount = obj.academicSessionPerWeekCount;
                }
                if (obj.hasOwnProperty('arrangedBy')) {
                    this.registration.arrangedBy = obj.arrangedBy;
                }
                if (obj.hasOwnProperty('destination')) {
                    this.registration.destination = obj.destination;
                }
                if (obj.hasOwnProperty('purposeOfTrip')) {
                    this.registration.purposeOfTrip = obj.purposeOfTrip;
                }
                if (obj.hasOwnProperty('sessionKey')) {
                    this.registration.sessionKey = obj.sessionKey;
                    let sessionAssigned = new SessionAssigned();
                    sessionAssigned.sessionKey = obj.sessionKey;
                    this.registration.sessions.push(sessionAssigned);
                }
                this.registration.images = [];

                if (obj.hasOwnProperty('images') && obj.images != null && obj.images.length > 0) {
                    //console.log('got images');

                    obj.images.map(entry=> {
                        if (entry.name === 'main') {
                            this.cloudinaryImageUri = entry.url;
                        } else if (entry.name === 'main_thumb') {
                            this.cloudinaryThumbUri = entry.url;
                        }                        
                    });                    

                    this.registration.images = obj.images;
                    
                }
                // if (obj.hasOwnProperty('coaches')) {
                //     if (obj.coaches && obj.coaches.length > 0) {
                //         obj.coaches.forEach(element => {
                //             this.registration.assessedCoaches.push(element);
                //         });
                //     }
                // }               

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


            });
        }
    }
    // gotoAssessment() {
    //     this.sharedService.presentLoading();
    //     this.navCtrl.push(AssessmentCreatePage, {
    //         playerId: this.registration.fFANumber,
    //         playerFName: this.registration.givenName,
    //         playerLName: this.registration.familyName,
    //         session: this.navParams.get('session'),
    //         // sessionKey: this.session.key,
    //         // sessionSkills: this.session.skills,
    //         playerImg: this.cloudinaryThumbUri
    //     });
    // }

    gotoEdit() {
        this.sharedService.presentLoading();
        this.navCtrl.push(PlayerEditPage, {
            playerid: this.registration._id
        });
    }


    // This is not in use. Coach Assessment. Redirect to coach list popup
    // SendToCoach() {
    //     let profileModal = this.modalCtrl.create(CoachListPopup, { coaches: JSON.stringify(this.registration.assessedCoaches) });
    //     profileModal.onDidDismiss(data => {
    //         if (data) {
    //             // this.sharedService.presentLoading();
    //             this.registration.assessedCoaches = data;
    //             this.playerService
    //                 .SendToCoach(this.registration)
    //                 .subscribe(res => {
    //                     if (res.status == true) {                                                        
    //                     }
    //                     this.sharedService.dismissLoading();
    //                 });
    //         }
    //     });
    //     profileModal.present();
    // }

    AddToSession() {
        let profileModal = this.modalCtrl.create(SessionListPopup, { IsPlayer: true, sessions: JSON.stringify(this.registration.sessions) });
        profileModal.onDidDismiss(data => {
            if (data) {
                // this.sharedService.presentLoading();
                this.registration.sessions = data;
                if (data.length > 0) {
                    this.registration.sessionKey = data[0].sessionKey;
                }
                else {
                    this.registration.sessionKey = null;
                }
                this.playerService
                    .AddToSession(this.registration)
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