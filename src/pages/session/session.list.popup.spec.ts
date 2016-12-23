import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SessionListPopup }             from './session.list.popup';

let fixture: ComponentFixture<SessionListPopup> = null;
let instance: any = null;

describe('SessionListPopup', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([SessionListPopup]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.autoDetectChanges(true);
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it('initialises', () => {
        expect(fixture).not.toBeNull();
        expect(instance).not.toBeNull();
    });

    it('Tap to select session for player', () => {
        let session = {
            "_id": "580b551428d909b39ffced1b",
            "sessionKey": "201610231800U009",
            "__v": 0,
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
            "createdDate": "2016-10-22T12:01:24.824Z",
            "selected": true
        }
        spyOn(instance, 'tapPlayerSession').and.callThrough();
        instance.tapPlayerSession(session);
        expect(instance.tapPlayerSession).toHaveBeenCalledWith(session);
    });
    it('Tap to remove selection of session for player', () => {
        let session = {
            "_id": "580b551428d909b39ffced1b",
            "sessionKey": "201610231800U009",
            "__v": 0,
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
            "createdDate": "2016-10-22T12:01:24.824Z",
            "selected": false
        }
        spyOn(instance, 'tapPlayerSession').and.callThrough();
        instance.tapPlayerSession(session);
        expect(instance.tapPlayerSession).toHaveBeenCalledWith(session);
    });

    it('Tap to select session for coach', () => {
        let session = {
            "_id": "580b551428d909b39ffced1b",
            "sessionKey": "201610231800U009",
            "__v": 0,
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
            "createdDate": "2016-10-22T12:01:24.824Z",
            "selected": true
        }
        spyOn(instance, 'tapCoachSession').and.callThrough();
        instance.tapCoachSession(session);
        expect(instance.tapCoachSession).toHaveBeenCalledWith(session);
    });
    it('Tap to remove selection of session for coach', () => {
        let session = {
            "_id": "580b551428d909b39ffced1b",
            "sessionKey": "201610231800U009",
            "__v": 0,
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
            "createdDate": "2016-10-22T12:01:24.824Z",
            "selected": false
        }
        spyOn(instance, 'tapCoachSession').and.callThrough();
        instance.tapCoachSession(session);
        expect(instance.tapCoachSession).toHaveBeenCalledWith(session);
    });
    it('Dismiss session list popup', () => {
        spyOn(instance, 'dismiss').and.callThrough();
        instance.dismiss();
        expect(instance.dismiss).toHaveBeenCalled();
    });
    it('Apply changes', () => {
        spyOn(instance, 'apply').and.callThrough();
        instance.apply();
        expect(instance.apply).toHaveBeenCalled();
    });


});