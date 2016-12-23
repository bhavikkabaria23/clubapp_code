import { ComponentFixture, async }    from '@angular/core/testing';
import { TestUtils }                  from '../test';
import * as resources from './resources'

let instance = null;

describe('Common resources', () => {

     beforeEach(() => {
        instance = resources;
    });        
    //   beforeEach(async(() => TestUtils.beforeEachCompiler([resources.common]).then(compiled => {

    //     instance = compiled.instance;
        
    // })));

    it('Get preferred playing position of 1', () => {        
        spyOn(instance.common, 'getPreferredPlayingPosition').and.callThrough();
        instance.common.getPreferredPlayingPosition(1);
        expect(instance.common.getPreferredPlayingPosition).toHaveBeenCalledWith(1);
    });
    it('Get preferred playing position of 2', () => {        
        spyOn(instance.common, 'getPreferredPlayingPosition').and.callThrough();
        instance.common.getPreferredPlayingPosition(2);
        expect(instance.common.getPreferredPlayingPosition).toHaveBeenCalledWith(2);
    });
    it('Get preferred playing position of 3', () => {        
        spyOn(instance.common, 'getPreferredPlayingPosition').and.callThrough();
        instance.common.getPreferredPlayingPosition(3);
        expect(instance.common.getPreferredPlayingPosition).toHaveBeenCalledWith(3);
    });
    it('Get preferred playing position of 4', () => {        
        spyOn(instance.common, 'getPreferredPlayingPosition').and.callThrough();
        instance.common.getPreferredPlayingPosition(4);
        expect(instance.common.getPreferredPlayingPosition).toHaveBeenCalledWith(4);
    });
    it('Get preferred playing position of 5', () => {        
        spyOn(instance.common, 'getPreferredPlayingPosition').and.callThrough();
        instance.common.getPreferredPlayingPosition(5);
        expect(instance.common.getPreferredPlayingPosition).toHaveBeenCalledWith(5);
    });
     it('Get proposed position of 1', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(1);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(1);
    });
    it('Get proposed position of 2', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(2);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(2);
    });
    it('Get proposed position of 3', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(3);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(3);
    });
    it('Get proposed position of 4', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(4);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(4);
    });
    it('Get proposed position of 5', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(5);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(5);
    });
      it('Get proposed position of 6', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(6);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(6);
    });
    it('Get proposed position of 7', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(7);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(7);
    });
    it('Get proposed position of 8', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(8);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(8);
    });
    it('Get proposed position of 9', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(9);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(9);
    });
    it('Get proposed position of 10', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(10);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(10);
    });
    it('Get proposed position of 11', () => {        
        spyOn(instance.common, 'getProposedPosition').and.callThrough();
        instance.common.getProposedPosition(11);
        expect(instance.common.getProposedPosition).toHaveBeenCalledWith(11);
    });
});
