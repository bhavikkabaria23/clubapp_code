
// IONIC:

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class ViewControllerMock {
  showBackButton(shouldShow: boolean) {
    return true;
  };
  init(componentRef: any) {
    return true;
  }
  _setNav(navCtrl: any) {
    return true;
  }
  _setInstance(instance: any) {
    return true;
  }
  subscribe(generatorOrNext?: any) {
    return true;
  }
  emit(data?: any) {
    return true;
  }
  onDidDismiss(callback: Function) {
    return true;
  }
  onWillDismiss(callback: Function) {
    return true;
  }
  dismiss(data?: any, role?: any, navOptions?: any) {
    return true;
  }
  getNav() {
    return true;
  }
  getTransitionName(direction: string) {
    return true;
  }
  getNavParams() {
    return true;
  }
  setLeavingOpts(opts: any) {
    return true;
  }
  enableBack() {
    return true;
  }
  isFirst() {
    return true;
  }
  isLast() {
    return true;
  }
  _domShow(shouldShow: boolean, renderer: any) {
    return true;
  }
  _setZIndex(zIndex: number, renderer: any) {
    return true;
  }
  pageRef() {
    return true;
  }
  _setContent(directive: any) {
    return true;
  }
  getContent() {
    return true;
  }
  _setContentRef(elementRef: any) {
    return true;
  }
  contentRef() {
    return true;
  }
  _setIONContent(content: any) {
    return true;
  }
  getIONContent() {
    return true;
  }
  _setIONContentRef(elementRef: any) {
    return true;
  }
  getIONContentRef() {
    return true;
  }
  _setHeader(directive: any) {
    return true;
  }
  getHeader() {
    return true;
  }
  _setFooter(directive: any) {
    return true;
  }
  getFooter() {
    return true;
  }
  _setNavbar(directive: any) {
    return true;
  }
  getNavbar() {
    return true;
  }
  hasNavbar() {
    return true;
  }
  setBackButtonText(val: string) {
    return true;
  }
  _preLoad() {
    return true;
  }
  _willLoad() {
    return true;
  }
  _didLoad() {
    return true;
  }
  _willEnter() {
    return true;
  }
  _didEnter() {
    return true;
  }
  _willLeave() {
    return true;
  }
  _didLeave() {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class NavParamsMock {
  public value: any;
  public getValues = {
    player: {
      "_id": "581978a9827c5c42d832a8fc",
      "note": "great",
      "sessionKey": "201610281800U009",
      "coach_id": "4343245",
      "player_id": "U16001",
      "__v": 0,
      "position": 11,
      "isActive": true,
      "modifiedDate": "2016-11-04T06:52:43.955Z",
      "createdDate": "2016-11-02T05:24:57.468Z",
      "assessments": [
        {
          "_id": "581037f47ccce39b86ac2f07",
          "note": "testing2",
          "sessionKey": "thisisatestsessionkey",
          "coach_id": "333333",
          "player_id": "5511",          
          "isActive": true,
          "modifiedDate": "2016-10-26T04:58:44.736Z",
          "createdDate": "2016-10-26T04:58:28.789Z",
          "assessments": [
            {
              "_id": "581037f47ccce39b86ac2f0b",
              "instructions": "this is how we do it",
              "rating": 4,
              "name": "test"
            },
            {
              "_id": "581037f47ccce39b86ac2f0a",
              "instructions": "this is how we do it",
              "rating": 3,
              "name": "test2"
            },
            {
              "_id": "581037f47ccce39b86ac2f09",
              "instructions": "this is how we do it",
              "rating": 4,
              "name": "test3"
            },
            {
              "_id": "581037f47ccce39b86ac2f08",
              "instructions": "this is how we do it",
              "rating": 3,
              "name": "test4"
            }
          ]
        },
        {
          "_id": "58130009da43bc092744f51d",
          "note": "stuff",
          "sessionKey": "201610231800U009",
          "coach_id": "4343245",
          "player_id": "123444",          
          "isActive": true,
          "modifiedDate": "2016-10-29T04:27:57.204Z",
          "createdDate": "2016-10-28T07:36:41.488Z",
          "assessments": [
            {
              "instructions": "kick da ball",
              "name": "kicking",
              "_id": "580ec32e059d26a48067f235",
              "rating": 1
            },
            {
              "instructions": "test da field",
              "name": "test",
              "_id": "580de0f99397a24d5af3dc57",
              "rating": 4
            },
            {
              "name": "Running ",
              "_id": "5812fdebda43bc092744f51c",
              "rating": 5
            }
          ]
        }
      ]
    },
    ffanumber: "123456",
    skillId: "580de0f99397a24d5af3dc57",
    coachid: "5809b9544de3c55cb1a46713",
    selection: false,
    session: {
      "_id": "580b551428d909b39ffced1b",
      "sessionKey": "201610231800U009",
      "startDateTime": "2016-10-23T18:00:00.000Z",
      "skills": [
        {
          "instructions": "test da field",
          "name": "test",
          "_id": "580de0f99397a24d5af3dc57"
        },
        {
          "name": "Running ",
          "_id": "5812fdebda43bc092744f51c"
        }
      ],
      "ended": false,
      "players": [],
      "coaches": [],
      "isActive": true,
      "modifiedDate": "2016-11-03T06:18:15.952Z",
      "createdDate": "2016-10-22T12:01:24.824Z"
    },
    registerid: "5805940cd1150b0d209669fc",
    playerid: "58137c43344ed928740f7ed2",
    sessionKey: "201610231800U009",
    sessions: '[{"sessionKey":"201610231800U009"}]',
    instructions:"kick da ball"
  }
  get(val: any) {
    //for (val in this.getValues) {
    if (this.getValues.hasOwnProperty(val)) {
      this.value = this.getValues[val];
      return this.value;
    }
    else {
      return this.value;
    }
    //}    
  }
  set(val: any) {
    return this.value = val;
  }
}

export class ModalMock extends ViewControllerMock {
  public present(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}
export class ModalControllerMock {
  public create() {
    return new ModalMock();
  }
}

export class AlertMock {
  public present(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}
export class AlertControllerMock {
  public create() {
    return new AlertMock();
  }
}

export class PopOverMock {
  public present(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}
export class PopOverControllerMock {
  public create() {
    return new PopOverMock();
  }
}
