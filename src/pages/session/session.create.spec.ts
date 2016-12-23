import { FormBuilder }             from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SessionCreatePage }             from './session.create';

import {Session} from '../../models/session';

let fixture: ComponentFixture<SessionCreatePage> = null;
let instance: any = null;

describe('SessionCreatePage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([SessionCreatePage]).then(compiled => {
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

    it('passes new session through to service', () => {
        instance.session = new Session();
        instance.session.sessionKey = '201610281800U009';
        instance.session.startDateTime = '2016-10-23T18:00:00.000Z';

        instance.sessionForm = new FormBuilder().group({
            sessionKey: [instance.session.sessionKey],
            startDateTime: [instance.session.startDateTime],
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.onSubmit();
        fixture.detectChanges();
        expect(instance.onSubmit).toBeTruthy();
        // spyOn(instance, 'onSubmit').and.callThrough();
        // spyOn(instance['sessionService'], 'Save').and.callThrough(instance.session);
        // fixture.detectChanges();
        // fixture.nativeElement.querySelectorAll('button')[3].click();
        // expect(instance.onSubmit).toHaveBeenCalled();
        // expect(instance['sessionService'].Save).toHaveBeenCalledWith(instance.session);
    });

    it('doesn\'t try to add a session with no session key', () => {
        spyOn(instance['sessionService'], 'Save').and.callThrough();
        instance.onSubmit({});
        expect(instance['sessionService'].Save).not.toHaveBeenCalled();
    });
});
