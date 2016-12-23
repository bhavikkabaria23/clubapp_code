import { FormBuilder }             from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { RegistrationDetailPage }          from './registration.detail';

import {Registration} from '../../models/registration';

let fixture: ComponentFixture<RegistrationDetailPage> = null;
let instance: any = null;

describe('RegistrationDetailPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([RegistrationDetailPage]).then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
        fixture.autoDetectChanges(true);
    })));

    afterEach(() => {
        fixture.destroy();
    });

    it('initialises', () => {
        expect(fixture).not.toBeNull(); ``
        expect(instance).not.toBeNull();
    });

    it('Update a registration through to service', () => {
        instance.registration = new Registration();
        instance.registration._id = '5805940cd1150b0d209669fc';
        instance.registration.playerName = 'Robert Leidl';
        instance.registration.fFANumber = '123456789';
        instance.registration.birthDate = '1994-11-30T23:00:00.000Z';
        instance.registration.ageGroup = '1st Grade';
        instance.registration.preferredPlayingPosition = 3;
        instance.registration.gender = 'male';
        instance.registration.objectivesAmbitions = 'Ambitions';

        instance.registration.residentialAddress = 'Sydney';
        instance.registration.homeNumber = '5643656';
        instance.registration.mobileNumber = '7875675765';
        instance.registration.email = 'rleidl@gmail.com';

        instance.registration.contact1_personName = 'xyz';
        instance.registration.contact1_relationship = 'father';
        instance.registration.contact1_contactNumber = '63546546';
        instance.registration.contact1_email = 'xyz@gmail.com';

        instance.registration.contact2_personName = 'abc';
        instance.registration.contact2_relationship = 'brother';
        instance.registration.contact2_contactNumber = '548978473';
        instance.registration.contact2_email = 'abc@gmail.com';

        instance.registration.schoolDetails = 'sydney school';
        instance.registration.employementDetails = 'player';

        instance.registration.previousClub2016 = 'winner';
        instance.registration.previousClub2015 = 'winner';
        instance.registration.suspensionsDetails = 'not yet';
        instance.registration.injuriesDetails = 'not yet';

        instance.registration.headCoachName = 'my coach';
        instance.registration.contactDetails = '6536546';
        instance.registration.academicSessionPerWeekCount = 1;
        instance.registration.arrangedBy = 'coach';
        instance.registration.destination = 'sydney';
        instance.registration.purposeOfTrip = 'training';

        instance.registrationForm = new FormBuilder().group({
            playerName: [instance.registration.playerName],
            fFANumber: [instance.registration.fFANumber],
            birthDate: [instance.registration.birthDate],
            ageGroup: [instance.registration.ageGroup],
            preferredPlayingPosition: [instance.registration.preferredPlayingPosition],
            gender: [instance.registration.gender],
            objectivesAmbitions: [instance.registration.objectivesAmbitions],

            residentialAddress: [instance.registration.residentialAddress],
            homeNumber: [instance.registration.homeNumber],
            mobileNumber: [instance.registration.mobileNumber],
            email: [instance.registration.email],

            contact1_personName: [instance.registration.contact1_personName],
            contact1_relationship: [instance.registration.contact1_relationship],
            contact1_contactNumber: [instance.registration.contact1_contactNumber],
            contact1_email: [instance.registration.contact1_email],

            contact2_personName: [instance.registration.contact2_personName],
            contact2_relationship: [instance.registration.contact2_relationship],
            contact2_contactNumber: [instance.registration.contact2_contactNumber],
            contact2_email: [instance.registration.contact2_email],

            schoolDetails: [instance.registration.schoolDetails],
            employementDetails: [instance.registration.employementDetails],

            previousClub2016: [instance.registration.previousClub2016],
            previousClub2015: [instance.registration.previousClub2015],
            suspensionsDetails: [instance.registration.suspensionsDetails],
            injuriesDetails: [instance.registration.injuriesDetails],

            headCoachName: [instance.registration.headCoachName],
            contactDetails: [instance.registration.contactDetails],
            academicSessionPerWeekCount: [instance.registration.academicSessionPerWeekCount],
            arrangedBy: [instance.registration.arrangedBy],
            destination: [instance.registration.destination],
            purposeOfTrip: [instance.registration.purposeOfTrip],
        });
        spyOn(instance, 'RegistrationSubmit').and.callThrough();
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.RegistrationSubmit();
        instance.onSubmit();
        fixture.detectChanges();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('Convert a registration to player through to service', () => {
        instance.registration = new Registration();
        instance.registration._id = '5805940cd1150b0d209669fc';
        instance.registration.playerName = 'Robert Leidl';
        instance.registration.fFANumber = '123456789';
        instance.registration.birthDate = '1994-11-30T23:00:00.000Z';
        instance.registration.ageGroup = '1st Grade';
        instance.registration.preferredPlayingPosition = 3;
        instance.registration.gender = 'male';
        instance.registration.objectivesAmbitions = 'Ambitions';

        instance.registration.residentialAddress = 'Sydney';
        instance.registration.homeNumber = '5643656';
        instance.registration.mobileNumber = '7875675765';
        instance.registration.email = 'rleidl@gmail.com';

        instance.registration.contact1_personName = 'xyz';
        instance.registration.contact1_relationship = 'father';
        instance.registration.contact1_contactNumber = '63546546';
        instance.registration.contact1_email = 'xyz@gmail.com';

        instance.registration.contact2_personName = 'abc';
        instance.registration.contact2_relationship = 'brother';
        instance.registration.contact2_contactNumber = '548978473';
        instance.registration.contact2_email = 'abc@gmail.com';

        instance.registration.schoolDetails = 'sydney school';
        instance.registration.employementDetails = 'player';

        instance.registration.previousClub2016 = 'winner';
        instance.registration.previousClub2015 = 'winner';
        instance.registration.suspensionsDetails = 'not yet';
        instance.registration.injuriesDetails = 'not yet';

        instance.registration.headCoachName = 'my coach';
        instance.registration.contactDetails = '6536546';
        instance.registration.academicSessionPerWeekCount = 1;
        instance.registration.arrangedBy = 'coach';
        instance.registration.destination = 'sydney';
        instance.registration.purposeOfTrip = 'training';

        instance.registrationForm = new FormBuilder().group({
            playerName: [instance.registration.playerName],
            fFANumber: [instance.registration.fFANumber],
            birthDate: [instance.registration.birthDate],
            ageGroup: [instance.registration.ageGroup],
            preferredPlayingPosition: [instance.registration.preferredPlayingPosition],
            gender: [instance.registration.gender],
            objectivesAmbitions: [instance.registration.objectivesAmbitions],

            residentialAddress: [instance.registration.residentialAddress],
            homeNumber: [instance.registration.homeNumber],
            mobileNumber: [instance.registration.mobileNumber],
            email: [instance.registration.email],

            contact1_personName: [instance.registration.contact1_personName],
            contact1_relationship: [instance.registration.contact1_relationship],
            contact1_contactNumber: [instance.registration.contact1_contactNumber],
            contact1_email: [instance.registration.contact1_email],

            contact2_personName: [instance.registration.contact2_personName],
            contact2_relationship: [instance.registration.contact2_relationship],
            contact2_contactNumber: [instance.registration.contact2_contactNumber],
            contact2_email: [instance.registration.contact2_email],

            schoolDetails: [instance.registration.schoolDetails],
            employementDetails: [instance.registration.employementDetails],

            previousClub2016: [instance.registration.previousClub2016],
            previousClub2015: [instance.registration.previousClub2015],
            suspensionsDetails: [instance.registration.suspensionsDetails],
            injuriesDetails: [instance.registration.injuriesDetails],

            headCoachName: [instance.registration.headCoachName],
            contactDetails: [instance.registration.contactDetails],
            academicSessionPerWeekCount: [instance.registration.academicSessionPerWeekCount],
            arrangedBy: [instance.registration.arrangedBy],
            destination: [instance.registration.destination],
            purposeOfTrip: [instance.registration.purposeOfTrip],
        });
        spyOn(instance, 'PlayerSubmit').and.callThrough();
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.PlayerSubmit();
        instance.onSubmit();
        fixture.detectChanges();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('doesn\'t try to edit registration or submit player with no registration details', () => {        
        spyOn(instance, 'onSubmit').and.callThrough();
        expect(instance.onSubmit).not.toHaveBeenCalled();
    });

     it('Take a Photo', () => {
        spyOn(instance, 'takePhoto').and.callThrough();
        instance.takePhoto();
        expect(instance.takePhoto).toHaveBeenCalled();
    });
      it('Return random string', () => {
        spyOn(instance, 'randomString').and.callThrough();
        instance.randomString(16, 36);
        expect(instance.randomString).toHaveBeenCalledWith(16, 36);

    });

    it('Save Photos', () => {
        spyOn(instance, 'savePhoto').and.callThrough();
        instance.savePhoto();
        expect(instance.savePhoto).toHaveBeenCalled();
    });

    it('Upload Photos', () => {
        spyOn(instance, 'uploadPhoto').and.callThrough();
        instance.uploadPhoto("Test", "t8innunp");
        expect(instance.uploadPhoto).toHaveBeenCalledWith("Test", "t8innunp");
    });

     it('When date changed for date of birth', () => {
        var selectedDate = {
            year: {
                value: 2004
            }
        }

        spyOn(instance, 'onChangeDate').and.callThrough();
        instance.onChangeDate(selectedDate);
        expect(instance.onChangeDate).toHaveBeenCalledWith(selectedDate);
    });
});