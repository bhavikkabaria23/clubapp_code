import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { SharedService } from '../providers/shared.service'
import { RegistrationListPage } from '../pages/registration/registration.list';
import { AssessmentSessionListPage } from '../pages/assessment/assessment.session.list';
import { PlayerListPage } from '../pages/player/player.list';
import { CoachListPage } from '../pages/coach/coach.list';
import { SessionListPage } from '../pages/session/session.list';
import { SkillListPage } from '../pages/skill/skill.list';
import { SignInPage } from '../pages/user/user.signin';
import { UserListPage } from '../pages/user/user.list';
import { UserRegistrationPage } from '../pages/user/user.registration';
import { CoachDetailPage } from '../pages/coach/coach.detail';
@Component({
    templateUrl: "../pages/menu/menu.html"

})
export class MyApp {
    isAuth: boolean = false;
    rootPage = SignInPage;
    @ViewChild(Nav) nav: Nav;
    pagesRoot: Array<{ title: string, component: any }>;
    pagesAdmin: Array<{ title: string, component: any }>;
    pagesCoach: Array<{ title: string, component: any }>;
    pagesTechnicalDirector: Array<{ title: string, component: any }>;
    pagesPlayer: Array<{ title: string, component: any }>;

    constructor(platform: Platform, private menu: MenuController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });

        // set our app's pages
        this.pagesRoot = [
            { title: 'Registrations', component: RegistrationListPage },
            { title: 'Players', component: PlayerListPage },
            { title: 'Coaches', component: CoachListPage },
            { title: 'Sessions', component: SessionListPage },
            { title: 'Coach Session', component: AssessmentSessionListPage },
            { title: 'Users', component: UserListPage },
            { title: 'User Creation', component: UserRegistrationPage },
            { title: 'Skills', component: SkillListPage },
        ];

        this.pagesAdmin = [
            { title: 'Registrations', component: RegistrationListPage },
            { title: 'Players', component: PlayerListPage },
            { title: 'Coaches', component: CoachListPage },
            { title: 'Sessions', component: SessionListPage },
            { title: 'Coach Session', component: AssessmentSessionListPage },
            { title: 'Users', component: UserListPage },
            { title: 'User Creation', component: UserRegistrationPage },
            { title: 'Skills', component: SkillListPage },
        ];
        this.pagesCoach = [
            { title: 'Coach Session', component: AssessmentSessionListPage },
            { title: 'Coach Details', component: CoachDetailPage },
        ];
        this.pagesTechnicalDirector = [
            { title: 'Players', component: PlayerListPage },
            { title: 'Coaches', component: CoachListPage },
            { title: 'Sessions', component: SessionListPage },
            { title: 'Skills', component: SkillListPage },
        ];
        this.pagesPlayer = [
        ];

    }

    openPage(page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component, {
            masterPage: true
        });
    }

    signOut() {
        this.menu.close();
        this.nav.setRoot(SignInPage);
    }
}