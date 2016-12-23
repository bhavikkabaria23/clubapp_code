import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
// Import the coach model
import { Registration } from '../models/registration'
import { Coach } from '../models/coach.detail'
import * as resources from '../app/resources'

/*
  Generated class for product service.  
*/
@Injectable()
export class CoachService {
    registration: Coach[];
    constructor(public http: Http) { }

    getById(coachID): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + 'coach/' + coachID)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    Register(registration: Registration): Observable<any> {
        return this.RegisterCallBack(registration);
    }
    private RegisterCallBack(registration: Registration) {
        let response = this.http.post(resources.url.apiUrl + "coach", registration)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    Update(coach: Coach): Observable<any> {
        return this.UpdateCallBack(coach);
    }
    private UpdateCallBack(coach: Coach) {
        let response = this.http.put(resources.url.apiUrl + "coach", coach)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    ValidateEmail(email): Observable<any> {
        return this.CheckEmail(email);
    }

    CheckEmail(email) {
        let response = this.http.post(resources.url.apiUrl + "coach/emailExist", { "email": email })
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    AssignToSession(coach: Coach): Observable<any> {
        return this.AssignToSessionCallBack(coach);
    }
    private AssignToSessionCallBack(coach: Coach) {
        let response = this.http.put(resources.url.apiUrl + "coach/assignToSession", coach)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}