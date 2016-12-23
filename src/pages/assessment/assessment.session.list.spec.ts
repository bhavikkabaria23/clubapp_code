import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { AssessmentSessionListPage } from './assessment.session.list';
let fixture: ComponentFixture<AssessmentSessionListPage> = null;
let instance: any = null;
describe('AssessmentList', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([AssessmentSessionListPage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.autoDetectChanges(true);
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it('initialises', () => {
        expect(instance).toBeTruthy();
    });

    it('check sessions', () => {
        fixture.detectChanges();
        spyOn(instance, 'checkSessions');
        instance.checkSessions();
        expect(instance.checkSessions).toHaveBeenCalled();
        expect(instance.checkSessions).toBeTruthy();
    });

    it('go to Detail', () => {
        instance.session = {
            "_id": "581979a9827c5c42d832a8fd",
            "note": "grest",
            "sessionKey": "201610281800U009",
            "coach_id": "4343245",
            "player_id": "U16001",
            "__v": 0,
            "isActive": true,
            "modifiedDate": "2016-11-02T05:29:13.852Z",
            "createdDate": "2016-11-02T05:29:13.852Z",
            "assessments": [
                {
                    "instructions": "kick da ball",
                    "name": "kicking",
                    "_id": "580ec32e059d26a48067f235",
                    "rating": 5
                },
                {
                    "instructions": "test da field",
                    "name": "test",
                    "_id": "580de0f99397a24d5af3dc57",
                    "rating": 5
                }
            ]
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail');
        instance.gotoDetail(instance.session);
        expect(instance.gotoDetail).toHaveBeenCalledWith(instance.session);
        expect(instance.gotoDetail).not.toBeNull();
    });

});
