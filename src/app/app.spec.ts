import { MyApp } from './app.component';
import { MenuMock, NavMock, PlatformMock } from '../mocks';
import { SignInPage } from '../../src/pages';
import { SharedService } from '../providers/shared.service'

let instance: MyApp = null;

describe('MyApp', () => {

    beforeEach(() => {
        instance = new MyApp((<any>new PlatformMock), (<any>new MenuMock));
        instance['nav'] = (<any>new NavMock());
    });

    it('initialises Root Pages with eight possible pages', () => {
        expect(instance['pagesRoot'].length).toEqual(8);
    });

    it('initialises Admin Pages with eight possible pages', () => {
        expect(instance['pagesAdmin'].length).toEqual(8);
    });

    it('initialises Coach Pages with two possible pages', () => {
        expect(instance['pagesCoach'].length).toEqual(2);
    });

    it('initialises Technical Director Pages with four possible pages', () => {
        expect(instance['pagesTechnicalDirector'].length).toEqual(4);
    });

    it('initialises Player Pages with zero possible pages', () => {
        expect(instance['pagesPlayer'].length).toEqual(0);
    });

    it('initialises with a root page', () => {
        expect(instance['rootPage']).not.toBe(null);
    });

    it('initialises with an app', () => {
        expect(instance['app']).not.toBe(null);
    });    
});
