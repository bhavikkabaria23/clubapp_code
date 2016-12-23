import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { LoadingController } from 'ionic-angular';
import * as resources from '../app/resources'

@Injectable()
export class SharedService {
    public data: any;
    public loader: any;
    public selectedCoaches = [];
    public isAuth: boolean = false;
    public role:number = 5; // Player
    constructor(public loadingCtrl: LoadingController, public http: Http) {

    }    


    settter(data: any) {
        this.data = data;
        this.role = data.role;
    }
    getter() {
        return this.data;
    }
     presentLoading() {
        this.loader = this.loadingCtrl.create({
            content: "Please wait...",            
            dismissOnPageChange: true
        });
        this.loader.present();
    }
    dismissLoading() {        
        this.loader.dismissAll();
    }
     GetAgeGroups(maxAge: number): Observable<any> {
        let response = this.http.get(resources.url.apiUrl + "registration/getAgeGroup/" + maxAge)
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