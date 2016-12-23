import { FormBuilder } from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { UserEditPage } from './user.edit';
import { User } from '../../models/user';

let fixture: ComponentFixture<UserEditPage> = null;
let instance: any = null;
describe('UserEditPage  ', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([UserEditPage]).then(compiled => {
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

    it('updates User through to service', () => {
        instance.user = new User();
        instance.user.fFANumber = '1234567890';
        instance.user.password = 'test@123';
        instance.user.address = 'Mock Update Address';
        instance.user.mobileNumber = '1234567980';
        instance.user.role = '1';
        instance.userRegistrationForm = new FormBuilder().group({
            fFANumber: [instance.user.fFANumber],
            password: [instance.user.password],
            address: [instance.user.address],
            mobileNumber: [instance.user.mobileNumber],
            role: [instance.user.role],
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.onSubmit();
        fixture.detectChanges();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('doesn\'t try to edit a user', () => {
        spyOn(instance['userService'], 'UpdateUser').and.callThrough();
        instance.onSubmit({});
        expect(instance['userService'].UpdateUser).not.toHaveBeenCalled();
    });

});
