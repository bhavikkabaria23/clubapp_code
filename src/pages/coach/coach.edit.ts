import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
// import { Coach } from '../../models/coach.detail';
import { CoachService } from '../../providers/coach.service'
import { SharedService } from '../../providers/shared.service'
import * as resources from '../../app/resources'
import { CoachListPage } from './coach.list';
// import { ImageManager } from '../../providers/image.manager.component';
import { Image } from '../../models/image';

import { Camera, Transfer } from 'ionic-native';

@Component({
    selector: 'page-coach-edit',
    templateUrl: 'coach.edit.html'
})
export class CoachEditPage implements OnInit {
    // images: Image[] = [];
    registration: any = {};
    // imagerecord: Image;
    registrationForm: FormGroup;
    // filesrcP: any = null;
    saveFiles: any = [];
    public base64Image: string = '';
    public cloudinaryImageUri: string = resources.url.defaultImagePath;
    public cloudinaryThumbUri: string = resources.url.defaultImagePath;
    constructor(public navCtrl: NavController,
        public platform: Platform,
        public navParams: NavParams,
        public coachService: CoachService,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        // public imageManager: ImageManager,
        public sharedService: SharedService,
        private viewCtrl: ViewController) {
        // this.registration = new Coach();

        this.registrationForm = formBuilder.group({
            familyName: ['', Validators.compose([Validators.maxLength(30),
                Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            givenName: ['', Validators.compose([Validators.maxLength(30),
                Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            birthDate: ['', Validators.compose([Validators.required])],
            coachingLicence: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            childrenRegistration: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            gender: ['', Validators.compose([Validators.required])],
            residentialAddress: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
            homeNumber: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
            mobileNumber: ['', Validators.compose([Validators.maxLength(20), Validators.required])],

            contact1_personName: ['', Validators.compose([Validators.maxLength(30), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
            contact1_relationship: ['', Validators.compose([Validators.maxLength(20), Validators.required, Validators.pattern('[a-zA-Z ]*')])],
            contact1_contactNumber: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
            contact1_email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],

            previousClub2016: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
            previousClub2015: ['', Validators.compose([Validators.maxLength(200), Validators.required])],
            suspensionsDetails: ['', Validators.compose([Validators.maxLength(500), Validators.required])],
        });
        // this.imagerecord = new Image();
        // this.filesrcP = resources.url.defaultImagePath;
    }

    ngOnInit() {
        if (this.navParams.get('coachid') != undefined) {
            this.sharedService.presentLoading();
            let coachid = this.navParams.get('coachid');
            this.registration._id = coachid;
            this.coachService.getById(coachid).subscribe((obj) => {
                if (obj.hasOwnProperty('givenName')) {
                    this.registration.givenName = obj.givenName
                }
                if (obj.hasOwnProperty('familyName')) {
                    this.registration.familyName = obj.familyName
                }
                if (obj.hasOwnProperty('birthDate')) {
                    this.registration.birthDate = obj.birthDate
                }
                if (obj.hasOwnProperty('fFANumber')) {
                    this.registration.fFANumber = obj.fFANumber
                }
                if (obj.hasOwnProperty('coachingLicence')) {
                    this.registration.coachingLicence = obj.coachingLicence
                }
                if (obj.hasOwnProperty('childrenRegistration')) {
                    this.registration.childrenRegistration = obj.childrenRegistration
                }
                if (obj.hasOwnProperty('gender')) {
                    this.registration.gender = obj.gender
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
                if (obj.hasOwnProperty('suspensionsDetails')) {
                    this.registration.suspensionsDetails = obj.suspensionsDetails
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

                // if (obj.hasOwnProperty('imageManager')) {
                //     if (obj.imageManager !== null && obj.imageManager.length > 0) {
                //         this.imageManager.getImages(obj.imageManager[0].name).subscribe((data) => {
                //             this.filesrcP = data;
                //             if (data) {
                //                 this.registration.images = obj.imageManager;
                //             }
                //         }, (err) => console.log(err));
                //     }
                //     else {
                //         this.filesrcP = resources.url.defaultImagePath;
                //     }
                // }
                this.registration.images = [];

                if (obj.hasOwnProperty('images') && obj.images != null && obj.images.length > 0) {
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
            this.sharedService.dismissLoading();
        }
    }
    takePhoto() {
        console.log('takePhoto');

        this.cloudinaryImageUri = '';
        this.cloudinaryThumbUri = '';
        this.base64Image = '';

        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imagedata) => {
            //console.log('photo taken');
            this.base64Image = 'data:image/jpeg;base64,' + imagedata;
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
        console.log('savePhoto');

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

                console.log('uploadPhoto is done');

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

    // This is not in use
    // uploadChange(files: any) {
    //     if (files.length !== 0) {
    //         // loop through files
    //         this.saveFiles = [];
    //         for (var i = 0; i < files.length; i++) {
    //             this.saveFiles.push(files.item(i));
    //         }
    //     }
    // }

    onSubmit() {
        let invalidMessages = "";
        if (!this.registrationForm.valid) {

            if (!this.registrationForm.controls["coachName"].valid) {
                invalidMessages += "Coach name is not valid.<br>";
            }
            if (!this.registrationForm.controls["contact1_personName"].valid) {
                invalidMessages += "Contact person name is not valid.<br>";
            }
            if (!this.registrationForm.controls["contact1_relationship"].valid) {
                invalidMessages += "Contact person relationship is not valid.<br>";
            }
            if (!this.registrationForm.controls["contact1_relationship"].valid) {
                // check email exist
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
            // Update coach details            
            this.sharedService.presentLoading();
            // Update player details      
            if (this.registration._id) {
                // if (this.platform.is("mobileweb") || this.platform.is("core")) {
                // if (this.saveFiles.length !== 0) {
                //     this.imageManager.uploadFile("https://image-server-robert-leidl.c9users.io/fileuploadForm", [], this.saveFiles)
                //         .subscribe((res) => {
                //             if (res.status) {
                //                 this.registration.images = res.guidList;
                //                 this.UpdatePlayer();
                //             }
                //         });
                // } 
                // if (this.imageUrl !== "") {
                // console.log('savePhoto');

                // let imageName = this.randomString(16, 36);
                // this.uploadPhoto(imageName, resources.cloudinary.UPLOAD_PRESET);
                //     // .subscribe((res) => {
                //         // if (res.status) {
                //          //   this.registration.images = res.guidList;
                //             this.UpdatePlayer();
                //         // }
                //         // this.imageUrl="";
                //     // })
                // }
                // else {
                this.UpdateCoach();
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

    UpdateCoach() {
        this.coachService
            .Update(this.registration)
            .subscribe(res => {
                if (res.status == true) {
                    this.navCtrl.setRoot(CoachListPage);
                }
                else {
                    this.sharedService.dismissLoading();
                }
            });
    }
} 
