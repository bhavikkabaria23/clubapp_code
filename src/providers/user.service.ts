import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

// Import the user model
import { User } from '../models/user'
import * as resources from '../app/resources'

/*
  Generated class for user service.  
*/
@Injectable()
export class UserService {
    public http: Http;
    constructor(http: Http) {
        this.http = http;
    }

    SignIn(user: User): Observable<any> {
        return this.SignInCallBack(user);
    }

    getByFFANumber(ffaNumber) {
        let res = this.http.get(resources.url.apiUrl + 'users/getByFFANumber/' + ffaNumber)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    UpdateUser(user: User) {
        let response = this.http.put(resources.url.apiUrl + "users", user)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    getAll(): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + "users")
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    SignUp(user: User): Observable<any> {
        let response = this.http.post(resources.url.apiUrl + "users/Signup", user)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }
    private SignInCallBack(user: User) {
        let response = this.http.post(resources.url.apiUrl + "users/signin", user)
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