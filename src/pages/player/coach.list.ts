import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';
import {PlayerService} from '../../providers/player.service'
import {SharedService} from '../../providers/shared.service'
import {Coach} from '../../models/coach';

@Component({
    selector: 'page-coach',
    templateUrl: 'coach.list.html'
})
// This is not in use
export class CoachListPopup {
    coachList: Coach[] = [];
    selectedCoaches = [];
    preSelected = [];
    isClicked = false;
    constructor(public navCtrl: NavController, private playerService: PlayerService, private sharedService: SharedService,
        public navParams: NavParams, private viewCtrl: ViewController
    ) {
        this.sharedService.presentLoading();
        if (navParams.get("coaches")) {
            this.preSelected = JSON.parse(navParams.get("coaches"));            
        }
        playerService.getAllCoaches().subscribe((res) => {
            this.coachList = res;
            if (this.preSelected && this.preSelected.length > 0) {
                this.coachList.forEach(c => {
                    let index = this.preSelected.map(function (c) { return c['coachID']; }).indexOf(c._id)
                    if (index > -1) {
                        c.selected = true;
                        let coachObject = new Coach();
                        coachObject.coachID = c._id;
                        coachObject.coachName = c.coachName;
                        coachObject.selected = true;
                        this.selectedCoaches.push(coachObject);
                    }
                    else {
                        c.selected = false;
                    }
                });
            }
            this.sharedService.dismissLoading();
        });
    }

    tapCoach(coach, event) {
        this.isClicked = true;
        if (event.currentTarget.classList.contains("selected-item")) {
            if (this.selectedCoaches.length > 0) {                
                let index = this.selectedCoaches.map(function (c) { return c['coachID']; }).indexOf(coach._id)                                
                this.selectedCoaches.splice(index, 1);                
            }
            event.currentTarget.classList.remove("selected-item");
        }
        else {
            let coachObject = new Coach();
            coachObject.coachID = coach._id;
            coachObject.coachName = coach.coachName;
            coachObject.selected = true;
            this.selectedCoaches.push(coachObject);
            event.currentTarget.classList.add("selected-item");
        }
    }

// this is not in use
    setSelected(coach) {        
        if (this.preSelected && this.preSelected.length > 0) {            
            let index = this.preSelected.map(function (c) { return c['coachID']; }).indexOf(coach._id)            
            if (index > -1) {
                if (!this.isClicked) {
                    let coachObject = new Coach();
                    coachObject.coachID = coach._id;
                    coachObject.coachName = coach.coachName;
                    this.selectedCoaches.push(coachObject);
                }
                return true;
            }
            else {
                return false;
            }
        }        
        return false;
    }

    dismiss() {
        this.selectedCoaches.splice(0, this.selectedCoaches.length);
        this.viewCtrl.dismiss();
    }
    apply() {                
        this.sharedService.presentLoading();
        this.viewCtrl.dismiss(this.selectedCoaches);
    }
} 
