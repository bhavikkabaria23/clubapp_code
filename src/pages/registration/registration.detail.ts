import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import { AlertController, Platform } from 'ionic-angular';
import { Image } from '../../models/image';
// import { Registration } from '../../models/registration'
import { RegistrationService } from '../../providers/registration.service';
import { PlayerService } from '../../providers/player.service';
import { SharedService } from '../../providers/shared.service'
import { PlayerListPage } from '../player/player.list';
import { RegistrationListPage } from '../registration/registration.list';
// import { ImageManager } from '../../providers/image.manager.component';
import { Camera, Transfer } from 'ionic-native';

import * as resources from '../../app/resources'

@Component({
    selector: 'page-registration-detail',
    templateUrl: 'registration.detail.html'
})

export class RegistrationDetailPage implements OnInit {
    // images: Image[] = [];
    registration: any = {};
    buttonCaption: string = "Upload";
    ageGroupData: any = [];
    disableAgeGroup: boolean = true;
    registrationForm: FormGroup;
    IsPlayerSubmit: boolean = false;
    public base64Image: string = '';
    public cloudinaryImageUri: string = resources.url.defaultImagePath;
    public cloudinaryThumbUri: string = resources.url.defaultImagePath;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private platform: Platform,
        // public imageManager: ImageManager,
        private playerService: PlayerService,
        private registrationService: RegistrationService,
        public sharedService: SharedService,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,        
        private viewCtrl: ViewController,
        public modalCtrl: ModalController) {
        // this.registration = new Registration();

        this.registrationForm = formBuilder.group({
            playerName: ['', Validators.compose([Validators.maxLength(30),
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
    }

    ngOnInit() {
        if (this.navParams.get('registerid') != undefined) {
            let registerid = this.navParams.get('registerid');
            this.registration._id = registerid;
            this.registrationService.getById(registerid).subscribe((obj) => {
                var maxAge = new Date().getFullYear() - new Date(obj.birthDate).getFullYear();
                this.sharedService.GetAgeGroups(maxAge).subscribe(res => {
                    this.ageGroupData = res;
                    if (this.ageGroupData.length !== 0) {
                        this.disableAgeGroup = false;
                    }
                });

                if (obj.hasOwnProperty('playerID')) {
                    this.registration.playerID = obj.playerID;
                }
                if (obj.hasOwnProperty('playerName')) {
                    this.registration.playerName = obj.playerName;
                }
                if (obj.hasOwnProperty('fFANumber')) {
                    this.registration.fFANumber = obj.fFANumber;
                }
                if (obj.hasOwnProperty('birthDate')) {
                    this.registration.birthDate = obj.birthDate;
                }
                if (obj.hasOwnProperty('ageGroup')) {
                    this.registration.ageGroup = obj.ageGroup;
                }
                if (obj.hasOwnProperty('preferredPlayingPosition')) {
                    this.registration.preferredPlayingPosition = obj.preferredPlayingPosition;
                }
                if (obj.hasOwnProperty('gender')) {
                    this.registration.gender = obj.gender;
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

                if (obj.hasOwnProperty('contactPerson1') && obj.contactPerson1 != null) {
                    if (obj.contactPerson1.hasOwnProperty('_id')) {
                        this.registration.contactPerson1_id = obj.contactPerson1._id;
                    }
                    if (obj.contactPerson1.hasOwnProperty('personName')) {
                        this.registration.contact1_personName = obj.contactPerson1.personName;
                    }
                    if (obj.contactPerson1.hasOwnProperty('relationship')) {
                        this.registration.contact1_relationship = obj.contactPerson1.relationship;
                    }
                    if (obj.contactPerson1.hasOwnProperty('contactNumber')) {
                        this.registration.contact1_contactNumber = obj.contactPerson1.contactNumber;
                    }
                    if (obj.contactPerson1.hasOwnProperty('email')) {
                        this.registration.contact1_email = obj.contactPerson1.email;
                    }
                }

                if (obj.hasOwnProperty('contactPerson2') && obj.contactPerson2 != null) {
                    if (obj.contactPerson2.hasOwnProperty('_id')) {
                        this.registration.contactPerson2_id = obj.contactPerson2._id;
                    }
                    if (obj.contactPerson2.hasOwnProperty('personName')) {
                        this.registration.contact2_personName = obj.contactPerson2.personName;
                    }
                    if (obj.contactPerson2.hasOwnProperty('relationship')) {
                        this.registration.contact2_relationship = obj.contactPerson2.relationship;
                    }
                    if (obj.contactPerson2.hasOwnProperty('contactNumber')) {
                        this.registration.contact2_contactNumber = obj.contactPerson2.contactNumber;
                    }
                    if (obj.contactPerson2.hasOwnProperty('email')) {
                        this.registration.contact2_email = obj.contactPerson2.email;
                    }
                }

                if (obj.hasOwnProperty('studyWorkDetails') && obj.studyWorkDetails != null) {
                    if (obj.studyWorkDetails.hasOwnProperty('_id')) {
                        this.registration.studyWorkDetails_id = obj.studyWorkDetails._id;
                    }
                    if (obj.studyWorkDetails.hasOwnProperty('schoolDetails')) {
                        this.registration.schoolDetails = obj.studyWorkDetails.schoolDetails;
                    }
                    if (obj.studyWorkDetails.hasOwnProperty('employementDetails')) {
                        this.registration.employementDetails = obj.studyWorkDetails.employementDetails;
                    }
                }

                if (obj.hasOwnProperty('playingHistory') && obj.playingHistory != null) {
                    if (obj.playingHistory.hasOwnProperty('_id')) {
                        this.registration.playingHistory_id = obj.playingHistory._id;
                    }
                    if (obj.playingHistory.hasOwnProperty('previousClub2016')) {
                        this.registration.previousClub2016 = obj.playingHistory.previousClub2016;
                    }
                    if (obj.playingHistory.hasOwnProperty('previousClub2015')) {
                        this.registration.previousClub2015 = obj.playingHistory.previousClub2015;
                    }
                    if (obj.playingHistory.hasOwnProperty('suspensionsDetails')) {
                        this.registration.suspensionsDetails = obj.playingHistory.suspensionsDetails;
                    }
                    if (obj.playingHistory.hasOwnProperty('injuriesDetails')) {
                        this.registration.injuriesDetails = obj.playingHistory.injuriesDetails;
                    }
                }

                if (obj.hasOwnProperty('footballAcademyDetails') && obj.footballAcademyDetails != null) {
                    if (obj.footballAcademyDetails.hasOwnProperty('_id')) {
                        this.registration.footballAcademyDetails_id = obj.footballAcademyDetails._id;
                    }
                    if (obj.footballAcademyDetails.hasOwnProperty('headCoachName')) {
                        this.registration.headCoachName = obj.footballAcademyDetails.headCoachName;
                    }
                    if (obj.footballAcademyDetails.hasOwnProperty('contactDetails')) {
                        this.registration.contactDetails = obj.footballAcademyDetails.contactDetails;
                    }
                    if (obj.footballAcademyDetails.hasOwnProperty('academicSessionPerWeekCount')) {
                        this.registration.academicSessionPerWeekCount = obj.footballAcademyDetails.academicSessionPerWeekCount;
                    }
                    if (obj.footballAcademyDetails.hasOwnProperty('arrangedBy')) {
                        this.registration.arrangedBy = obj.footballAcademyDetails.arrangedBy;
                    }
                    if (obj.footballAcademyDetails.hasOwnProperty('destination')) {
                        this.registration.destination = obj.footballAcademyDetails.destination;
                    }
                    if (obj.footballAcademyDetails.hasOwnProperty('purposeOfTrip')) {
                        this.registration.purposeOfTrip = obj.footballAcademyDetails.purposeOfTrip;
                    }
                }

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

    onChangeDate(selectedDate) {
        if (selectedDate) {
            this.sharedService.presentLoading();
            //date is age of next year
            //7 and 8 year olds are in the same age group.
            //ages start at 0 or -1 required;
            var maxAge = new Date('01/01/2017').getFullYear() - 1 - selectedDate.year.value;
            if (maxAge === 7)
                maxAge = 8;
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

    PlayerSubmit() {
        this.IsPlayerSubmit = true;
    }

    RegistrationSubmit() {
        this.IsPlayerSubmit = false;
    }

    onSubmit() {

        let invalidMessages = "";
        if (!this.registrationForm.valid) {
            if (!this.registrationForm.controls["playerName"].valid) {
                invalidMessages += "Player name is not valid.<br>";
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
            if (this.IsPlayerSubmit) {
                //console.log("convert to player");
                // this.playerService
                //     .ValidateEmail(this.registration.email)
                //     .subscribe(res => {
                //         if (res.status == true) {
                //             this.sharedService.dismissLoading();
                //             let alertEmail = this.alertCtrl.create({
                //                 title: resources.message.alert_update_title,
                //                 subTitle: resources.message.email_exist,
                //                 buttons: [resources.message.alert_ok]
                //             });
                //             alertEmail.present();
                //         }
                //         else {
                this.postRegistration();
                // }
                // });
            }
            else {
                //console.log("submit");
                // Need to check email exist validation
                this.registrationService
                    .Update(this.registration)
                    .subscribe(res => {
                        if (res.status) {
                            this.navCtrl.setRoot(RegistrationListPage)
                        }
                    });
            }
        }
    }

    postRegistration() {
        let name = this.registration.playerName.split(" ");
        let fname = "";
        let lname = " ";
        if (name.length > 0) {
            name.forEach(function (item, i) {
                if (i == 0) {
                    fname = item;
                }
                else {
                    lname = lname + " " + item;
                }
            });
        }
        this.registration.givenName = fname;
        this.registration.familyName = lname.trim();
        //console.log(this.registration.givenName + "||" + this.registration.familyName)

        this.playerService
            .Register(this.registration)
            .subscribe(res => {
                if (res.status) {
                    // this.sharedService.dismissLoading();
                    // this.navCtrl.push(PlayerListPage, {
                    // });
                    this.navCtrl.setRoot(PlayerListPage)
                    // let alert = this.alertCtrl.create({
                    //     title: resources.message.alert_title,
                    //     subTitle: resources.message.alert_message,
                    //     buttons: [resources.message.alert_ok]
                    // });
                    // alert.present();
                    // this.registration = new Registration();
                }
            });
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

    // This is not in use
    // AssessToCoach() {
    //     let profileModal = this.modalCtrl.create(CoachListPopup, { coaches: JSON.stringify(this.registration.coaches) });
    //     profileModal.onDidDismiss(data => {
    //         this.registration.coaches = data;
    //     });
    //     profileModal.present();
    // }
}