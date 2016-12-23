import { Component } from '@angular/core';
import { ViewController, NavParams, NavController } from 'ionic-angular';
import { SkillService } from '../../providers/skill.service'
import { Skill } from '../../models/skill';
import {SessionService} from '../../providers/session.service'
// import { SignInPage } from '../user/user.signin';

@Component({
    selector: 'skill-list-popup',
    template: `
    <ion-header>
        <ion-navbar>
            <ion-title>Skills</ion-title>
            <ion-buttons right>           
                <button ion-button (click)="save()">    
                Save
                </button>
            </ion-buttons>        
        </ion-navbar>
    </ion-header>
    <ion-content no-padding class="home">
        <ion-list>
            <ion-item *ngFor="let skill of skillList" [ngClass]="{'picked' : skill.selected }"
            (click)="select(skill);skill.selected = !skill.selected">            
                <h2>{{ skill.name }} </h2>
            </ion-item>
        </ion-list>
    </ion-content>
    `
})
export class SkillListPopup {
    skillList: Skill[];
    selectedSkillList: Skill[] = [];
    session: any;
    constructor(private skillService: SkillService,
        private viewCtrl: ViewController,
        public params: NavParams,
        public navCtrl: NavController,
        public sessionService: SessionService
    ) {
        skillService.getAll().subscribe((res) => {
            this.skillList = res;
        });
        this.session = this.params.get('session')
    }
    select(skill) {
        //console.log('clicked' + skill.name);
        let ind = this.selectedSkillList.indexOf(skill);
        if(ind < 0) {
            this.selectedSkillList.push(skill);
        } else {
            this.selectedSkillList.slice(ind, 1);
        }
    }
    save() {
        this.session.skills = this.selectedSkillList;
        this.sessionService.Update(this.session).subscribe(res=> {
            //console.log(res);
        })
        this.navCtrl.pop();
    }
} 
