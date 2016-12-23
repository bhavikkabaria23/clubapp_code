import { FormBuilder } from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { CoachDetailPage } from './coach.detail';
import { Coach } from '../../models/Coach';
let fixture: ComponentFixture<CoachDetailPage> = null;
let instance: any = null;
describe('CoachDetailPage', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([CoachDetailPage]).then(compiled => {
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

    it('redirects to Edit page', () => {      
        spyOn(instance, 'gotoEdit').and.callThrough();
        instance.gotoEdit();
        fixture.detectChanges();        
        expect(instance.gotoEdit).toBeTruthy();
    });

     it('assign coaches to session', () => {      
        spyOn(instance, 'AssignToSession').and.callThrough();
        instance.AssignToSession();
        fixture.detectChanges();        
        expect(instance.AssignToSession).toBeTruthy();
    });

});
