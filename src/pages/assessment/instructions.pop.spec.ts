import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { InstructionsPop } from './instructions.pop';
let fixture: ComponentFixture<InstructionsPop> = null;
let instance: any = null;
describe('InstructionsPop', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([InstructionsPop]).then(compiled => {
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
    it('Close the popup', () => {
        spyOn(instance, 'close').and.callThrough();
        instance.close();
        expect(instance.close).toHaveBeenCalled();
    });
});