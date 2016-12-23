import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

// Import the user model
import { Skill } from '../models/skill'
import * as resources from '../app/resources'

/*
  Generated class for user service.  
*/
@Injectable()
export class SkillService {

    constructor(public http: Http) { }

    getAll(): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + "skills")
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    getById(skillId): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + "skills/" + skillId)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    NewSkill(skill: Skill) {
        let response = this.http.post(resources.url.apiUrl + "skills", skill)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    UpdateSkill(skill: Skill) {
        let response = this.http.put(resources.url.apiUrl + "skills", skill)
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