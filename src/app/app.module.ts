import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { RegistrationListPage } from '../pages/registration/registration.list';
import { RegistrationDetailPage } from '../pages/registration/registration.detail';
import { PlayerListPage } from '../pages/player/player.list';
import { PlayerEditPage } from '../pages/player/player.edit';
import { AssessmentCreatePage } from '../pages/assessment/assessment.create';
import { AssessmentPlayerPopup } from '../pages/assessment/assessment.player.popup';
import { AssessmentSessionListPage } from '../pages/assessment/assessment.session.list';
import { InstructionsPop } from '../pages/assessment/instructions.pop';
import { PlayerDetailPage } from '../pages/player/player.detail';
import { CoachDetailPage } from '../pages/coach/coach.detail';
import { SignInPage } from '../pages/user/user.signin';
import { CoachListPopup } from '../pages/player/coach.list';
import { SkillListPage } from '../pages/skill/skill.list';
import { SkillCreatePage } from '../pages/skill/skill.create';
import { SkillEditPage } from '../pages/skill/skill.edit';
import { CoachListPage } from '../pages/coach/coach.list';
import { UserListPage } from '../pages/user/user.list';
import { UserEditPage } from '../pages/user/user.edit';
import { UserRegistrationPage } from '../pages/user/user.registration';
import { CoachEditPage } from '../pages/coach/coach.edit';
import { SessionCreatePage } from '../pages/session/session.create';
import { SessionListPage } from '../pages/session/session.list';
import { SessionListPopup } from '../pages/session/session.list.popup';
import { SkillListPopup} from '../pages/session/skill.list.pop';
import { SessionDetailPage } from '../pages/session/session.detail';

import { RegistrationService } from '../providers/registration.service'
import { CoachService } from '../providers/coach.service'
import { PlayerService } from '../providers/player.service'
import { SharedService } from '../providers/shared.service'
import { UserService } from '../providers/user.service'
import { ImageManager } from '../providers/image.manager.component';
import { SessionService } from '../providers/session.service'
import { SkillService } from '../providers/skill.service'
import { AssessmentService } from '../providers/assessment.service'

@NgModule({
  declarations: [
    MyApp,
    AssessmentCreatePage,
    AssessmentSessionListPage,
    AssessmentPlayerPopup,
    InstructionsPop,
    RegistrationListPage,
    RegistrationDetailPage,
    PlayerListPage,
    PlayerEditPage,
    PlayerDetailPage,
    ImageManager,
    CoachListPopup,
    CoachListPage,
    CoachDetailPage,
    CoachEditPage,
    SessionCreatePage,
    SessionListPage,
    SignInPage,
    UserListPage,
    UserEditPage,
    UserRegistrationPage,
    SessionListPopup,
    SkillListPage,
    SkillListPopup,
    SkillCreatePage,
    SkillEditPage,
    SessionDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AssessmentCreatePage,
    AssessmentSessionListPage,
    AssessmentPlayerPopup,
    InstructionsPop,
    RegistrationListPage,
    RegistrationDetailPage,
    PlayerListPage,
    PlayerEditPage,
    PlayerDetailPage,
    ImageManager,
    CoachListPopup,
    CoachListPage,
    CoachDetailPage,
    CoachEditPage,
    SessionCreatePage,
    SessionListPage,
    SignInPage,
    UserListPage,
    UserEditPage,
    UserRegistrationPage,
    SessionListPopup,
    SkillListPage,
    SkillListPopup,
    SkillCreatePage,
    SkillEditPage,
    SessionDetailPage
  ],
  providers: [AssessmentService, RegistrationService, PlayerService, SharedService, ImageManager, CoachService, UserService, SessionService, SkillService]
})
export class AppModule { }
