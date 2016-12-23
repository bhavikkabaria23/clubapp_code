import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { UserListPage } from './user.list';
let fixture: ComponentFixture<UserListPage> = null;
let instance: any = null;
describe('UserList', () => {
    beforeEach(async(() => TestUtils.beforeEachCompiler([UserListPage]).then(compiled => {
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

    it('filter user by passing filter text', () => {
        instance.filtertext = "565656";
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.userFiltered).not.toBeNull();
    });

    it('filter user by passing empty filter text', () => {
        instance.filtertext = "";
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.userFiltered).not.toBeNull();
    });

    it('Clear user search filter', () => {
        fixture.detectChanges();
        spyOn(instance, 'onClear').and.callThrough();
        instance.onClear();
        expect(instance.onClear).toHaveBeenCalled();
    });

    it('go to detail page', () => {
        let userDetail = {
            "_id": "5809b9544de3c55cb1a46713",
            "salt": "2100154a8fe10094b4046185b1b13011",
            "role": 1,
            "fFANumber": "123456",
            "__v": 0,
            "address": "test",
            "mobileNumber": "test",
            "password": "f92cf82f1c77e9caae729689d9f4aa3a",
            "createdDate": "2016-10-21T06:44:36.506Z",
            "isActive": true
        };
        fixture.detectChanges();
        spyOn(instance, 'gotoDetail');
        instance.gotoDetail(userDetail);
        expect(instance.gotoDetail).toHaveBeenCalledWith(userDetail);
    });

});
