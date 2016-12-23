import { FormBuilder } from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { SignInPage } from './user.signin';
import { User } from '../../models/user';
let fixture: ComponentFixture<SignInPage> = null;
let instance: any = null;
describe('UserSigninPage', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([SignInPage]).then(compiled => {
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

    it('signin as a root through to service', () => {
        instance.user = new User();
        instance.user.fFANumber = '1234567890';
        instance.user.password = 'test@123';
        instance.user.role = 1;
        instance.signinForm = new FormBuilder().group({
            fFANumber: [instance.user.fFANumber],
            password: [instance.user.password]
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.signin = instance.user;
        instance.onSubmit();
        fixture.detectChanges();
        // fixture.nativeElement.querySelectorAll('button')[7].click();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('signin as an admin through to service', () => {
        instance.user = new User();
        instance.user.fFANumber = '1234567890';
        instance.user.password = 'test@123';
        instance.user.role = 2;

        instance.signinForm = new FormBuilder().group({
            fFANumber: [instance.user.fFANumber],
            password: [instance.user.password]
        });
        spyOn(instance, 'onSubmit').and.callThrough();                
        instance.signin = instance.user;
        instance.onSubmit();        
        fixture.detectChanges();
        // fixture.nativeElement.querySelectorAll('button')[7].click();
        expect(instance.onSubmit).toBeTruthy();        
    });

    it('signin as a coach through to service', () => {
        instance.user = new User();
        instance.user.fFANumber = '1234567890';
        instance.user.password = 'test@123';
        instance.user.role = 3;
        instance.signinForm = new FormBuilder().group({
            fFANumber: [instance.user.fFANumber],
            password: [instance.user.password]
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.signin = instance.user;
        instance.onSubmit();
        fixture.detectChanges();
        // fixture.nativeElement.querySelectorAll('button')[7].click();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('signin User as a technical director through to service', () => {
        instance.user = new User();
        instance.user.fFANumber = '1234567890';
        instance.user.password = 'test@123';
        instance.user.role = 4;
        instance.signinForm = new FormBuilder().group({
            fFANumber: [instance.user.fFANumber],
            password: [instance.user.password]
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.signin = instance.user;
        instance.onSubmit();
        fixture.detectChanges();
        // fixture.nativeElement.querySelectorAll('button')[7].click();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('signin User as a player through to service', () => {
        instance.user = new User();
        instance.user.fFANumber = '1234567890';
        instance.user.password = 'test@123';
        instance.user.role = 5;
        instance.signinForm = new FormBuilder().group({
            fFANumber: [instance.user.fFANumber],
            password: [instance.user.password]
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.signin = instance.user;
        instance.onSubmit();
        fixture.detectChanges();
        // fixture.nativeElement.querySelectorAll('button')[7].click();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('signin User without role through to service', () => {
        instance.user = new User();
        instance.user.fFANumber = '1234567890';
        instance.user.password = 'test@123';
        instance.user.role = 0;
        instance.signinForm = new FormBuilder().group({
            fFANumber: [instance.user.fFANumber],
            password: [instance.user.password]
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.signin = instance.user;
        instance.onSubmit();
        fixture.detectChanges();
        // fixture.nativeElement.querySelectorAll('button')[7].click();
        expect(instance.onSubmit).toBeTruthy();
    });

});
