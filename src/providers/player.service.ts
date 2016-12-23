import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

// Import the registration model
import {Player} from '../models/player'
import {Registration} from '../models/registration'
import {Coach} from '../models/coach'
import * as resources from '../app/resources'

/*
  Generated class for product service.  
*/
@Injectable()
export class PlayerService {
    registration: Player[];
    constructor(public http: Http) { }

    getAll(): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + "playerprofile")
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    getById(playerID): Observable<any> {
        let res = this.http.get(resources.url.apiUrl + 'playerprofile/' + playerID)
            .map(response => response.json())
            .catch(this.handleError);
        return res;
    }

    Register(registration: Registration): Observable<any> {
        return this.RegisterCallBack(registration);
    }
    private RegisterCallBack(registration: Registration) {
        let response = this.http.post(resources.url.apiUrl + "playerprofile", registration)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    Update(player: Player): Observable<any> {
        return this.UpdateCallBack(player);
    }
    private UpdateCallBack(player: Player) {
        let response = this.http.put(resources.url.apiUrl + "playerprofile", player)
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    ValidateEmail(email): Observable<any> {
        return this.CheckEmail(email);
    }

    CheckEmail(email) {
        let response = this.http.post(resources.url.apiUrl + "playerprofile/emailExist", { "email": email })
            .map(response => response.json())
            .catch(this.handleError);
        return response;
    }

    getAllCoaches(): Observable<any> {
        return this.http.get(resources.url.apiUrl + "coach")
            .map(response => response.json())
            .map((coaches: Array<any>) => {
                let result: Array<Coach> = [];
                if (coaches) {
                    coaches.forEach((coach) => {
                        let id = coach._id.toString();
                        coach.coachID = id.substr(id.length - 5);
                        result.push(coach);
                    });
                }
                return result;
            })
            .catch(this.handleError);
    }

    // Update player with session key
    AddToSession(player: Player): Observable<any> {
        return this.SendToCoachCallBack(player);
    }
    private SendToCoachCallBack(player: Player) {       
        let response = this.http.put(resources.url.apiUrl + "playerprofile/addToSession", player)
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