import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { SkillService } from '../../providers/skill.service'
import { SharedService } from '../../providers/shared.service'
import { Skill } from '../../models/skill';
import { SkillEditPage } from './skill.edit';
import { SkillCreatePage } from './skill.create';
// import { SignInPage } from '../user/user.signin';

@Component({
    selector: 'page-skill',
    templateUrl: 'skill.list.html'
})
export class SkillListPage {
    skillList: Skill[]
    skillFiltered: Skill[];
    isClicked = false;
    constructor(public navCtrl: NavController, private skillService: SkillService, private sharedService: SharedService,
        public navParams: NavParams, private viewCtrl: ViewController
    ) {
        this.sharedService.presentLoading();
        skillService.getAll().subscribe((res) => {
            this.skillList = this.skillFiltered = res;
            this.sharedService.dismissLoading();
        });
    }
    goToCreate() {
        this.navCtrl.push(SkillCreatePage, {
        });
    }
    gotoDetail(skill) {
        this.sharedService.presentLoading();
        this.navCtrl.push(SkillEditPage, {
            skillId: skill._id
        });
    }

    // Filter for skills
    // Handle input event from filter bar
    filter(filtertext) {
        // let term = filtertext.target.value;
        let term = filtertext;
        if (term) {
            // let regexName = new RegExp("^" + term, "i");        
            let regex = new RegExp(term, "i"); // regex to match filter text with case insensitive.
            if (term.trim() != '') {
                this.skillFiltered = this.skillList.filter(reg => regex.test(reg.name));
            }
            else {                
                this.skillFiltered = this.skillList;
            }
        }
        else {
            this.skillFiltered = this.skillList;
        }
    }

    onClear() {
        this.skillFiltered = this.skillList;
    }
} 
