import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SessionDetailPage }             from './session.detail';

let fixture: ComponentFixture<SessionDetailPage> = null;
let instance: any = null;

describe('SessionDetailPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([SessionDetailPage]).then(compiled => {
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

    it('Load session details including players and coaches assessed', () => {
        spyOn(instance, 'checkSessions').and.callThrough();
        instance.checkSessions();
        expect(instance.checkSessions).toHaveBeenCalled();
    });

    it('Go to skills popup to show skills of session', () => {
        spyOn(instance, 'showSkills').and.callThrough();
        instance.showSkills();
        expect(instance.showSkills).toHaveBeenCalled();
    });

    it('Go to coach list to add coach to session', () => {
        spyOn(instance, 'addCoach').and.callThrough();
        instance.addCoach();
        expect(instance.addCoach).toHaveBeenCalled();
    });

    it('Go to player list to add player to session', () => {
        spyOn(instance, 'addPlayer').and.callThrough();
        instance.addPlayer();
        expect(instance.addPlayer).toHaveBeenCalled();
    });

    it('Go to list assessment player popup if role is root or technical director', () => {
        let player = {
            "_id": "581423269b894232f9805640",
            "purposeOfTrip": "training",
            "destination": "Sydney ground",
            "arrangedBy": "sports organization",
            "contactDetails": "768766677",
            "headCoachName": "my coach",
            "injuriesDetails": "Not injured",
            "suspensionsDetails": "two times",
            "employementDetails": "sports organization",
            "schoolDetails": "Sydney school",
            "email": "payer1@gmail.com",
            "mobileNumber": "9999999898",
            "homeNumber": "767676576",
            "residentialAddress": "Sydney",
            "objectivesAmbitions": "Good player",
            "gender": "male",
            "preferredPlayingPosition": 5,
            "ageGroup": "Under 9s",
            "birthDate": "2016-01-01T00:00:00.000Z",
            "fFANumber": "123456",
            "familyName": "Smith",
            "givenName": "John",
            "playerName": null,
            "playerID": "U09002",
            "sessionKey": "201610221800U009",
            "isActive": true,
            "modifiedDate": "2016-11-01T02:13:12.042Z",
            "createdDate": "2016-12-08T07:17:16.685Z",
            "academicSessionPerWeekCount": 2,
            "clubHistory": [
                {
                    "details": "Gold medal",
                    "year": "2015",
                    "_id": "5817fa38827c5c42d832a8e6"
                },
                {
                    "details": "Silver medal",
                    "year": "2016",
                    "_id": "5817fa38827c5c42d832a8e5"
                }
            ],
            "images": [
                {
                    "name": "main",
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477966385/gofer/0L8P9F89RO0BVZN9_wckiue.jpg",
                    "_id": "5817fa38827c5c42d832a8e8"
                },
                {
                    "name": "main_thumb",
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477966385/gofer/0L8P9F89RO0BVZN9_wckiue.jpg",
                    "_id": "5817fa38827c5c42d832a8e7"
                }
            ],
            "contactPerson": [
                {
                    "email": "person1@gmail.com",
                    "contactNumber": "9788786786",
                    "relationship": "brother ",
                    "personName": "contact one",
                    "_id": "5817fa38827c5c42d832a8e4"
                },
                {
                    "email": "person2@gmail.com",
                    "contactNumber": "0867767987",
                    "relationship": "father",
                    "personName": "contact two",
                    "_id": "5817fa38827c5c42d832a8e3"
                }
            ],
            "coaches": [],
            "dateOfApplication": null
        }
        instance.sharedService.role = 1;
        spyOn(instance, 'playerClick').and.callThrough();
        instance.playerClick(player);
        expect(instance.playerClick).toHaveBeenCalledWith(player);
    });

    it('Go to assessment create page if role is coach', () => {
        let player = {
            "_id": "581423269b894232f9805640",
            "purposeOfTrip": "training",
            "destination": "Sydney ground",
            "arrangedBy": "sports organization",
            "contactDetails": "768766677",
            "headCoachName": "my coach",
            "injuriesDetails": "Not injured",
            "suspensionsDetails": "two times",
            "employementDetails": "sports organization",
            "schoolDetails": "Sydney school",
            "email": "payer1@gmail.com",
            "mobileNumber": "9999999898",
            "homeNumber": "767676576",
            "residentialAddress": "Sydney",
            "objectivesAmbitions": "Good player",
            "gender": "male",
            "preferredPlayingPosition": 5,
            "ageGroup": "Under 9s",
            "birthDate": "2016-01-01T00:00:00.000Z",
            "fFANumber": "123456",
            "familyName": "Smith",
            "givenName": "John",
            "playerName": null,
            "playerID": "U09002",
            "sessionKey": "201610221800U009",
            "isActive": true,
            "modifiedDate": "2016-11-01T02:13:12.042Z",
            "createdDate": "2016-12-08T07:17:16.685Z",
            "academicSessionPerWeekCount": 2,
            "clubHistory": [
                {
                    "details": "Gold medal",
                    "year": "2015",
                    "_id": "5817fa38827c5c42d832a8e6"
                },
                {
                    "details": "Silver medal",
                    "year": "2016",
                    "_id": "5817fa38827c5c42d832a8e5"
                }
            ],
            "images": [
                {
                    "name": "main",
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477966385/gofer/0L8P9F89RO0BVZN9_wckiue.jpg",
                    "_id": "5817fa38827c5c42d832a8e8"
                },
                {
                    "name": "main_thumb",
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477966385/gofer/0L8P9F89RO0BVZN9_wckiue.jpg",
                    "_id": "5817fa38827c5c42d832a8e7"
                }
            ],
            "contactPerson": [
                {
                    "email": "person1@gmail.com",
                    "contactNumber": "9788786786",
                    "relationship": "brother ",
                    "personName": "contact one",
                    "_id": "5817fa38827c5c42d832a8e4"
                },
                {
                    "email": "person2@gmail.com",
                    "contactNumber": "0867767987",
                    "relationship": "father",
                    "personName": "contact two",
                    "_id": "5817fa38827c5c42d832a8e3"
                }
            ],
            "coaches": [],
            "dateOfApplication": null
        }
        instance.sharedService.role = 3;
        spyOn(instance, 'playerClick').and.callThrough();
        instance.playerClick(player);
        expect(instance.playerClick).toHaveBeenCalledWith(player);
    });

    it('get preferred playing position by passing number', () => {
        spyOn(instance, 'position').and.callThrough();
        instance.position(1);
        expect(instance.position).toHaveBeenCalledWith(1);
    });

    it('Remove skill from session by passing skill id', () => {
        let skillId = "580de0f99397a24d5af3dc57";
        spyOn(instance, 'removeSkills').and.callThrough();
        instance.session = {
            "_id": "580b551c28d909b39ffced1c",
            "sessionKey": "201610221800U009",
            "__v": 0,
            "startDateTime": "2016-10-22T18:00:00.000Z",
            "skills": [
                {
                    "instructions": "kick da ball",
                    "name": "kicking",
                    "_id": "580ec32e059d26a48067f235"
                },
                {
                    "instructions": "test da field",
                    "name": "test",
                    "_id": "580de0f99397a24d5af3dc57"
                },
                {
                    "name": "Running ",
                    "_id": "5812fdebda43bc092744f51c"
                },
                {
                    "name": "endurance",
                    "instructions": "5km cross",
                    "_id": "5817bef19b894232f9805666"
                }
            ],
            "ended": false,
            "players": [],
            "coaches": [],
            "isActive": true,
            "modifiedDate": "2016-11-01T05:18:43.554Z",
            "createdDate": "2016-10-22T12:01:32.640Z"
        };
        instance.removeSkills(skillId);
        expect(instance.removeSkills).toHaveBeenCalledWith(skillId);
    });
});