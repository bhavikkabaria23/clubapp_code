import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

// Import the registration model
import {Registration} from '../models/registration'
import * as resources from '../app/resources'

/*
  Generated class for product service.  
*/
@Injectable()
export class RegistrationService {
    registration: Registration[];
    constructor(public http: Http) { }

    getAll(): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + 'registration')
            .map(response => response.json())
            .map((registrations: Array<any>) => {
                let result: Array<Registration> = [];
                if (registrations) {
                    registrations.forEach((registration) => {
                        let id = registration._id.toString();
                        registration.playerID = id.substr(id.length - 5);
                        result.push(registration);
                    });
                }
                return result;
            })
            .catch(this.handleError);
        return res;
    }

    getById(registerID): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + 'registration/' + registerID)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    // This method is not in use
    searchRegistration(searchTerm): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + 'registration/search/' + searchTerm)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    Update(registration: Registration): Observable<any> {
        return this.UpdateCallBack(registration);
    }
    private UpdateCallBack(registration: Registration) {
        let response = this.http.put(resources.url.apiUrl + "registration", registration)
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