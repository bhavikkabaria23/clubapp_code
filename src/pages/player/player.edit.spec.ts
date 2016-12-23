import { FormBuilder }             from '@angular/forms';
import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { PlayerEditPage }                from './player.edit';

import {Player} from '../../models/player';

let fixture: ComponentFixture<PlayerEditPage> = null;
let instance: any = null;

describe('PlayerEditPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([PlayerEditPage]).then(compiled => {
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

    it('Update a player through to service', () => {
        instance.player = new Player();
        instance.player._id = '58137c43344ed928740f7ed2';
        instance.player.givenName = 'Robert';
        instance.player.familyName = 'Leidl';
        instance.player.fFANumber = '123456789';
        instance.player.birthDate = '1994-11-30T23:00:00.000Z';
        instance.player.ageGroup = '1st Grade';
        instance.player.preferredPlayingPosition = 3;
        instance.player.gender = 'male';
        instance.player.objectivesAmbitions = 'Ambitions';

        instance.player.residentialAddress = 'Sydney';
        instance.player.homeNumber = '5643656';
        instance.player.mobileNumber = '7875675765';
        instance.player.email = 'rleidl@gmail.com';

        instance.player.contact1_personName = 'xyz';
        instance.player.contact1_relationship = 'father';
        instance.player.contact1_contactNumber = '63546546';
        instance.player.contact1_email = 'xyz@gmail.com';

        instance.player.contact2_personName = 'abc';
        instance.player.contact2_relationship = 'brother';
        instance.player.contact2_contactNumber = '548978473';
        instance.player.contact2_email = 'abc@gmail.com';

        instance.player.schoolDetails = 'sydney school';
        instance.player.employementDetails = 'player';

        instance.player.previousClub2016 = 'winner';
        instance.player.previousClub2015 = 'winner';
        instance.player.suspensionsDetails = 'not yet';
        instance.player.injuriesDetails = 'not yet';

        instance.player.headCoachName = 'my coach';
        instance.player.contactDetails = '6536546';
        instance.player.academicSessionPerWeekCount = 1;
        instance.player.arrangedBy = 'coach';
        instance.player.destination = 'sydney';
        instance.player.purposeOfTrip = 'training';

        instance.playerForm = new FormBuilder().group({
            givenName: [instance.player.givenName],
            familyName: [instance.player.familyName],
            fFANumber: [instance.player.fFANumber],
            birthDate: [instance.player.birthDate],
            ageGroup: [instance.player.ageGroup],
            preferredPlayingPosition: [instance.player.preferredPlayingPosition],
            gender: [instance.player.gender],
            objectivesAmbitions: [instance.player.objectivesAmbitions],

            residentialAddress: [instance.player.residentialAddress],
            homeNumber: [instance.player.homeNumber],
            mobileNumber: [instance.player.mobileNumber],
            email: [instance.player.email],

            contact1_personName: [instance.player.contact1_personName],
            contact1_relationship: [instance.player.contact1_relationship],
            contact1_contactNumber: [instance.player.contact1_contactNumber],
            contact1_email: [instance.player.contact1_email],

            contact2_personName: [instance.player.contact2_personName],
            contact2_relationship: [instance.player.contact2_relationship],
            contact2_contactNumber: [instance.player.contact2_contactNumber],
            contact2_email: [instance.player.contact2_email],

            schoolDetails: [instance.player.schoolDetails],
            employementDetails: [instance.player.employementDetails],

            previousClub2016: [instance.player.previousClub2016],
            previousClub2015: [instance.player.previousClub2015],
            suspensionsDetails: [instance.player.suspensionsDetails],
            injuriesDetails: [instance.player.injuriesDetails],

            headCoachName: [instance.player.headCoachName],
            contactDetails: [instance.player.contactDetails],
            academicSessionPerWeekCount: [instance.player.academicSessionPerWeekCount],
            arrangedBy: [instance.player.arrangedBy],
            destination: [instance.player.destination],
            purposeOfTrip: [instance.player.purposeOfTrip],
        });
        spyOn(instance, 'onSubmit').and.callThrough();
        instance.onSubmit();
        fixture.detectChanges();
        expect(instance.onSubmit).toBeTruthy();
    });

    it('doesn\'t try to edit player with no player details', () => {
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