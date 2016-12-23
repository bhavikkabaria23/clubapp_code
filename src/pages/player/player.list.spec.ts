
import { ComponentFixture, async }    from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { PlayerListPage }                from './player.list';

let fixture: ComponentFixture<PlayerListPage> = null;
let instance: any = null;

describe('PlayerListPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([PlayerListPage]).then(compiled => {
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

    it('filter player by passing filter text', () => {
        instance.filtertext = 'James';
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.playerFiltered).not.toBeNull();
    });

    it('filter player by passing empty filter text', () => {
        instance.filtertext = "";
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.playerFiltered).not.toBeNull();
    });

    it('Clear player search filter', () => {
        fixture.detectChanges();
        spyOn(instance, 'onClear').and.callThrough();
        instance.onClear();
        expect(instance.onClear).toHaveBeenCalled();
    });

    it('Go to player detail page', () => {
        let playerDetail = {
            "_id": "58137c43344ed928740f7ed2",
            "purposeOfTrip": "learn technical skills from Olympiacos",
            "destination": "Athens",
            "arrangedBy": "GRM",
            "injuriesDetails": "fractured radius",
            "suspensionsDetails": "none",
            "employementDetails": "student",
            "schoolDetails": "Barker College",
            "email": "jamesjostsons@gmail.com",
            "mobileNumber": "0438568311",
            "homeNumber": "91445525",
            "residentialAddress": "54 Fairlawn Avenue, Turramurra, NSW, 2074",
            "objectivesAmbitions": "Develop technical skills and play competitively in a quality team",
            "gender": "male",
            "preferredPlayingPosition": 3,
            "ageGroup": "Under 18s",
            "birthDate": "2000-06-13T00:00:00.000Z",
            "fFANumber": "67274316",
            "familyName": "Jostsons",
            "givenName": "James",
            "playerName": "James Jostsons",
            "playerID": "undefined001",
            "sessionKey": "201610221800U015",
            "isActive": true,
            "modifiedDate": "2016-12-07T08:45:14.517Z",
            "createdDate": "2016-12-07T08:45:14.517Z",
            "academicSessionPerWeekCount": 0,
            "clubHistory": [
                {
                    "year": "2015",
                    "details": "GRM u16",
                    "_id": "58137c43344ed928740f7ed7"
                },
                {
                    "year": "2016",
                    "details": "GRM u16",
                    "_id": "58137c43344ed928740f7ed8"
                }
            ],
            "images": [
                {
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                    "name": "main",
                    "_id": "58137c43344ed928740f7ed4"
                },
                {
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                    "name": "main_thumb",
                    "_id": "58137c43344ed928740f7ed3"
                }
            ],
            "contactPerson": [
                {
                    "personName": "Fiona Jostsons",
                    "relationship": "Mother",
                    "contactNumber": "0438568311",
                    "email": "fiphil@bigpond.net.au",
                    "_id": "58137c43344ed928740f7ed5"
                },
                {
                    "personName": "Phil Jostsons",
                    "relationship": "Father",
                    "contactNumber": "91445525",
                    "email": "phil@Vantagerecruitmet.com.au",
                    "_id": "58137c43344ed928740f7ed6"
                }
            ],
            "coaches": [],
            "dateOfApplication": "2016-12-07T08:45:14.517Z"
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail').and.callThrough();
        instance.gotoDetail(playerDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(playerDetail);
    });
    it('Select player to add in session', () => {
          let playerDetail = {
            "_id": "58137c43344ed928740f7ed2",
            "purposeOfTrip": "learn technical skills from Olympiacos",
            "destination": "Athens",
            "arrangedBy": "GRM",
            "injuriesDetails": "fractured radius",
            "suspensionsDetails": "none",
            "employementDetails": "student",
            "schoolDetails": "Barker College",
            "email": "jamesjostsons@gmail.com",
            "mobileNumber": "0438568311",
            "homeNumber": "91445525",
            "residentialAddress": "54 Fairlawn Avenue, Turramurra, NSW, 2074",
            "objectivesAmbitions": "Develop technical skills and play competitively in a quality team",
            "gender": "male",
            "preferredPlayingPosition": 3,
            "ageGroup": "Under 18s",
            "birthDate": "2000-06-13T00:00:00.000Z",
            "fFANumber": "67274316",
            "familyName": "Jostsons",
            "givenName": "James",
            "playerName": "James Jostsons",
            "playerID": "undefined001",
            "sessionKey": "201610221800U015",
            "isActive": true,
            "modifiedDate": "2016-12-07T08:45:14.517Z",
            "createdDate": "2016-12-07T08:45:14.517Z",
            "academicSessionPerWeekCount": 0,
            "clubHistory": [
                {
                    "year": "2015",
                    "details": "GRM u16",
                    "_id": "58137c43344ed928740f7ed7"
                },
                {
                    "year": "2016",
                    "details": "GRM u16",
                    "_id": "58137c43344ed928740f7ed8"
                }
            ],
            "images": [
                {
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                    "name": "main",
                    "_id": "58137c43344ed928740f7ed4"
                },
                {
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                    "name": "main_thumb",
                    "_id": "58137c43344ed928740f7ed3"
                }
            ],
            "contactPerson": [
                {
                    "personName": "Fiona Jostsons",
                    "relationship": "Mother",
                    "contactNumber": "0438568311",
                    "email": "fiphil@bigpond.net.au",
                    "_id": "58137c43344ed928740f7ed5"
                },
                {
                    "personName": "Phil Jostsons",
                    "relationship": "Father",
                    "contactNumber": "91445525",
                    "email": "phil@Vantagerecruitmet.com.au",
                    "_id": "58137c43344ed928740f7ed6"
                }
            ],
            "coaches": [],
            "dateOfApplication": "2016-12-07T08:45:14.517Z",
            "selected": false
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail').and.callThrough();
        instance.selecting = true;
        instance.gotoDetail(playerDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(playerDetail);
    });
    it('Remove selection of player', () => {
          let playerDetail = {
            "_id": "58137c43344ed928740f7ed2",
            "purposeOfTrip": "learn technical skills from Olympiacos",
            "destination": "Athens",
            "arrangedBy": "GRM",
            "injuriesDetails": "fractured radius",
            "suspensionsDetails": "none",
            "employementDetails": "student",
            "schoolDetails": "Barker College",
            "email": "jamesjostsons@gmail.com",
            "mobileNumber": "0438568311",
            "homeNumber": "91445525",
            "residentialAddress": "54 Fairlawn Avenue, Turramurra, NSW, 2074",
            "objectivesAmbitions": "Develop technical skills and play competitively in a quality team",
            "gender": "male",
            "preferredPlayingPosition": 3,
            "ageGroup": "Under 18s",
            "birthDate": "2000-06-13T00:00:00.000Z",
            "fFANumber": "67274316",
            "familyName": "Jostsons",
            "givenName": "James",
            "playerName": "James Jostsons",
            "playerID": "undefined001",
            "sessionKey": "201610221800U015",
            "isActive": true,
            "modifiedDate": "2016-12-07T08:45:14.517Z",
            "createdDate": "2016-12-07T08:45:14.517Z",
            "academicSessionPerWeekCount": 0,
            "clubHistory": [
                {
                    "year": "2015",
                    "details": "GRM u16",
                    "_id": "58137c43344ed928740f7ed7"
                },
                {
                    "year": "2016",
                    "details": "GRM u16",
                    "_id": "58137c43344ed928740f7ed8"
                }
            ],
            "images": [
                {
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                    "name": "main",
                    "_id": "58137c43344ed928740f7ed4"
                },
                {
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                    "name": "main_thumb",
                    "_id": "58137c43344ed928740f7ed3"
                }
            ],
            "contactPerson": [
                {
                    "personName": "Fiona Jostsons",
                    "relationship": "Mother",
                    "contactNumber": "0438568311",
                    "email": "fiphil@bigpond.net.au",
                    "_id": "58137c43344ed928740f7ed5"
                },
                {
                    "personName": "Phil Jostsons",
                    "relationship": "Father",
                    "contactNumber": "91445525",
                    "email": "phil@Vantagerecruitmet.com.au",
                    "_id": "58137c43344ed928740f7ed6"
                }
            ],
            "coaches": [],
            "dateOfApplication": "2016-12-07T08:45:14.517Z",
            "selected": false
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail').and.callThrough();
        instance.selecting = true;
        instance.gotoDetail(playerDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(playerDetail);
    });

    it('Add selected players to session', () => {
        fixture.detectChanges();
        spyOn(instance, 'apply').and.callThrough();
        instance.apply();
        expect(instance.apply).toHaveBeenCalledWith();
        expect(instance.playerList).not.toBeNull();
    });
});

