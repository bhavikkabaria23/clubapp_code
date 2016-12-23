
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SkillListPopup }             from './skill.list.pop';

let fixture: ComponentFixture<SkillListPopup> = null;
let instance: any = null;

describe('SkillListPopup', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([SkillListPopup]).then(compiled => {
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
    it('Select a skill to add to skill list', () => {
        let skill = {
            "instructions": "test da field",
            "name": "test",
            "_id": "580de0f99397a24d5af3dc57"
        }
        instance.selectedSkillList = [];
        spyOn(instance, 'select').and.callThrough();
        instance.select(skill);
        expect(instance.select).toHaveBeenCalledWith(skill);
    });
    // it('Select a skill to remove from skill list', () => {
    //     let skill = {
    //         "instructions": "test da field",
    //         "name": "test",
    //         "_id": "580de0f99397a24d5af3dc57"
    //     };
    //     instance.selectedSkillList =  [{
    //         "instructions": "test da field",
    //         "name": "test", 
    //         "_id": "580de0f99397a24d5af3dc57"
    //     }];        
    //     spyOn(instance, 'select').and.callThrough();
    //     instance.select(skill);
    //     expect(instance.select).toHaveBeenCalledWith(skill);
    // });
    it('Update a session by add or remove skills', () => {
        instance.session = {
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
            "createdDate": "2016-10-22T12:01:24.824Z"
        };
        instance.selectedSkillList = [{
            "instructions": "test da field",
            "name": "test",
            "_id": "580de0f99397a24d5af3dc57"
        }];

        spyOn(instance, 'save').and.callThrough();
        instance.save();
        expect(instance.save).toHaveBeenCalled();
    });
});