import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils }               from '../../test';
import { SessionListPage }             from './session.list';

let fixture: ComponentFixture<SessionListPage> = null;
let instance: any = null;

describe('SessionListPage', () => {

    beforeEach(async(() => TestUtils.beforeEachCompiler([SessionListPage]).then(compiled => {
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

    it('filter session by passing filter text', () => {
        instance.filtertext = '23';
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.sessionFiltered).not.toBeNull();
    });

    it('filter session by passing empty filter text', () => {
        instance.filtertext = "";
        fixture.detectChanges();
        spyOn(instance, 'filter').and.callThrough();
        instance.filter(instance.filtertext);
        expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
        expect(instance.sessionFiltered).not.toBeNull();
    });

    it('Clear session search filter', () => {
        fixture.detectChanges();
        spyOn(instance, 'onClear').and.callThrough();
        instance.onClear();
        expect(instance.onClear).toHaveBeenCalled();
    });

      it('Go to create session page', () => {
        spyOn(instance, 'goToCreate').and.callThrough();
        instance.goToCreate();
        expect(instance.goToCreate).toHaveBeenCalled();
    });

      it('Go to session detail page', () => {        
        spyOn(instance, 'gotoDetail').and.callThrough();
        let session = {
            "_id": "580b551c28d909b39ffced1c",
            "sessionKey": "201610221800U009",
            "__v": 0,
            "startDateTime": "2016-10-22T18:00:00.000Z",
            "skills": [
                {
                    "instructions": "kick da ball",
                    "name": "kicking",
                    "_id": "580ec32e059d26a48067f235"
                },
                {
                    "instructions": "test da field",
                    "name": "test",
                    "_id": "580de0f99397a24d5af3dc57"
                },
                {
                    "name": "Running ",
                    "_id": "5812fdebda43bc092744f51c"
                },
                {
                    "name": "endurance",
                    "instructions": "5km cross",
                    "_id": "5817bef19b894232f9805666"
                }
            ],
            "ended": false,
            "players": [],
            "coaches": [],
            "isActive": true,
            "modifiedDate": "2016-11-01T05:18:43.554Z",
            "createdDate": "2016-10-22T12:01:32.640Z"
        };  
        instance.gotoDetail(session);
        expect(instance.gotoDetail).toHaveBeenCalledWith(session);
    });

    // it('filter session by passing filter text', () => {
    //     // instance.filtertext = '23';
    //     // spyOn(instance, 'filter').and.callThrough();        
    //     // fixture.nativeElement.querySelectorAll('input')[0].value = instance.filtertext;
    //     // fixture.detectChanges();                         
    //     // //console.log(fixture.nativeElement.querySelectorAll('input').value);                
    //     // expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);

    //     instance.filtertext = "23";
    //     spyOn(instance, 'filter');
    //     instance.filter(instance.filtertext);
    //     expect(instance.filter).toHaveBeenCalledWith(instance.filtertext);
    //     fixture.detectChanges();
    //     expect(instance.sessionFiltered).not.toBeNull();
    // });
});
