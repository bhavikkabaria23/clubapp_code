import { ComponentFixture, async }    from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { SkillListPage }                from './skill.list';

let fixture: ComponentFixture<SkillListPage> = null;
let instance: any = null;

describe('SkillListPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([SkillListPage]).then(compiled => {
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

    it('filter skill by passing filter text', () => {
        instance.filtertext = 'test';
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.skillFiltered).not.toBeNull();
    });

    it('filter skill by passing empty filter text', () => {
        instance.filtertext = "";
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.skillFiltered).not.toBeNull();
    });

    it('Clear skill search filter', () => {
        fixture.detectChanges();
        spyOn(instance, 'onClear').and.callThrough();
        instance.onClear();
        expect(instance.onClear).toHaveBeenCalled();
    });

      it('Go to create skill page', () => {
        spyOn(instance, 'goToCreate').and.callThrough();
        instance.goToCreate();
        expect(instance.goToCreate).toHaveBeenCalled();
    });    

    it('go to skill detail page', () => {
        let skillDetail = {
            "_id": "580de0f99397a24d5af3dc57",
            "description": "test description",
            "name": "test",
            "instructions": "test da field",
            "isActive": true,
            "modifiedDate": "2016-10-28T03:47:01.886Z",
            "createdDate": "2016-12-05T08:47:13.740Z"
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail').and.callThrough();
        instance.gotoDetail(skillDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(skillDetail);
    });
});
