import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SharedService } from '../../providers/shared.service';
import * as resources from '../../app/resources'

@Component({
    selector: 'assessment-player-pop',
    template: `
<ion-header>
    <ion-navbar>
        <ion-title>Assessment for {{player.playerID}}</ion-title>
    </ion-navbar>
</ion-header>

<ion-content no-padding>
      <ion-item *ngIf="session">        
        <ion-datetime [(ngModel)]="session.startDateTime" displayFormat="DD MMM YYYY, HH:00" disabled>
        </ion-datetime>
        <h2>{{player.givenName}} {{player.familyName}}</h2>
        <span item-right><h3>{{player.assessAvg|number:'.1-2'}}</h3>
      <p>{{position(player.preferredPlayingPosition)}}</p>
        </span>
      </ion-item>
      <ion-list *ngFor="let assessment of player.assessments">
        <ion-item-divider color="light">
            {{assessment.coach_id}}
            <span item-right>{{assessment.assessAvg| number:'.1-2'}}</span>
        </ion-item-divider>
        <ion-item *ngFor="let skill of assessment.assessments">
            <ion-label>{{skill.name}}</ion-label>
            <span item-right>{{skill.rating}}</span>
        </ion-item>
        <ion-item>
            <ion-label>Position</ion-label>
            <span item-right>{{propPosition(assessment.position)}}</span>
        </ion-item>
        <ion-item>
            <ion-label>Note</ion-label>
            <span item-right>{{assessment.note}}</span>
        </ion-item>

    </ion-list>
</ion-content>
    `
})
export class AssessmentPlayerPopup implements OnInit {
    player: any;
    session: any;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public sharedService: SharedService) {
    }

    cancel() {
        this.navCtrl.pop();
    }

    ngOnInit() {
        this.player = this.navParams.get('player');
        this.session = this.navParams.get('session');        
        this.player.assessments.map(res => {
            let assessCount = 0;
            res.assessAvg = 0;
            res.assessments.map(res2 => {
                assessCount++;
                res.assessAvg += res2.rating;
            });
            res.assessAvg = res.assessAvg / assessCount;
        });
        //get more coach info ???
        // this.player.assessements.map(res => {
        //     console.log(res);
        // });
    }
    position(num) {
        return resources.common.getPreferredPlayingPosition(num);
    }
    propPosition(num) {
        return resources.common.getProposedPosition(num);
    }
}

