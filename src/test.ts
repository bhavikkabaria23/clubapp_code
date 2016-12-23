import './polyfills.ts';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import {
  App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule, NavParams,
  LoadingController, AlertController, GestureController, ViewController, ModalController, PopoverController
} from 'ionic-angular';
import { ConfigMock, NavMock, NavParamsMock, AlertControllerMock, ViewControllerMock, ModalControllerMock, PopOverControllerMock } from './mocks';
import { UserMock, SessionServiceMock, SkillServiceMock, SharedMock, PlayerServiceMock, CoachServiceMock, RegistrationServiceMock, AssessmentMock } from './mock.service';
// import { ClickersServiceMock } from './services/clickers.mock';
import { SkillService } from './providers/skill.service';
import { SessionService } from './providers/session.service';
import { UserService } from './providers/user.service';
import { CoachService } from './providers/coach.service';
import { PlayerService } from './providers/player.service';
import { SharedService } from './providers/shared.service';
import { AssessmentService } from './providers/assessment.service';
import { RegistrationService } from './providers/registration.service';
// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): any { /* no op */ };

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing'),
])
  // First, initialize the Angular testing environment.
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  // Then we find all the tests.
  .then(() => require.context('./', true, /\.spec\.ts/))
  // And load the modules.
  .then(context => context.keys().map(context))
  // Finally, start Karma to run the tests.
  .then(__karma__.start, __karma__.error);

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>): Promise<{ fixture: any, instance: any }> {
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }


  public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
      ],
      providers: [
        App, Platform, Form, Keyboard, MenuController, NavController, LoadingController, GestureController, ModalController,
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: ViewController, useClass: ViewControllerMock },
        { provide: Config, useClass: ConfigMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: NavController, useClass: NavMock },
        { provide: SkillService, useClass: SkillServiceMock },
        { provide: SessionService, useClass: SessionServiceMock },
        { provide: SharedService, useClass: SharedMock },
        { provide: UserService, useClass: UserMock },
        { provide: PlayerService, useClass: PlayerServiceMock },
        { provide: CoachService, useClass: CoachServiceMock },
        { provide: ModalController, useClass: ModalControllerMock },
        { provide: AssessmentService, useClass: AssessmentMock },
        { provide: RegistrationService, useClass: RegistrationServiceMock },
        { provide: PopoverController, useClass: PopOverControllerMock }
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    });
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  public static eventFire(el: any, etype: string): void {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      let evObj: any = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}