import { ComponentFixture, async }    from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { RegistrationListPage }                from './registration.list';

let fixture: ComponentFixture<RegistrationListPage> = null;
let instance: any = null;

describe('RegistrationListPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([RegistrationListPage]).then(compiled => {
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

    it('filter registration by passing filter text', () => {
        instance.filtertext = 'Robert';
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.registrationFiltered).not.toBeNull();
    });

    it('filter registration by passing empty filter text', () => {
        instance.filtertext = "";
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.registrationFiltered).not.toBeNull();
    });

    it('Clear registration search filter', () => {
        fixture.detectChanges();
        spyOn(instance, 'onClear').and.callThrough();
        instance.onClear();
        expect(instance.onClear).toHaveBeenCalled();
    });

    it('Go to registration detail page to edit registartion', () => {
        let registrationDetail = {
            "playerID": "FG003",
            "_id": "5805940cd1150b0d209669fc",
            "footballAcademyDetails": {
                "_id": "5805940cd1150b0d20966a01",
            },
            "playingHistory": {
                "_id": "5805940cd1150b0d20966a00",
                "previousClub2016": "23423432",
                "previousClub2015": "werwrwe",
                "suspensionsDetails": "wqrqwr",
                "injuriesDetails": "qwerqewr",
            },
            "studyWorkDetails": {
                "_id": "5805940cd1150b0d209669ff",
            },
            "contactPerson2": {
                "_id": "5805940cd1150b0d209669fe",
            },
            "contactPerson1": {
                "_id": "5805940cd1150b0d209669fd",
                "personName": "jlkjlkjl",
                "relationship": "lkjlkjl",
                "contactNumber": "980980980",
                "email": "rleidl@gmail.com",
            },
            "objectivesAmbitions": "Ambitions",
            "email": "rleidl@gmail.com",
            "mobileNumber": "jlkjljl",
            "homeNumber": "jklljl",
            "residentialAddress": "jlkjlkjj",
            "ageGroup": "1st Grade",
            "gender": "male",
            "preferredPlayingPosition": 3,
            "birthDate": "1994-11-30T23:00:00.000Z",
            "fFANumber": "123456789",
            "playerName": "Robert Leidl",
            "modifiedDate": "2016-10-18T03:16:28.476Z",
            "createdDate": "2016-10-18T03:16:28.476Z",
            "images": [],
            "dateOfApplication": "2016-10-18T03:16:28.476Z"
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail');
        instance.gotoDetail(registrationDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(registrationDetail);
    });
});
