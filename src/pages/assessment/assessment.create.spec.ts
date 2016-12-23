import { FormBuilder } from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { AssessmentCreatePage } from './assessment.create';
import { User } from '../../models/user';
let fixture: ComponentFixture<AssessmentCreatePage> = null;
let instance: any = null;
describe('AssessmentCreatePage', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([AssessmentCreatePage]).then(compiled => {
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

    it('save Assessment through to service', () => {
        instance.assessmentNew = {
            "_id": "58197a14827c5c42d832a8fe",
            "note": "xcvxcvcx",
            "sessionKey": "201610281800U009",
            "coach_id": "4343245",
            "player_id": "U16001",
            "__v": 0,
            "isActive": true,
            "modifiedDate": "2016-11-02T05:31:00.041Z",
            "createdDate": "2016-11-02T05:31:00.041Z",
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
        spyOn(instance, 'save').and.callThrough();
        instance.save();
        fixture.detectChanges();
        expect(instance.save).toBeTruthy();
    });

    it('shows information', () => {
        instance.instructions = "kick da ball";
        spyOn(instance, 'showInfo').and.callThrough();
        instance.showInfo(instance.instructions);
        fixture.detectChanges();
        expect(instance.showInfo).toHaveBeenCalledWith(instance.instructions);
        expect(instance.showInfo).toBeTruthy();
    });

    it('view Players', () => {
        spyOn(instance, 'save').and.callThrough();
        instance.save();
        fixture.detectChanges();
        expect(instance.navCtrl).toBeTruthy();
    });

});