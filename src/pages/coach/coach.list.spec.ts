import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { CoachListPage } from './coach.list';
let fixture: ComponentFixture<CoachListPage> = null;
let instance: any = null;
describe('CoachList', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([CoachListPage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.autoDetectChanges(true);
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it('Initialises', () => {
        expect(instance).toBeTruthy();
    });

    it('Filter coach by passing filter text', () => {
        instance.filtertext = "George Ganiatsas";
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.coachFiltered).not.toBeNull();
    });

    it('Filter coach by passing empty filter text', () => {
        instance.filtertext = "";
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.coachFiltered).not.toBeNull();
    });

    it('Clear coach search filter', () => {
        fixture.detectChanges();
        spyOn(instance, 'onClear').and.callThrough();
        instance.onClear();
        expect(instance.onClear).toHaveBeenCalled();
    });

    it('Go to detail page', () => {
        let coachDetail = {
            "_id": "57ef3955b2f06ebf1c98cc6d",
            "suspensionsDetails": "None",
            "email": "georgeg@grmfc.com",
            "mobileNumber": "0412 305 800",
            "homeNumber": "123",
            "residentialAddress": "Home",
            "gender": "male",
            "childrenRegistration": "Nil",
            "coachingLicence": "Nil",
            "fFANumber": "54180856",
            "birthDate": "1967-11-27T00:00:00.000Z",
            "coachName": "George Ganiatsas",
            "__v": 0,
            "modifiedDate": "2016-10-19T00:02:31.952Z",
            "createdDate": "2016-10-01T04:19:33.290Z",
            "clubHistory": [
                {
                    "details": "GRMFC",
                    "year": 2015,
                    "_id": "5806b8178c8237624e0903d8"
                },
                {
                    "details": "GRMFC",
                    "year": 2016,
                    "_id": "5806b8178c8237624e0903d7"
                }
            ],
            "contactPerson": [
                {
                    "email": "q@q.com",
                    "contactNumber": "123",
                    "relationship": "Mine",
                    "personName": "Me",
                    "_id": "5806b8178c8237624e0903d6"
                }
            ],
            "images": [],
            "sessions": [],
            "dateOfApplication": "2016-10-01T04:19:33.290Z"
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail').and.callThrough();
        instance.selecting = false;
        instance.gotoDetail(coachDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(coachDetail);
    });
    it('Select coach to add in session', () => {
        let coachDetail = {
            "_id": "57ef3955b2f06ebf1c98cc6d",
            "suspensionsDetails": "None",
            "email": "georgeg@grmfc.com",
            "mobileNumber": "0412 305 800",
            "homeNumber": "123",
            "residentialAddress": "Home",
            "gender": "male",
            "childrenRegistration": "Nil",
            "coachingLicence": "Nil",
            "fFANumber": "54180856",
            "birthDate": "1967-11-27T00:00:00.000Z",
            "coachName": "George Ganiatsas",
            "__v": 0,
            "modifiedDate": "2016-10-19T00:02:31.952Z",
            "createdDate": "2016-10-01T04:19:33.290Z",
            "clubHistory": [
                {
                    "details": "GRMFC",
                    "year": 2015,
                    "_id": "5806b8178c8237624e0903d8"
                },
                {
                    "details": "GRMFC",
                    "year": 2016,
                    "_id": "5806b8178c8237624e0903d7"
                }
            ],
            "contactPerson": [
                {
                    "email": "q@q.com",
                    "contactNumber": "123",
                    "relationship": "Mine",
                    "personName": "Me",
                    "_id": "5806b8178c8237624e0903d6"
                }
            ],
            "images": [],
               "sessions": [
                {
                    "startDateTime": "2016-10-23T18:00:00.000Z",
                    "sessionKey": "201610231800U009",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-22T18:00:00.000Z",
                    "sessionKey": "201610221800U009",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-22T18:00:00.000Z",
                    "sessionKey": "201610221800U015",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-28T18:00:00.000Z",
                    "sessionKey": "201610281800U009",
                    "ended": false
                }
            ],
            "dateOfApplication": "2016-10-01T04:19:33.290Z",
            "selected": true
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail').and.callThrough();
        instance.selecting = true;
        instance.gotoDetail(coachDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(coachDetail);
    });
    it('Remove selection of coach', () => {
        let coachDetail = {
            "_id": "57ef3955b2f06ebf1c98cc6d",
            "suspensionsDetails": "None",
            "email": "georgeg@grmfc.com",
            "mobileNumber": "0412 305 800",
            "homeNumber": "123",
            "residentialAddress": "Home",
            "gender": "male",
            "childrenRegistration": "Nil",
            "coachingLicence": "Nil",
            "fFANumber": "54180856",
            "birthDate": "1967-11-27T00:00:00.000Z",
            "coachName": "George Ganiatsas",
            "__v": 0,
            "modifiedDate": "2016-10-19T00:02:31.952Z",
            "createdDate": "2016-10-01T04:19:33.290Z",
            "clubHistory": [
                {
                    "details": "GRMFC",
                    "year": 2015,
                    "_id": "5806b8178c8237624e0903d8"
                },
                {
                    "details": "GRMFC",
                    "year": 2016,
                    "_id": "5806b8178c8237624e0903d7"
                }
            ],
            "contactPerson": [
                {
                    "email": "q@q.com",
                    "contactNumber": "123",
                    "relationship": "Mine",
                    "personName": "Me",
                    "_id": "5806b8178c8237624e0903d6"
                }
            ],
            "images": [],
            "sessions": [
                {
                    "startDateTime": "2016-10-23T18:00:00.000Z",
                    "sessionKey": "201610231800U009",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-22T18:00:00.000Z",
                    "sessionKey": "201610221800U009",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-22T18:00:00.000Z",
                    "sessionKey": "201610221800U015",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-28T18:00:00.000Z",
                    "sessionKey": "201610281800U009",
                    "ended": false
                }
            ],
            "dateOfApplication": "2016-10-01T04:19:33.290Z",
            "selected": false
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail').and.callThrough();
        instance.selecting = true;
        instance.gotoDetail(coachDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(coachDetail);
    });

    it('Assigns coach to session', () => {
        fixture.detectChanges();
        spyOn(instance, 'apply').and.callThrough();
        instance.apply();
        expect(instance.apply).toHaveBeenCalled();
    });

});
