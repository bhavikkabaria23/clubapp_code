import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';

@Component({
  template: `
    <ion-card>
      <ion-card-header no-padding>
        Instructions
      </ion-card-header>

      <ion-card-content no-padding>
        {{instructions}}
      </ion-card-content>
    </ion-card>
  `
})
export class InstructionsPop {
  instructions: string;

  constructor(public viewCtrl: ViewController, public params: NavParams) {
    this.instructions = params.get('instructions');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}