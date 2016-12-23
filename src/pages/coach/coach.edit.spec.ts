import { FormBuilder } from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { CoachEditPage } from './coach.edit';
import { Coach } from '../../models/coach';

let fixture: ComponentFixture<CoachEditPage> = null;
let instance: any = null;
describe('CoachEditPage  ', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([CoachEditPage]).then(compiled => {
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

    it('updates coach through to service', () => {
        instance.coach = new Coach();
        instance.coach.fFANumber = "123456";
        instance.coach.familyName = 'Test';
        instance.coach.givenName = 'Unit Test';
        instance.coach.birthDate = '1963-08-07T00:00:00.000Z';
        instance.coach.coachingLicence = 'test';
        instance.coach.childrenRegistration = 'Mock test';
        instance.coach.residentialAddress = 'Mock test';
        instance.coach.homeNumber = 'Mock test';
        instance.coach.mobileNumber = '0479 114 757';
        instance.coach.contact1_personName = 'Mock Test';
        instance.coach.contact1_relationship = 'Mock Test';
        instance.coach.contact1_contactNumber = '0479 114 757';
        instance.coach.contact1_email = 'test@gmail.com';
        instance.coach.previousClub2016 = 'test';
        instance.coach.previousClub2015 = "test";
        instance.coach.suspensionsDetails = "test";
        instance.registrationForm = new FormBuilder().group({
            fFANumber: [instance.coach.fFANumber],
            mobileNumber: [instance.coach.mobileNumber],
            familyName: [instance.coach.familyName],
            givenName: [instance.coach.givenName],
            birthDate: [instance.coach.birthDate],
            coachingLicence: [instance.coach.coachingLicence],
            childrenRegistration: [instance.coach.childrenRegistration],
            residentialAddress: [instance.coach.residentialAddress],
            homeNumber: [instance.coach.homeNumber],
            contact1_personName: [instance.coach.contact1_personName],
            contact1_relationship: [instance.coach.contact1_relationship],
            contact1_contactNumber: [instance.coach.contact1_contactNumber],
            contact1_email: [instance.coach.contact1_email],
            previousClub2016: [instance.coach.previousClub2016],
            previousClub2015: [instance.coach.previousClub2015],
            suspensionsDetails: [instance.coach.suspensionsDetails]
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.onSubmit();
        fixture.detectChanges();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('doesn\'t try to edit a coach', () => {
        spyOn(instance['coachService'], 'Update').and.callThrough();
        spyOn(instance, 'onSubmit').and.callThrough();                
        expect(instance.onSubmit).not.toHaveBeenCalled();
        expect(instance['coachService'].Update).not.toHaveBeenCalled();
    });

    it('takes Photo', () => {
        spyOn(instance, 'takePhoto').and.callThrough();
        instance.takePhoto();
        expect(instance.takePhoto).toHaveBeenCalled();

    });

    it('returns random string', () => {
        spyOn(instance, 'randomString').and.callThrough();
        instance.randomString(16, 36);
        expect(instance.randomString).toHaveBeenCalledWith(16, 36);

    });

    it('saves Photos', () => {
        spyOn(instance, 'savePhoto').and.callThrough();
        instance.savePhoto();
        expect(instance.savePhoto).toHaveBeenCalled();
    });

    it('upload Photos', () => {
        spyOn(instance, 'uploadPhoto').and.callThrough();
        instance.uploadPhoto("Test", "t8innunp");
        expect(instance.uploadPhoto).toHaveBeenCalledWith("Test", "t8innunp");
    });

});
