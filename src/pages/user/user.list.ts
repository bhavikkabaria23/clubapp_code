import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { UserService } from '../../providers/user.service'
import { SharedService } from '../../providers/shared.service'
import { User } from '../../models/user';
import { UserEditPage } from './user.edit';
import { SignInPage } from '../user/user.signin';

@Component({
    selector: 'page-user',
    templateUrl: 'user.list.html'
})
export class UserListPage {
    userList: User[]
    userFiltered: User[];
    isClicked = false;
    constructor(public navCtrl: NavController, private userService: UserService, private sharedService: SharedService) {
        this.sharedService.presentLoading();
        userService.getAll().subscribe((res) => {
            this.userList = this.userFiltered = res;
            this.sharedService.dismissLoading();
        });
    }

    gotoDetail(user) {
        this.sharedService.presentLoading();
        this.navCtrl.push(UserEditPage, {
            ffanumber: user.fFANumber
        });
    }

    // Filter for players
    // Handle input event from filter bar
    filter(filtertext) {
        let term = filtertext;
        if (term) {
            // let regexName = new RegExp("^" + term, "i");        
            let regex = new RegExp(term, "i"); // regex to match filter text with case insensitive.
            if (term.trim() != '') {
                this.userFiltered = this.userList.filter(reg => regex.test(reg.address) || regex.test(reg.fFANumber));
            }
            else {
                this.userFiltered = this.userList;
            }
        }
        else {
            this.userFiltered = this.userList;
        }
    }

    onClear() {
        this.userFiltered = this.userList;
    }

    // // logOut() {
    // //     debugger;
    // //     var storage = {};
    // //     storage = { token: null, coachID: null }
    // //     this.sharedService.settter(storage);
    // //     this.navCtrl.push(SignInPage);
    // // }
} 
