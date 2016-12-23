import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

// Import the user model
import { Assessment } from '../models/assessment'
import * as resources from '../app/resources'

/*
  Generated class for user service.  
*/
@Injectable()
export class AssessmentService {

    constructor(public http: Http) { }

    getAll(): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + "assessment")
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    getById(assessmentId): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + "assessment/" + assessmentId)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    checkExists(assessmentDetails): Observable<any> {
    	console.log(assessmentDetails);
        let res = this.http.post(resources.url.apiUrl + "assessment/exists", assessmentDetails)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    NewAssessment(assessment: Assessment) {
        let response = this.http.post(resources.url.apiUrl + "assessment", assessment)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    UpdateAssessment(assessment: Assessment) {
        let response = this.http.put(resources.url.apiUrl + "assessment", assessment)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}