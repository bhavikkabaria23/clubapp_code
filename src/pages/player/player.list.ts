import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Player } from '../../models/player';
import { PlayerService } from '../../providers/player.service'
import { SharedService } from '../../providers/shared.service'
import { PlayerDetailPage } from './player.detail';
import { Observable } from 'rxjs/Rx';
// import { SignInPage } from '../user/user.signin';
import * as resources from '../../app/resources'

@Component({
  selector: 'page-player-list',
  templateUrl: 'player.list.html'
})
export class PlayerListPage {
  playerList: any[]
  playerFiltered: any[];
  session: any;
  selectedList: any[];
  selecting: boolean = false;
  constructor(
    public navCtrl: NavController,
    private playerService: PlayerService,
    public navParams: NavParams,
    public sharedService: SharedService) {
    this.sharedService.presentLoading();
    playerService.getAll().subscribe((res) => {
       if (this.navParams.get('selection') != undefined) {
         this.selecting = this.navParams.get('selection');
         this.session = this.navParams.get('session');         
       }
      //       let resTemp = [];      
      // for (let row of res) {
      //     row.thumbnail = resources.url.defaultImagePath;

      //     if (row.images.length > 0) {
      //         for (let img of row.images) {
      //             if (img.name == 'main_thumb') {
      //                 row.thumbnail = img.url;
      //             }
      //         }
      //     }

      //     resTemp.push(row);
      // }

      // res = resTemp;
      res.map(row=>{
        row.thumbnail = resources.url.defaultImagePath;

          if (row.images.length > 0) {
              for (let img of row.images) {
                  if (img.name == 'main_thumb') {
                      row.thumbnail = img.url;
                  }
              }
              if(this.session) {
                row.selected = row.sessionKey === this.session.sessionKey;                
              }

          }
      })
      this.playerList = this.playerFiltered = res;

      this.sharedService.dismissLoading();
    });
  }

  gotoDetail(player) {
    if(this.selecting) {
      player.changed = true;      
      if(player.selected) {
        player.selected = false;
        player.sessionKey = null;
      } else {
        player.selected = true;
        player.sessionKey = this.session.sessionKey;
      }      
    } else {
      this.sharedService.presentLoading();
      this.navCtrl.push(PlayerDetailPage, {
        playerid: player._id
      });
    }
    
  }

  // Filter for players
  // Handle input event from filter bar
  filter(filtertext) {
    // let term = filtertext.target.value;
    let term = filtertext;
    if (term) {
      // let regexName = new RegExp("^" + term, "i");        
      let regex = new RegExp(term, "i"); // regex to match filter text with case insensitive.
      if (term.trim() != '') {
        this.playerFiltered = this.playerList.filter(reg => regex.test(reg.givenName) || regex.test(reg.familyName) || regex.test(reg.playerID));
      }
      else {        
        console.log(this.playerList);
        this.playerFiltered = this.playerList;
      }
    }
    else {
      this.playerFiltered = this.playerList;
    }
  }
  
  onClear() {
    this.playerFiltered = this.playerList;
  }

  apply() {
    this.sharedService.presentLoading();
    Observable.forkJoin(
      this.playerList.filter(res=> {
        return res.changed == true;
      }).map(res2=> {
        console.log('sds');        
        return this.playerService.AddToSession(res2);
      })
    ).subscribe(()=> {
      console.log('completed');
      this.navCtrl.pop();
      this.sharedService.dismissLoading();
    });
    // this.navCtrl.pop();
    // this.sharedService.dismissLoading();
  }
}
