import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
import { Image } from '../../models/image';
// import { Player } from '../../models/player'
import { PlayerService } from '../../providers/player.service';
import { SharedService } from '../../providers/shared.service';
// import { ImageManager } from '../../providers/image.manager.component';
import { PlayerListPage } from './player.list';

import { Camera, Transfer } from 'ionic-native';
// import { Observable } from 'rxjs/Rx';

import * as resources from '../../app/resources'

@Component({
    selector: 'page-player-edit',
    templateUrl: 'player.edit.html'
})

export class PlayerEditPage implements OnInit {
    // images: Image[] = [];
    // filesrcP: any = null;
    // imagerecord: Image;
    registration: any = {};
    ageGroupData: any = [];
    disableAgeGroup = true;
    buttonCaption: string = "Upload";
    registrationForm: FormGroup;
    saveFiles: any = [];
    public base64Image: string = '';
    public cloudinaryImageUri: string = resources.url.defaultImagePath;
    public cloudinaryThumbUri: string = resources.url.defaultImagePath;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        private playerService: PlayerService,
        private platform: Platform,
        // public imageManager: ImageManager,
        public sharedService: SharedService,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        private viewCtrl: ViewController) {
        // this.registration = new Player();

        this.registrationForm = formBuilder.group({
            // playerName: ['', Validators.compose([Validators.maxLength(30),
            //     Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            givenName: ['', Validators.compose([Validators.maxLength(30),
                Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            familyName: ['', Validators.compose([Validators.maxLength(30),
                Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            fFANumber: ['', Validators.compose([Validators.maxLength(30)])],
            birthDate: ['', Validators.compose([Validators.required])],
            ageGroup: ['', Validators.compose([Validators.required])],
            preferredPlayingPosition: ['', Validators.compose([Validators.required])],
            gender: ['', Validators.compose([Validators.required])],
            objectivesAmbitions: ['', Validators.compose([Validators.maxLength(500)])],

            residentialAddress: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
            homeNumber: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
            mobileNumber: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
            emailAddress: ['', Validators.compose([Validators.maxLength(100), Validators.required])],

            contact1_personName: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
            contact1_relationship: ['', Validators.compose([Validators.maxLength(20), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
            contact1_contactNumber: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
            contact1_email: ['', Validators.compose([Validators.maxLength(100), Validators.required])],

            contact2_personName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
            contact2_relationship: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')])],
            contact2_contactNumber: ['', Validators.compose([Validators.maxLength(20)])],
            contact2_email: ['', Validators.compose([Validators.maxLength(100)])],

            schoolDetails: ['', Validators.compose([Validators.maxLength(500)])],
            employementDetails: ['', Validators.compose([Validators.maxLength(500)])],

            previousClub2016: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
            previousClub2015: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
            suspensionsDetails: ['', Validators.compose([Validators.maxLength(500), Validators.required])],
            injuriesDetails: ['', Validators.compose([Validators.maxLength(500), Validators.required])],

            headCoachName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
            contactDetails: ['', Validators.compose([Validators.maxLength(200)])],
            academicSessionPerWeekCount: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9 ]*')])],
            arrangedBy: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
            destination: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
            purposeOfTrip: ['', Validators.compose([Validators.maxLength(500)])]
        });
        // this.imagerecord = new Image();
        // this.filesrcP = resources.url.defaultImagePath;
    }

    ngOnInit() {
        if (this.navParams.get('playerid') != undefined) {
            let playerid = this.navParams.get('playerid');
            this.registration._id = playerid;

            this.playerService.getById(playerid).subscribe((obj) => {
                var maxAge = new Date().getFullYear() - new Date(obj.birthDate).getFullYear();
                this.sharedService.GetAgeGroups(maxAge).subscribe(res => {
                    this.ageGroupData = res;
                    if (this.ageGroupData.length !== 0) {
                        this.disableAgeGroup = false;
                        //console.log(this.ageGroupData);
                    }
                });

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
                    this.registration.birthDate = obj.birthDate
                }
                if (obj.hasOwnProperty('ageGroup')) {
                    this.registration.ageGroup = obj.ageGroup
                }
                if (obj.hasOwnProperty('preferredPlayingPosition')) {
                    this.registration.preferredPlayingPosition = obj.preferredPlayingPosition
                }
                if (obj.hasOwnProperty('gender')) {
                    this.registration.gender = obj.gender
                }
                if (obj.hasOwnProperty('objectivesAmbitions')) {
                    this.registration.objectivesAmbitions = obj.objectivesAmbitions
                }

                if (obj.hasOwnProperty('residentialAddress')) {
                    this.registration.residentialAddress = obj.residentialAddress
                }
                if (obj.hasOwnProperty('homeNumber')) {
                    this.registration.homeNumber = obj.homeNumber
                }
                if (obj.hasOwnProperty('mobileNumber')) {
                    this.registration.mobileNumber = obj.mobileNumber
                }
                if (obj.hasOwnProperty('email')) {
                    this.registration.email = obj.email
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
                    this.registration.schoolDetails = obj.schoolDetails
                }
                if (obj.hasOwnProperty('employementDetails')) {
                    this.registration.employementDetails = obj.employementDetails
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
                    this.registration.suspensionsDetails = obj.suspensionsDetails
                }
                if (obj.hasOwnProperty('injuriesDetails')) {
                    this.registration.injuriesDetails = obj.injuriesDetails
                }

                if (obj.hasOwnProperty('headCoachName')) {
                    this.registration.headCoachName = obj.headCoachName
                }
                if (obj.hasOwnProperty('contactDetails')) {
                    this.registration.contactDetails = obj.contactDetails
                }
                if (obj.hasOwnProperty('academicSessionPerWeekCount')) {
                    this.registration.academicSessionPerWeekCount = obj.academicSessionPerWeekCount
                }
                if (obj.hasOwnProperty('arrangedBy')) {
                    this.registration.arrangedBy = obj.arrangedBy
                }
                if (obj.hasOwnProperty('destination')) {
                    this.registration.destination = obj.destination
                }
                if (obj.hasOwnProperty('purposeOfTrip')) {
                    this.registration.purposeOfTrip = obj.purposeOfTrip
                }
                // if (obj.hasOwnProperty('imageManager')) {
                //     if (obj.imageManager !== null && obj.imageManager.length > 0) {
                //         this.imageManager.getImages(obj.imageManager[0].name).subscribe((data) => {
                //             this.filesrcP = data;
                //             if (data) {
                //                 this.registration.images = obj.imageManager;
                //                 this.buttonCaption = "Change";
                //             }
                //         }, (err) => console.log(err));
                //     }
                //     else {
                //         this.filesrcP = resources.url.defaultImagePath;
                //     }
                // }
                this.registration.images = [];

                if (obj.hasOwnProperty('images') && obj.images != null && obj.images.length > 0) {
                    //console.log('got images');
                    //console.log(obj.images);

                    obj.images.map(entry => {
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

    // uploadChange(files: any) {
    //     // if (this.platform.is("mobileweb") || this.platform.is("core")) {
    //     if (files.length !== 0) {
    //         // loop through files
    //         this.buttonCaption = "Change";
    //         this.saveFiles = [];
    //         for (var i = 0; i < files.length; i++) {
    //             this.saveFiles.push(files.item(i));
    //         }
    //     }
    //     // } else {
    //     //     this.imagerecord.url = files;
    //     //     this.imagerecord.name = this.imageManager.newGuid();
    //     // }
    // }

    onChangeDate(selectedDate) {
        if (selectedDate) {
            this.sharedService.presentLoading();
            var maxAge = new Date().getFullYear() - selectedDate.year.value;
            this.sharedService.GetAgeGroups(maxAge).subscribe(res => {
                this.ageGroupData = res;
                if (this.ageGroupData.length !== 0) {
                    this.registration.ageGroup = this.ageGroupData[0].ageGroup;
                    //this.disableAgeGroup = false;
                    this.sharedService.dismissLoading();
                }
            });
        }
    }

    takePhoto() {
        //console.log('takePhoto');

        this.cloudinaryImageUri = '';
        this.cloudinaryThumbUri = '';
        this.base64Image = '';

        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imagedata) => {
            //console.log('photo taken');
            //this.base64Image = 'data:image/jpeg;base64,' + imagedata;
        }, (err) => {
            alert('Error when taking photo, please try again.');
            //console.log('error taking photo');
            //console.error(err);
        });
    }

    randomString(len, bits) {
        bits = bits || 36;
        var outStr = "", newStr;
        while (outStr.length < len) {
            newStr = Math.random().toString(bits).slice(2);
            outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
        }
        return outStr.toUpperCase();
    }

    savePhoto() {
        //console.log('savePhoto');

        let imageName = this.randomString(16, 36);

        this.uploadPhoto(imageName, resources.cloudinary.UPLOAD_PRESET);
    }

    uploadPhoto(filename, uploadPreset) {
        //console.log('uploadPhoto - filename ' + filename + ' uploadPreset ' + uploadPreset);

        this.cloudinaryImageUri = '';
        this.cloudinaryThumbUri = '';

        filename = filename + '.jpg';
        this.platform.ready().then(() => {

            let ft = new Transfer();

            let options = {
                fileName: filename,
                params: {
                    fileName: filename,
                    'upload_preset': uploadPreset
                }
            };

            this.sharedService.presentLoading();

            ft.upload(
                this.base64Image,
                resources.cloudinary.API_URL,
                options,
                true
            ).then((result) => {
                let response = JSON.parse(result.response);

                //console.log('photo uploaded');
                //console.log(response);

                this.base64Image = '';
                this.cloudinaryImageUri = response.secure_url;
                this.cloudinaryThumbUri = response.eager[0].secure_url;

                //console.log(this.registration.images);

                this.registration.images = [];

                let fullImage = new Image;

                fullImage.url = this.cloudinaryImageUri;
                fullImage.name = 'main';

                this.registration.images.push(fullImage);

                let thumbImage = new Image;

                thumbImage.url = this.cloudinaryThumbUri;
                thumbImage.name = 'main_thumb';

                this.registration.images.push(thumbImage);

                //console.log(this.registration.images);

                //console.log('uploadPhoto is done');

                this.sharedService.dismissLoading();
                this.onSubmit();
            }).catch((err) => {
                alert('Error when uploading photo, please try again.');

                //console.log('error when uploading photo');
                //console.error(err);

                this.sharedService.dismissLoading();
            });
        });
    }

    onSubmit() {
        let invalidMessages = "";
        if (!this.registrationForm.valid) {
            // if (!this.registrationForm.controls["playerName"].valid) {
            //     invalidMessages += "Player name is not valid.<br>";
            // }
            if (!this.registrationForm.controls["givenName"].valid) {
                invalidMessages += "First name is not valid.<br>";
            }
            if (!this.registrationForm.controls["familyName"].valid) {
                invalidMessages += "Last name is not valid.<br>";
            }
            if (!this.registrationForm.controls["contact1_personName"].valid) {
                invalidMessages += "Contact person name 1 is not valid.<br>";
            }
            if (!this.registrationForm.controls["contact1_relationship"].valid) {
                invalidMessages += "Contact person relationship 1 is not valid.<br>";
            }
            if (!this.registrationForm.controls["contact2_personName"].valid) {
                invalidMessages += "Contact person name 2 is not valid.<br>";
            }
            if (!this.registrationForm.controls["contact2_relationship"].valid) {
                invalidMessages += "Contact person relationship 2 is not valid.<br>";
            }
            if (!this.registrationForm.controls["academicSessionPerWeekCount"].valid) {
                invalidMessages += "Number of sessions per week is not valid.<br>";
            }
            if (!this.registrationForm.controls["arrangedBy"].valid) {
                invalidMessages += "Arraged by is not valid.<br>";
            }
            if (!this.registrationForm.controls["destination"].valid) {
                invalidMessages += "Destination is not valid.<br>";
            }
            if (!this.registrationForm.controls["headCoachName"].valid) {
                invalidMessages += "Head coach name is not valid.<br>";
            }
            if (!invalidMessages) {
                invalidMessages = resources.message.alert_incomplete;
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
            // // Update player details      
            if (this.registration._id) {
                //     // if (this.platform.is("mobileweb") || this.platform.is("core")) {
                //     // if (this.saveFiles.length !== 0) {
                //     //     this.imageManager.uploadFile("https://image-server-robert-leidl.c9users.io/fileuploadForm", [], this.saveFiles)
                //     //         .subscribe((res) => {
                //     //             if (res.status) {
                //     //                 this.registration.images = res.guidList;
                //     //                 this.UpdatePlayer();
                //     //             }
                //     //         });
                //     // } 
                //     if (this.imageUrl !== "") {
                //         console.log('savePhoto');

                //         let imageName = this.randomString(16, 36);
                //         this.uploadPhoto(imageName, resources.cloudinary.UPLOAD_PRESET);
                //     //     // .subscribe((res) => {
                //     //         // if (res.status) {
                //     //          //   this.registration.images = res.guidList;
                //     //             this.UpdatePlayer();
                //     //         // }
                //     //         // this.imageUrl="";
                //     //     // })
                //     }
                //     // else {
                this.UpdatePlayer();
                // }
                // } else {
                //     if (this.imagerecord !== null) {
                //         this.imageManager.StoreImage(this.imagerecord)
                //             .subscribe(res => {
                //                 if (res.status) {                                    
                //                     this.registration.images = res.guidList;
                //                     this.UpdatePlayer();
                //                 }
                //             });
                //     } else {
                //         this.UpdatePlayer();
                //     }

                // }


            }
            else {
                this.sharedService.dismissLoading();
            }
        }
    }

    UpdatePlayer() {
        this.playerService
            .Update(this.registration)
            .subscribe(res => {
                if (res.status == true) {
                    // this.navCtrl.push(PlayerListPage, {
                    // });
                    this.navCtrl.setRoot(PlayerListPage)
                }
            });
    }
}