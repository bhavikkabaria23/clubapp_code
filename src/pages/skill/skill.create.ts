import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Skill } from '../../models/skill';
import { SkillService } from '../../providers/skill.service'
import { SharedService } from '../../providers/shared.service'
import * as resources from '../../app/resources'
import { SkillListPage } from '../skill/skill.list'

@Component({
    selector: 'page-skill-create',
    templateUrl: 'skill.create.html'
})
export class SkillCreatePage implements OnInit {
    skillNew: Skill;
    skillNewForm: FormGroup;
    private skillService: SkillService;

    constructor(public navCtrl: NavController,
        skillService: SkillService,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public formBuilder: FormBuilder,
        public sharedService: SharedService) {
        this.skillService = skillService;
        this.skillNew = new Skill();

        this.skillNewForm = formBuilder.group({
            name: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            instructions: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
        });
    }

    ngOnInit() {
        if (this.navParams.get('skillId') != undefined) {
            let skillId = this.navParams.get('skillId');
            this.skillService.getById(skillId).subscribe((obj) => {
                if (obj.hasOwnProperty('name')) {
                    this.skillNew.name = obj.name;
                }
                if (obj.hasOwnProperty('_id')) {
                    this.skillNew._id = obj._id;
                }
                if (obj.hasOwnProperty('instructions')) {
                    this.skillNew.instructions = obj.instructions;
                }
                this.sharedService.dismissLoading();
            });

        }
    }

    onSubmit() {
        let invalidMessages = "";
        if (!this.skillNewForm.valid) {
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
                .NewSkill(this.skillNew)
                .subscribe(res => {
                    if (res.status == true) {
                        this.navCtrl.setRoot(SkillListPage);
                    }
                });
        }
    }
}

