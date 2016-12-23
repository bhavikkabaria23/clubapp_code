import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

import {Session} from '../models/session'

import * as resources from '../app/resources'

@Injectable()
export class SessionService {
    sessions: Session[];
    constructor(public http: Http) { }

    getAll(): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + "sessions")
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    getById(playerID): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + 'sessions/' + playerID)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    Save(session: Session): Observable<any> {
        return this.SaveCallBack(session);
    }
    private SaveCallBack(session: Session) {
        let response = this.http.post(resources.url.apiUrl + "sessions", session)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    Update(session: Session): Observable<any> {
        return this.UpdateCallBack(session);
    }
    private UpdateCallBack(session: Session) {
        let response = this.http.put(resources.url.apiUrl + "sessions", session)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

     getAllBySession(sessionKey): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + 'sessions/getAllBySession/' + sessionKey)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}