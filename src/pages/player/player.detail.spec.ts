import { ComponentFixture, async }    from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { PlayerDetailPage }                from './player.detail';

let fixture: ComponentFixture<PlayerDetailPage> = null;
let instance: any = null;

describe('PlayerDetailPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([PlayerDetailPage]).then(compiled => {
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

    it('Go to player edit page', () => {
        fixture.detectChanges();
        spyOn(instance, 'gotoEdit');
        instance.gotoEdit();
        expect(instance.gotoEdit).toHaveBeenCalled();
    });

    it('Add player to session', () => {
        fixture.detectChanges();
        spyOn(instance, 'AddToSession');
        instance.AddToSession();
        expect(instance.AddToSession).toHaveBeenCalled();
    });

});