import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Skill } from '../../models/skill';
import { SkillService } from '../../providers/skill.service'
import { SharedService } from '../../providers/shared.service'
import * as resources from '../../app/resources'
import { SkillListPage } from '../skill/skill.list'

@Component({
    selector: 'page-skill-edit',
    templateUrl: 'skill.edit.html'
})
export class SkillEditPage implements OnInit {
    skillEdit: Skill;
    skillEditForm: FormGroup;

    constructor(public navCtrl: NavController,
        public skillService: SkillService,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        public sharedService: SharedService,
        private viewCtrl: ViewController) {
        this.skillEdit = new Skill();

        this.skillEditForm = formBuilder.group({
            name: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            instructions: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
        });
    }

    ngOnInit() {
        if (this.navParams.get('skillId') != undefined) {
            let skillId = this.navParams.get('skillId');            
            this.skillService.getById(skillId).subscribe((obj) => {
                if (obj.hasOwnProperty('name')) {
                    this.skillEdit.name = obj.name;
                }
                if (obj.hasOwnProperty('_id')) {
                    this.skillEdit._id = obj._id;
                }
                if (obj.hasOwnProperty('instructions')) {
                    this.skillEdit.instructions = obj.instructions;
                }
                this.sharedService.dismissLoading();
            });

        }
    }

    onSubmit() {
        let invalidMessages = "";
        if (!this.skillEditForm.valid) {
            if (!invalidMessages) {
                invalidMessages = resources.message.alert_incomplete;
            }
            let invalidAlert = this.alertCtrl.create({
                title: resources.message.alert_skill_title,
                subTitle: invalidMessages,
                buttons: [resources.message.alert_ok]
            });
            invalidAlert.present();
        }
        else {
            this.sharedService.presentLoading();
            this.skillService
                .UpdateSkill(this.skillEdit)
                .subscribe(res => {
                    if (res.status == true) {
                        this.navCtrl.setRoot(SkillListPage);
                    }
                });
        }
    }
}

