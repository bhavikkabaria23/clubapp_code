import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { AssessmentPlayerPopup } from './assessment.player.popup';
let fixture: ComponentFixture<AssessmentPlayerPopup> = null;
let instance: any = null;
describe('AssessmentPlayerPopup', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([AssessmentPlayerPopup]).then(compiled => {
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
});
