import { Observable } from 'rxjs/Rx';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { User } from './models/user'
import { Session } from './models/session'
import { Skill } from './models/skill'
import { Registration } from './models/registration'
import { Player } from './models/player'
export class UserMock {
    getAll(): Observable<any> {
        let responseList = Observable.of([
            {
                "_id": "5809b9544de3c55cb1a46713",
                "salt": "2100154a8fe10094b4046185b1b13011",
                "role": 1,
                "fFANumber": "123456",
                "__v": 0,
                "address": "test",
                "mobileNumber": "test",
                "password": "f92cf82f1c77e9caae729689d9f4aa3a",
                "createdDate": "2016-10-21T06:44:36.506Z",
                "isActive": true
            },
            {
                "_id": "581c4ef0aa8029d6f96da0e5",
                "mobileNumber": "5454365436",
                "address": "test",
                "password": "15b89c6d778fa28027666c5d785aa148",
                "salt": "d3271ec20fa75a27213baf78f8be7be1",
                "role": 5,
                "fFANumber": "565656",
                "__v": 0,
                "createdDate": "2016-11-04T09:03:44.581Z",
                "isActive": true
            }
        ]);
        return responseList;
    }

    SignUp(user: User): Observable<any> {
        let responseList = { status: true };
        return Observable.of(responseList);
    }

    getByFFANumber(ffaNumber): Observable<any> {
        let responseList = Observable.of(
            {
                "_id": "5809b9544de3c55cb1a46713",
                "salt": "2100154a8fe10094b4046185b1b13011",
                "role": 1,
                "fFANumber": "123456",
                "__v": 0,
                "address": "test",
                "mobileNumber": "test",
                "password": "f92cf82f1c77e9caae729689d9f4aa3a",
                "createdDate": "2016-10-21T06:44:36.506Z",
                "isActive": true
            }
        );
        return responseList;
    }

    SignIn(user: User): Observable<any> {        
        let responseList = { status: true, role: user.role, fFANumber: "1234568790" };
        return Observable.of(responseList);
    }

    UpdateUser(user: User): Observable<any> {
        let responseList = { status: true, role: 1, fFANumber: "1234568790" };
        return Observable.of(responseList);
    }
}

export class CoachServiceMock {
    AssignToSession(): Observable<any> {
        let responseList = { status: true };
        return Observable.of(responseList);
    }

    getById(coachID): Observable<any> {
        let coach = {
            "_id": "57f1ef3a7c50d9e5815d7c90",
            "email": "bhavik@gmail.com",
            "fFANumber": "4343245",
            "__v": 0,
            "suspensionsDetails": "yvxfjf",
            "mobileNumber": "54321256",
            "homeNumber": "5689000",
            "residentialAddress": "ghjk",
            "gender": "female",
            "childrenRegistration": "qwerty",
            "coachingLicence": "qwerty",
            "birthDate": "1995-11-09T00:00:00.000Z",
            "familyName": "anna",
            "givenName": "anna",
            "coachName": null,
            "modifiedDate": "2016-11-03T19:22:20.925Z",
            "createdDate": "2016-10-03T05:40:10.506Z",
            "clubHistory": [
                {
                    "details": "gjvgj",
                    "year": 2015,
                    "_id": "581b8e6c5cd640753da8d73d"
                },
                {
                    "details": "tzhgs",
                    "year": 2016,
                    "_id": "581b8e6c5cd640753da8d73c"
                }
            ],
            "contactPerson": [
                {
                    "email": "sxhjxf@fdh.com",
                    "contactNumber": "cdhcch",
                    "relationship": "xdhgxx",
                    "personName": "gdgxz",
                    "_id": "581b8e6c5cd640753da8d73b"
                }
            ],
            "images": [
                {
                    "name": "main",
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1478200932/gofer/B30W7VDZ10HTQ50D_wait3a.jpg",
                    "_id": "581b8e6c5cd640753da8d73a"
                },
                {
                    "name": "main_thumb",
                    "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1478200932/gofer/B30W7VDZ10HTQ50D_wait3a.jpg",
                    "_id": "581b8e6c5cd640753da8d739"
                }
            ],
            "sessions": [
                {
                    "startDateTime": "2016-10-23T18:00:00.000Z",
                    "sessionKey": "201610231800U009",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-22T18:00:00.000Z",
                    "sessionKey": "201610221800U009",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-22T18:00:00.000Z",
                    "sessionKey": "201610221800U015",
                    "ended": false
                },
                {
                    "startDateTime": "2016-10-28T18:00:00.000Z",
                    "sessionKey": "201610281800U009",
                    "ended": false
                }
            ],
            "dateOfApplication": "2016-10-03T05:40:10.506Z"
        };
        return Observable.of(coach);
    }

    Update(coach: any): Observable<any> {
        let responseList = { status: true };
        return Observable.of(responseList);
    }

}
export class PlayerServiceMock {
    public getAll(): Observable<any> {
        let res = Observable.of([
            {
                "_id": "58137c43344ed928740f7ed2",
                "purposeOfTrip": "learn technical skills from Olympiacos",
                "destination": "Athens",
                "arrangedBy": "GRM",
                "injuriesDetails": "fractured radius",
                "suspensionsDetails": "none",
                "employementDetails": "student",
                "schoolDetails": "Barker College",
                "email": "jamesjostsons@gmail.com",
                "mobileNumber": "0438568311",
                "homeNumber": "91445525",
                "residentialAddress": "54 Fairlawn Avenue, Turramurra, NSW, 2074",
                "objectivesAmbitions": "Develop technical skills and play competitively in a quality team",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 18s",
                "birthDate": "2000-06-13T00:00:00.000Z",
                "fFANumber": "67274316",
                "familyName": "Jostsons",
                "givenName": "James",
                "playerName": "James Jostsons",
                "playerID": "undefined001",
                "sessionKey": "201610221800U015",
                "isActive": true,
                "modifiedDate": "2016-12-07T08:45:14.517Z",
                "createdDate": "2016-12-07T08:45:14.517Z",
                "academicSessionPerWeekCount": 0,
                "clubHistory": [
                    {
                        "year": "2015",
                        "details": "GRM u16",
                        "_id": "58137c43344ed928740f7ed7"
                    },
                    {
                        "year": "2016",
                        "details": "GRM u16",
                        "_id": "58137c43344ed928740f7ed8"
                    }
                ],
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                        "name": "main",
                        "_id": "58137c43344ed928740f7ed4"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                        "name": "main_thumb",
                        "_id": "58137c43344ed928740f7ed3"
                    }
                ],
                "contactPerson": [
                    {
                        "personName": "Fiona Jostsons",
                        "relationship": "Mother",
                        "contactNumber": "0438568311",
                        "email": "fiphil@bigpond.net.au",
                        "_id": "58137c43344ed928740f7ed5"
                    },
                    {
                        "personName": "Phil Jostsons",
                        "relationship": "Father",
                        "contactNumber": "91445525",
                        "email": "phil@Vantagerecruitmet.com.au",
                        "_id": "58137c43344ed928740f7ed6"
                    }
                ],
                "coaches": [],
                "dateOfApplication": "2016-12-07T08:45:14.517Z"
            },
            {
                "_id": "581423269b894232f9805640",
                "purposeOfTrip": "training",
                "destination": "Sydney ground",
                "arrangedBy": "sports organization",
                "contactDetails": "768766677",
                "headCoachName": "my coach",
                "injuriesDetails": "Not injured",
                "suspensionsDetails": "two times",
                "employementDetails": "sports organization",
                "schoolDetails": "Sydney school",
                "email": "payer1@gmail.com",
                "mobileNumber": "9999999898",
                "homeNumber": "767676576",
                "residentialAddress": "Sydney",
                "objectivesAmbitions": "Good player",
                "gender": "male",
                "preferredPlayingPosition": 5,
                "ageGroup": "Under 9s",
                "birthDate": "2016-01-01T00:00:00.000Z",
                "fFANumber": "123456",
                "familyName": "Smith",
                "givenName": "John",
                "playerName": null,
                "playerID": "U09002",
                "sessionKey": "201610221800U009",
                "isActive": true,
                "modifiedDate": "2016-11-01T02:13:12.042Z",
                "createdDate": "2016-12-07T08:45:14.519Z",
                "academicSessionPerWeekCount": 2,
                "clubHistory": [
                    {
                        "details": "Gold medal",
                        "year": "2015",
                        "_id": "5817fa38827c5c42d832a8e6"
                    },
                    {
                        "details": "Silver medal",
                        "year": "2016",
                        "_id": "5817fa38827c5c42d832a8e5"
                    }
                ],
                "images": [
                    {
                        "name": "main",
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477966385/gofer/0L8P9F89RO0BVZN9_wckiue.jpg",
                        "_id": "5817fa38827c5c42d832a8e8"
                    },
                    {
                        "name": "main_thumb",
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477966385/gofer/0L8P9F89RO0BVZN9_wckiue.jpg",
                        "_id": "5817fa38827c5c42d832a8e7"
                    }
                ],
                "contactPerson": [
                    {
                        "email": "person1@gmail.com",
                        "contactNumber": "9788786786",
                        "relationship": "brother ",
                        "personName": "contact one",
                        "_id": "5817fa38827c5c42d832a8e4"
                    },
                    {
                        "email": "person2@gmail.com",
                        "contactNumber": "0867767987",
                        "relationship": "father",
                        "personName": "contact two",
                        "_id": "5817fa38827c5c42d832a8e3"
                    }
                ],
                "coaches": [],
                "dateOfApplication": null
            }
        ]);
        return res;
    }
    public getById(playerID): Observable<any> {
        let res = Observable.of(
            {
                "_id": "58137c43344ed928740f7ed2",
                "purposeOfTrip": "learn technical skills from Olympiacos",
                "destination": "Athens",
                "arrangedBy": "GRM",
                "injuriesDetails": "fractured radius",
                "suspensionsDetails": "none",
                "employementDetails": "student",
                "schoolDetails": "Barker College",
                "email": "jamesjostsons@gmail.com",
                "mobileNumber": "0438568311",
                "homeNumber": "91445525",
                "residentialAddress": "54 Fairlawn Avenue, Turramurra, NSW, 2074",
                "objectivesAmbitions": "Develop technical skills and play competitively in a quality team",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "ageGroup": "Under 18s",
                "birthDate": "2000-06-13T00:00:00.000Z",
                "fFANumber": "67274316",
                "familyName": "Jostsons",
                "givenName": "James",
                "playerName": "James Jostsons",
                "playerID": "undefined001",
                "sessionKey": "201610221800U015",
                "isActive": true,
                "modifiedDate": "2016-12-07T08:45:14.517Z",
                "createdDate": "2016-12-07T08:45:14.517Z",
                "academicSessionPerWeekCount": 0,
                "clubHistory": [
                    {
                        "year": "2015",
                        "details": "GRM u16",
                        "_id": "58137c43344ed928740f7ed7"
                    },
                    {
                        "year": "2016",
                        "details": "GRM u16",
                        "_id": "58137c43344ed928740f7ed8"
                    }
                ],
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                        "name": "main",
                        "_id": "58137c43344ed928740f7ed4"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                        "name": "main_thumb",
                        "_id": "58137c43344ed928740f7ed3"
                    }
                ],
                "contactPerson": [
                    {
                        "personName": "Fiona Jostsons",
                        "relationship": "Mother",
                        "contactNumber": "0438568311",
                        "email": "fiphil@bigpond.net.au",
                        "_id": "58137c43344ed928740f7ed5"
                    },
                    {
                        "personName": "Phil Jostsons",
                        "relationship": "Father",
                        "contactNumber": "91445525",
                        "email": "phil@Vantagerecruitmet.com.au",
                        "_id": "58137c43344ed928740f7ed6"
                    }
                ],
                "coaches": [],
                "dateOfApplication": "2016-12-07T08:45:14.517Z"
            }
        );
        return res;
    }
    public getAllCoaches(): Observable<any> {
        let responseList = Observable.of([
            {
                "_id": "57ef38aab2f06ebf1c98cc65",
                "suspensionsDetails": "",
                "email": "chrisgaits@live.com",
                "mobileNumber": "0468 912 320",
                "homeNumber": "",
                "residentialAddress": "",
                "gender": "male",
                "childrenRegistration": "",
                "coachingLicence": "",
                "fFANumber": "75470195",
                "birthDate": "1963-08-06T00:00:00.000Z",
                "coachName": "Chris Gaitatzis",
                "__v": 0,
                "modifiedDate": "2016-10-01T04:16:42.253Z",
                "createdDate": "2016-10-01T04:16:42.253Z",
                "clubHistory": [
                    {
                        "year": 2015,
                        "details": "",
                        "_id": "57ef38aab2f06ebf1c98cc67"
                    },
                    {
                        "year": 2016,
                        "details": "",
                        "_id": "57ef38aab2f06ebf1c98cc68"
                    }
                ],
                "contactPerson": [
                    {
                        "personName": "",
                        "relationship": "",
                        "contactNumber": "",
                        "email": "",
                        "_id": "57ef38aab2f06ebf1c98cc66"
                    }
                ],
                "images": [
                    {
                        "_id": "5817bb509b894232f9805657",
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477950283/gofer/ZKJJO4IZM2LXPCWL_pqzppn.jpg",
                        "name": "main"
                    },
                    {
                        "_id": "5817bb509b894232f9805656",
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477950283/gofer/ZKJJO4IZM2LXPCWL_pqzppn.jpg",
                        "name": "main_thumb"
                    }
                ],
                "sessions": [
                    {
                        "startDateTime": "2016-10-23T18:00:00.000Z",
                        "sessionKey": "201610231800U009",
                        "ended": false
                    },
                    {
                        "startDateTime": "2016-10-22T18:00:00.000Z",
                        "sessionKey": "201610221800U009",
                        "ended": false
                    },
                    {
                        "startDateTime": "2016-10-22T18:00:00.000Z",
                        "sessionKey": "201610221800U015",
                        "ended": false
                    },
                    {
                        "startDateTime": "2016-10-28T18:00:00.000Z",
                        "sessionKey": "201610281800U009",
                        "ended": false
                    }
                ],
                "dateOfApplication": "2016-10-01T04:16:42.253Z"
            },
            {
                "_id": "57ef38deb2f06ebf1c98cc69",
                "suspensionsDetails": "",
                "email": "andrew.galbraith@anz.com",
                "mobileNumber": "0481 012 816",
                "homeNumber": "",
                "residentialAddress": "",
                "gender": "male",
                "childrenRegistration": "",
                "coachingLicence": "",
                "fFANumber": "78816790",
                "birthDate": "1963-08-06T00:00:00.000Z",
                "coachName": "Andrew Galbraith",
                "__v": 0,
                "modifiedDate": "2016-10-01T04:17:34.365Z",
                "createdDate": "2016-10-01T04:17:34.365Z",
                "clubHistory": [
                    {
                        "year": 2015,
                        "details": "",
                        "_id": "57ef38deb2f06ebf1c98cc6b"
                    },
                    {
                        "year": 2016,
                        "details": "",
                        "_id": "57ef38deb2f06ebf1c98cc6c"
                    }
                ],
                "contactPerson": [
                    {
                        "personName": "",
                        "relationship": "",
                        "contactNumber": "",
                        "email": "",
                        "_id": "57ef38deb2f06ebf1c98cc6a"
                    }
                ],
                "images": [],
                "sessions": [],
                "dateOfApplication": "2016-10-01T04:17:34.364Z"
            },
            {
                "_id": "57ef3955b2f06ebf1c98cc6d",
                "suspensionsDetails": "None",
                "email": "georgeg@grmfc.com",
                "mobileNumber": "0412 305 800",
                "homeNumber": "123",
                "residentialAddress": "Home",
                "gender": "male",
                "childrenRegistration": "Nil",
                "coachingLicence": "Nil",
                "fFANumber": "54180856",
                "birthDate": "1967-11-27T00:00:00.000Z",
                "coachName": "George Ganiatsas",
                "__v": 0,
                "modifiedDate": "2016-10-19T00:02:31.952Z",
                "createdDate": "2016-10-01T04:19:33.290Z",
                "clubHistory": [
                    {
                        "details": "GRMFC",
                        "year": 2015,
                        "_id": "5806b8178c8237624e0903d8"
                    },
                    {
                        "details": "GRMFC",
                        "year": 2016,
                        "_id": "5806b8178c8237624e0903d7"
                    }
                ],
                "contactPerson": [
                    {
                        "email": "q@q.com",
                        "contactNumber": "123",
                        "relationship": "Mine",
                        "personName": "Me",
                        "_id": "5806b8178c8237624e0903d6"
                    }
                ],
                "images": [],
                "sessions": [],
                "dateOfApplication": "2016-10-01T04:19:33.290Z"
            }
        ]);
        return responseList;
    }
    public Register(registration: Registration): Observable<any> {
        let response = Observable.of({
            status: true
        });
        return response;
    }
    public Update(player: Player): Observable<any> {
        let response = Observable.of({
            status: true
        });
        return response;
    }
    public AddToSession(player: Player): Observable<any> {
        let response = Observable.of({
            status: true
        });
        return response;
    }

}

export class SessionServiceMock {
    public getAll(): Observable<any> {
        let res = Observable.of([
            {
                "_id": "580b551428d909b39ffced1b",
                "sessionKey": "201610231800U009",
                "__v": 0,
                "startDateTime": "2016-10-23T18:00:00.000Z",
                "skills": [
                    {
                        "instructions": "test da field",
                        "name": "test",
                        "_id": "580de0f99397a24d5af3dc57"
                    },
                    {
                        "name": "Running ",
                        "_id": "5812fdebda43bc092744f51c"
                    }
                ],
                "ended": false,
                "players": [],
                "coaches": [],
                "isActive": true,
                "modifiedDate": "2016-11-03T06:18:15.952Z",
                "createdDate": "2016-10-22T12:01:24.824Z"
            },
            {
                "_id": "580b551c28d909b39ffced1c",
                "sessionKey": "201610221800U009",
                "__v": 0,
                "startDateTime": "2016-10-22T18:00:00.000Z",
                "skills": [
                    {
                        "instructions": "kick da ball",
                        "name": "kicking",
                        "_id": "580ec32e059d26a48067f235"
                    },
                    {
                        "instructions": "test da field",
                        "name": "test",
                        "_id": "580de0f99397a24d5af3dc57"
                    },
                    {
                        "name": "Running ",
                        "_id": "5812fdebda43bc092744f51c"
                    },
                    {
                        "name": "endurance",
                        "instructions": "5km cross",
                        "_id": "5817bef19b894232f9805666"
                    }
                ],
                "ended": false,
                "players": [],
                "coaches": [],
                "isActive": true,
                "modifiedDate": "2016-11-01T05:18:43.554Z",
                "createdDate": "2016-10-22T12:01:32.640Z"
            }]);
        return res;
    }
    public getById(playerID): Observable<any> {
        let res = Observable.of(
            {
                "_id": "580b551c28d909b39ffced1c",
                "sessionKey": "201610221800U009",
                "__v": 0,
                "startDateTime": "2016-10-22T18:00:00.000Z",
                "skills": [
                    {
                        "instructions": "kick da ball",
                        "name": "kicking",
                        "_id": "580ec32e059d26a48067f235"
                    },
                    {
                        "instructions": "test da field",
                        "name": "test",
                        "_id": "580de0f99397a24d5af3dc57"
                    },
                    {
                        "name": "Running ",
                        "_id": "5812fdebda43bc092744f51c"
                    },
                    {
                        "name": "endurance",
                        "instructions": "5km cross",
                        "_id": "5817bef19b894232f9805666"
                    }
                ],
                "ended": false,
                "players": [],
                "coaches": [],
                "isActive": true,
                "modifiedDate": "2016-11-01T05:18:43.554Z",
                "createdDate": "2016-10-22T12:01:32.640Z"
            });
        return res;
    }
    public Save(session: Session): Observable<any> {
        let response = Observable.of({
            status: true
        });
        return response;
    }
    public Update(session: Session): Observable<any> {
        let response = Observable.of({
            status: true
        });
        return response;
    }
    public getAllBySession(sessionKey): Observable<any> {
        let res = Observable.of(
            {
                "session": {
                    "_id": "580b551c28d909b39ffced1c",
                    "sessionKey": "201610221800U009",
                    "__v": 0,
                    "startDateTime": "2016-10-22T18:00:00.000Z",
                    "skills": [
                        {
                            "instructions": "kick da ball",
                            "name": "kicking",
                            "_id": "580ec32e059d26a48067f235"
                        },
                        {
                            "instructions": "test da field",
                            "name": "test",
                            "_id": "580de0f99397a24d5af3dc57"
                        },
                        {
                            "name": "Running ",
                            "_id": "5812fdebda43bc092744f51c"
                        },
                        {
                            "name": "endurance",
                            "instructions": "5km cross",
                            "_id": "5817bef19b894232f9805666"
                        }
                    ],
                    "ended": false,
                    "players": [],
                    "coaches": [],
                    "isActive": true,
                    "modifiedDate": "2016-11-01T05:18:43.554Z",
                    "createdDate": "2016-10-22T12:01:32.640Z"
                },
                "players": [
                    {
                        "_id": "581423269b894232f9805640",
                        "purposeOfTrip": "training",
                        "destination": "Sydney ground",
                        "arrangedBy": "sports organization",
                        "contactDetails": "768766677",
                        "headCoachName": "my coach",
                        "injuriesDetails": "Not injured",
                        "suspensionsDetails": "two times",
                        "employementDetails": "sports organization",
                        "schoolDetails": "Sydney school",
                        "email": "payer1@gmail.com",
                        "mobileNumber": "9999999898",
                        "homeNumber": "767676576",
                        "residentialAddress": "Sydney",
                        "objectivesAmbitions": "Good player",
                        "gender": "male",
                        "preferredPlayingPosition": 5,
                        "ageGroup": "Under 9s",
                        "birthDate": "2016-01-01T00:00:00.000Z",
                        "fFANumber": "123456",
                        "familyName": "Smith",
                        "givenName": "John",
                        "playerName": null,
                        "playerID": "U09002",
                        "sessionKey": "201610221800U009",
                        "isActive": true,
                        "modifiedDate": "2016-11-01T02:13:12.042Z",
                        "createdDate": "2016-12-08T07:17:16.685Z",
                        "academicSessionPerWeekCount": 2,
                        "clubHistory": [
                            {
                                "details": "Gold medal",
                                "year": "2015",
                                "_id": "5817fa38827c5c42d832a8e6"
                            },
                            {
                                "details": "Silver medal",
                                "year": "2016",
                                "_id": "5817fa38827c5c42d832a8e5"
                            }
                        ],
                        "images": [
                            {
                                "name": "main",
                                "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477966385/gofer/0L8P9F89RO0BVZN9_wckiue.jpg",
                                "_id": "5817fa38827c5c42d832a8e8"
                            },
                            {
                                "name": "main_thumb",
                                "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477966385/gofer/0L8P9F89RO0BVZN9_wckiue.jpg",
                                "_id": "5817fa38827c5c42d832a8e7"
                            }
                        ],
                        "contactPerson": [
                            {
                                "email": "person1@gmail.com",
                                "contactNumber": "9788786786",
                                "relationship": "brother ",
                                "personName": "contact one",
                                "_id": "5817fa38827c5c42d832a8e4"
                            },
                            {
                                "email": "person2@gmail.com",
                                "contactNumber": "0867767987",
                                "relationship": "father",
                                "personName": "contact two",
                                "_id": "5817fa38827c5c42d832a8e3"
                            }
                        ],
                        "coaches": [],
                        "dateOfApplication": null
                    },
                    {
                        "_id": "58182414827c5c42d832a8f0",
                        "purposeOfTrip": "Game game  game game game game",
                        "destination": "Game game  game game game game",
                        "arrangedBy": "Game game  game game game game",
                        "contactDetails": "56",
                        "headCoachName": "Geogry",
                        "injuriesDetails": "Game game  game game game game",
                        "suspensionsDetails": "Game game  game game game game",
                        "employementDetails": "Employer",
                        "schoolDetails": "Hight",
                        "email": "julia.shevchenko@gravityfusion.com",
                        "mobileNumber": "+380507675858",
                        "homeNumber": "33",
                        "residentialAddress": "London",
                        "objectivesAmbitions": "Game game  game game game game Game game  game game game game",
                        "gender": "male",
                        "preferredPlayingPosition": 1,
                        "ageGroup": "1st Grade",
                        "birthDate": "1986-02-04T00:00:00.000Z",
                        "fFANumber": "Ufc",
                        "familyName": "alex",
                        "givenName": "Alex",
                        "playerName": "Alex alex",
                        "playerID": "FG002",
                        "sessionKey": "201610221800U009",
                        "isActive": true,
                        "modifiedDate": "2016-12-08T07:17:16.687Z",
                        "createdDate": "2016-12-08T07:17:16.687Z",
                        "academicSessionPerWeekCount": 67,
                        "clubHistory": [
                            {
                                "year": "2015",
                                "details": "Wow",
                                "_id": "58182414827c5c42d832a8f5"
                            },
                            {
                                "year": "2016",
                                "details": "Wow",
                                "_id": "58182414827c5c42d832a8f6"
                            }
                        ],
                        "images": [
                            {
                                "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                                "name": "main",
                                "_id": "58182414827c5c42d832a8f2"
                            },
                            {
                                "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477977100/gofer/T8T6F5P5YP5ZWZAS_ykokxu.jpg",
                                "name": "main_thumb",
                                "_id": "58182414827c5c42d832a8f1"
                            }
                        ],
                        "contactPerson": [
                            {
                                "personName": "Angel",
                                "relationship": "No",
                                "contactNumber": "24668",
                                "email": "julia.shevchenko@gravityfusion.com",
                                "_id": "58182414827c5c42d832a8f3"
                            },
                            {
                                "_id": "58182414827c5c42d832a8f4"
                            }
                        ],
                        "coaches": [],
                        "dateOfApplication": "2016-12-08T07:17:16.687Z"
                    }
                ],
                "coaches": [
                    {
                        "_id": "57ef37e1bb9275ba91a02092",
                        "suspensionsDetails": "",
                        "email": "fotakopoulos_1995@hotmail.com",
                        "mobileNumber": "0479 114 757",
                        "homeNumber": "",
                        "residentialAddress": "",
                        "gender": "male",
                        "childrenRegistration": "",
                        "coachingLicence": "",
                        "fFANumber": "51488898",
                        "birthDate": "1963-08-07T00:00:00.000Z",
                        "coachName": "Andreas Fotakopoulos",
                        "__v": 0,
                        "modifiedDate": "2016-10-01T04:13:21.093Z",
                        "createdDate": "2016-10-01T04:13:21.093Z",
                        "clubHistory": [
                            {
                                "year": 2015,
                                "details": "",
                                "_id": "57ef37e1bb9275ba91a02094"
                            },
                            {
                                "year": 2016,
                                "details": "",
                                "_id": "57ef37e1bb9275ba91a02095"
                            }
                        ],
                        "contactPerson": [
                            {
                                "personName": "",
                                "relationship": "",
                                "contactNumber": "",
                                "email": "",
                                "_id": "57ef37e1bb9275ba91a02093"
                            }
                        ],
                        "images": [],
                        "sessions": [
                            {
                                "startDateTime": "2016-10-22T18:00:00.000Z",
                                "sessionKey": "201610221800U009",
                                "ended": false
                            }
                        ],
                        "dateOfApplication": "2016-10-01T04:13:21.093Z"
                    },
                    {
                        "_id": "5808864f9cb0de461493e0c9",
                        "suspensionsDetails": "test",
                        "email": "ronak@hotmail.com",
                        "mobileNumber": "0479 114 757",
                        "homeNumber": "test",
                        "residentialAddress": "test",
                        "gender": "male",
                        "childrenRegistration": "test",
                        "coachingLicence": "test",
                        "fFANumber": "51488898",
                        "birthDate": "1963-08-07T00:00:00.000Z",
                        "familyName": "Bhavsar",
                        "givenName": "Ronak",
                        "coachName": null,
                        "imageManager": [
                            {
                                "_id": "58089dc11ab8757bd8fc0bfb",
                                "name": "dcb4bcac-f8ab-4e80-a051-e46e39ab2fdd"
                            }
                        ],
                        "__v": 0,
                        "sessionKey": [
                            {
                                "sessionID": "201610221800U009"
                            },
                            {
                                "sessionID": "201610231800U009"
                            }
                        ],
                        "modifiedDate": "2016-10-28T21:31:29.659Z",
                        "createdDate": "2016-10-20T08:54:39.221Z",
                        "clubHistory": [
                            {
                                "details": "test",
                                "year": 2015,
                                "_id": "5813c3b1344ed928740f7ee7"
                            },
                            {
                                "details": "test",
                                "year": 2016,
                                "_id": "5813c3b1344ed928740f7ee6"
                            }
                        ],
                        "contactPerson": [
                            {
                                "email": "test@gmail.com",
                                "contactNumber": "test",
                                "relationship": "test",
                                "personName": "test",
                                "_id": "5813c3b1344ed928740f7ee5"
                            }
                        ],
                        "images": [
                            {
                                "name": "main",
                                "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477690282/gofer/DOQJXWQQQ2HQWOM0_ujahq4.jpg",
                                "_id": "5813c3b1344ed928740f7ee4"
                            },
                            {
                                "name": "main_thumb",
                                "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477690282/gofer/DOQJXWQQQ2HQWOM0_ujahq4.jpg",
                                "_id": "5813c3b1344ed928740f7ee3"
                            }
                        ],
                        "sessions": [
                            {
                                "startDateTime": "2016-11-15T00:00:00.000Z",
                                "sessionKey": "testsession",
                                "ended": false
                            },
                            {
                                "startDateTime": "2016-10-28T18:00:00.000Z",
                                "sessionKey": "201610281800U009",
                                "ended": false
                            },
                            {
                                "startDateTime": "2016-10-22T18:00:00.000Z",
                                "sessionKey": "201610221800U015",
                                "ended": false
                            },
                            {
                                "startDateTime": "2016-10-22T18:00:00.000Z",
                                "sessionKey": "201610221800U009",
                                "ended": false
                            },
                            {
                                "startDateTime": "2016-10-23T18:00:00.000Z",
                                "sessionKey": "201610231800U009",
                                "ended": false
                            }
                        ],
                        "dateOfApplication": "2016-10-20T08:54:39.221Z"
                    },
                    {
                        "_id": "57f1ef3a7c50d9e5815d7c90",
                        "email": "bhavik@gmail.com",
                        "fFANumber": "4343245",
                        "suspensionsDetails": "yvxfjf",
                        "mobileNumber": "54321256",
                        "homeNumber": "5689000",
                        "residentialAddress": "ghjk",
                        "gender": "female",
                        "childrenRegistration": "qwerty",
                        "coachingLicence": "qwerty",
                        "birthDate": "1995-11-09T00:00:00.000Z",
                        "familyName": "anna",
                        "givenName": "anna",
                        "coachName": null,
                        "modifiedDate": "2016-11-03T19:22:20.925Z",
                        "createdDate": "2016-10-03T05:40:10.506Z",
                        "clubHistory": [
                            {
                                "details": "gjvgj",
                                "year": 2015,
                                "_id": "581b8e6c5cd640753da8d73d"
                            },
                            {
                                "details": "tzhgs",
                                "year": 2016,
                                "_id": "581b8e6c5cd640753da8d73c"
                            }
                        ],
                        "contactPerson": [
                            {
                                "email": "sxhjxf@fdh.com",
                                "contactNumber": "cdhcch",
                                "relationship": "xdhgxx",
                                "personName": "gdgxz",
                                "_id": "581b8e6c5cd640753da8d73b"
                            }
                        ],
                        "images": [
                            {
                                "name": "main",
                                "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1478200932/gofer/B30W7VDZ10HTQ50D_wait3a.jpg",
                                "_id": "581b8e6c5cd640753da8d73a"
                            },
                            {
                                "name": "main_thumb",
                                "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1478200932/gofer/B30W7VDZ10HTQ50D_wait3a.jpg",
                                "_id": "581b8e6c5cd640753da8d739"
                            }
                        ],
                        "sessions": [
                            {
                                "startDateTime": "2016-10-23T18:00:00.000Z",
                                "sessionKey": "201610231800U009",
                                "ended": false
                            },
                            {
                                "startDateTime": "2016-10-22T18:00:00.000Z",
                                "sessionKey": "201610221800U009",
                                "ended": false
                            },
                            {
                                "startDateTime": "2016-10-22T18:00:00.000Z",
                                "sessionKey": "201610221800U015",
                                "ended": false
                            },
                            {
                                "startDateTime": "2016-10-28T18:00:00.000Z",
                                "sessionKey": "201610281800U009",
                                "ended": false
                            }
                        ],
                        "dateOfApplication": "2016-10-03T05:40:10.506Z"
                    }
                ]
            }
        );
        return res;
    }
}

export class SkillServiceMock {
    public getAll(): Observable<any> {
        let res = Observable.of([
            {
                "_id": "580de0f99397a24d5af3dc57",
                "description": "test description",
                "name": "test",
                "instructions": "test da field",
                "isActive": true,
                "modifiedDate": "2016-10-28T03:47:01.886Z",
                "createdDate": "2016-12-05T08:47:13.740Z"
            },
            {
                "_id": "580ec32e059d26a48067f235",
                "description": "kicking a ball",
                "name": "kicking",
                "instructions": "kick da ball",
                "isActive": true,
                "modifiedDate": "2016-10-28T03:46:54.401Z",
                "createdDate": "2016-12-05T08:47:13.742Z"
            }
        ]);
        return res;
    }
    public getById(skillId): Observable<any> {
        let res = Observable.of(
            {
                "_id": "580de0f99397a24d5af3dc57",
                "description": "test description",
                "name": "test",
                "instructions": "test da field",
                "isActive": true,
                "modifiedDate": "2016-10-28T03:47:01.886Z",
                "createdDate": "2016-12-05T08:47:13.740Z"
            });
        return res;
    }
    public NewSkill(skill: Skill): Observable<any> {
        let response = Observable.of({
            status: true
        });
        return response;
    }
    public UpdateSkill(skill: Skill): Observable<any> {
        let response = Observable.of({
            status: true
        });
        return response;
    }
}

export class RegistrationServiceMock {
    public getAll(): Observable<any> {
        let res = Observable.of([
            {
                "_id": "5805bc0fd1150b0d20966a0a",
                "footballAcademyDetails": "5805bc0fd1150b0d20966a0f",
                "playingHistory": "5805bc0fd1150b0d20966a0e",
                "studyWorkDetails": "5805bc0fd1150b0d20966a0d",
                "contactPerson2": "5805bc0fd1150b0d20966a0c",
                "contactPerson1": "5805bc0fd1150b0d20966a0b",
                "email": "anna.lysenko@gravityfusion.com",
                "mobileNumber": "987654321",
                "homeNumber": "1234567898",
                "residentialAddress": "qwerty",
                "ageGroup": "Under 18s",
                "gender": "female",
                "preferredPlayingPosition": 2,
                "birthDate": "2000-03-07T21:00:00.000Z",
                "playerName": "werty",
                "modifiedDate": "2016-10-18T06:07:11.108Z",
                "createdDate": "2016-10-18T06:07:11.108Z",
                "images": [],
                "dateOfApplication": "2016-10-18T06:07:11.108Z"
            },
            {
                "_id": "5805bd06fd721f23d42910ba",
                "footballAcademyDetails": "5805bd06fd721f23d42910bf",
                "playingHistory": "5805bd06fd721f23d42910be",
                "studyWorkDetails": "5805bd06fd721f23d42910bd",
                "contactPerson2": "5805bd06fd721f23d42910bc",
                "contactPerson1": "5805bd06fd721f23d42910bb",
                "objectivesAmbitions": "I want play ",
                "email": "julia.shevchenko@gravityfusuon.com",
                "mobileNumber": "+380506768788",
                "homeNumber": "66",
                "residentialAddress": "Kiev",
                "gender": "male",
                "preferredPlayingPosition": 2,
                "birthDate": "2009-03-03T21:00:00.000Z",
                "fFANumber": "44",
                "playerName": "Peter raid",
                "modifiedDate": "2016-10-18T06:11:18.526Z",
                "createdDate": "2016-10-18T06:11:18.526Z",
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                        "name": "main",
                        "_id": "58137c43344ed928740f7ed4"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                        "name": "main_thumb",
                        "_id": "58137c43344ed928740f7ed3"
                    }],
                "dateOfApplication": "2016-10-18T06:11:18.526Z"
            }
        ]);
        return res;
    }
    public getById(registerID): Observable<any> {
        let res = Observable.of(
            {
                "playerID": "FG003",
                "_id": "5805940cd1150b0d209669fc",
                "footballAcademyDetails": {
                    "_id": "5805940cd1150b0d20966a01",
                    "purposeOfTrip": "learn technical skills from Olympiacos",
                    "destination": "Athens",
                    "arrangedBy": "GRM",
                    "academicSessionPerWeekCount": 2,
                    "contactDetails": "768766677",
                    "headCoachName": "my coach"
                },
                "playingHistory": {
                    "_id": "5805940cd1150b0d20966a00",
                    "previousClub2016": "23423432",
                    "previousClub2015": "werwrwe",
                    "suspensionsDetails": "wqrqwr",
                    "injuriesDetails": "qwerqewr",
                },
                "studyWorkDetails": {
                    "_id": "5805940cd1150b0d209669ff",
                    "employementDetails": "student",
                    "schoolDetails": "Barker College",
                },
                "contactPerson2": {
                    "_id": "5805940cd1150b0d209669fe",
                    "personName": "second",
                    "relationship": "brither",
                    "contactNumber": "980980980",
                    "email": "second@gmail.com",
                },
                "contactPerson1": {
                    "_id": "5805940cd1150b0d209669fd",
                    "personName": "first",
                    "relationship": "father",
                    "contactNumber": "980980980",
                    "email": "first@gmail.com",
                },
                "objectivesAmbitions": "Ambitions",
                "email": "rleidl@gmail.com",
                "mobileNumber": "jlkjljl",
                "homeNumber": "jklljl",
                "residentialAddress": "jlkjlkjj",
                "ageGroup": "1st Grade",
                "gender": "male",
                "preferredPlayingPosition": 3,
                "birthDate": "1994-11-30T23:00:00.000Z",
                "fFANumber": "123456789",
                "playerName": "Robert Leidl",
                "modifiedDate": "2016-10-18T03:16:28.476Z",
                "createdDate": "2016-10-18T03:16:28.476Z",
                "images": [
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                        "name": "main",
                        "_id": "58137c43344ed928740f7ed4"
                    },
                    {
                        "url": "https://res.cloudinary.com/lwve0xa7a/image/upload/c_lfill,g_faces,h_100,w_100/v1477671962/gofer/M7ATQASPL5YTH71A_a49hln.jpg",
                        "name": "main_thumb",
                        "_id": "58137c43344ed928740f7ed3"
                    }],
                "dateOfApplication": "2016-10-18T03:16:28.476Z"
            });
        return res;
    }
    public Update(registration: Registration): Observable<any> {
        let response = Observable.of({
            status: true
        });
        return response;
    }
}

export class SharedMock {
    public data: any;
    public loader: any;
    public selectedCoaches = [];
    public isAuth: boolean = false;
    public role: number = 5; // Player

    settter(data: any) {
        this.data = data;
        this.role = data.role;
    }
    getter() {
        let data = {
            "_id": "581979a9827c5c42d832a8fd",
            "note": "grest",
            "sessionKey": "201610281800U009",
            "coach_id": "4343245",
            "player_id": "U16001",
            "__v": 0,
            "isActive": true,
            "modifiedDate": "2016-11-02T05:29:13.852Z",
            "createdDate": "2016-11-02T05:29:13.852Z",
            "assessments": [
                {
                    "instructions": "kick da ball",
                    "name": "kicking",
                    "_id": "580ec32e059d26a48067f235",
                    "rating": 5
                },
                {
                    "instructions": "test da field",
                    "name": "test",
                    "_id": "580de0f99397a24d5af3dc57",
                    "rating": 5
                }
            ],
            coach: {
                "_id": "57ef37e1bb9275ba91a02092",
                "suspensionsDetails": "",
                "email": "fotakopoulos_1995@hotmail.com",
                "mobileNumber": "0479 114 757",
                "homeNumber": "",
                "residentialAddress": "",
                "gender": "male",
                "childrenRegistration": "",
                "coachingLicence": "",
                "fFANumber": "51488898",
                "birthDate": "1963-08-07T00:00:00.000Z",
                "coachName": "Andreas Fotakopoulos",
                "__v": 0,
                "modifiedDate": "2016-10-01T04:13:21.093Z",
                "createdDate": "2016-10-01T04:13:21.093Z",
                "clubHistory": [
                    {
                        "year": 2015,
                        "details": "",
                        "_id": "57ef37e1bb9275ba91a02094"
                    },
                    {
                        "year": 2016,
                        "details": "",
                        "_id": "57ef37e1bb9275ba91a02095"
                    }
                ],
                "contactPerson": [
                    {
                        "personName": "",
                        "relationship": "",
                        "contactNumber": "",
                        "email": "",
                        "_id": "57ef37e1bb9275ba91a02093"
                    }
                ],
                "images": [],
                "sessions": [
                    {
                        "startDateTime": "2016-10-22T18:00:00.000Z",
                        "sessionKey": "201610221800U009",
                        "ended": false
                    }]
            }
        };
        return data;
    }
    presentLoading() {
        this.loader = "Present Loading";
    }
    dismissLoading() {
        this.loader = "Dismiss Loading";
    }
    GetAgeGroups(maxAge: number): Observable<any> {
        let age16Records = [
            {
                "_id": "57e21c17144a16ba3103d7c3",
                "ageGroup": "Under 18s",
                "maxAge": 17,
                "__v": 0
            },
            {
                "_id": "584112d7109de69159271945",
                "ageGroup": "Under 18s",
                "maxAge": 17,
                "__v": 0
            }
        ];
        return Observable.of(age16Records);
    }
}

export class AssessmentMock {
    getAll(): Observable<any> {
        let responseList = Observable.of([
            {
                "_id": "58182667827c5c42d832a8f7",
                "note": "",
                "sessionKey": "201610221800U009",
                "coach_id": "4343245",
                "player_id": "123456",
                "__v": 0,
                "isActive": true,
                "modifiedDate": "2016-11-01T05:21:43.260Z",
                "createdDate": "2016-11-01T05:21:43.260Z",
                "assessments": [
                    {
                        "instructions": "kick da ball",
                        "name": "kicking",
                        "_id": "580ec32e059d26a48067f235",
                        "rating": 4
                    },
                    {
                        "instructions": "test da field",
                        "name": "test",
                        "_id": "580de0f99397a24d5af3dc57",
                        "rating": 1
                    },
                    {
                        "name": "Running ",
                        "_id": "5812fdebda43bc092744f51c",
                        "rating": 2
                    },
                    {
                        "name": "endurance",
                        "instructions": "5km cross",
                        "_id": "5817bef19b894232f9805666",
                        "rating": 5
                    }
                ]
            },
            {
                "_id": "581978a9827c5c42d832a8fc",
                "note": "great",
                "sessionKey": "201610281800U009",
                "coach_id": "4343245",
                "player_id": "U16001",
                "__v": 0,
                "position": 11,
                "isActive": true,
                "modifiedDate": "2016-11-04T06:52:43.955Z",
                "createdDate": "2016-11-02T05:24:57.468Z",
                "assessments": [
                    {
                        "instructions": "kick da ball",
                        "name": "kicking",
                        "_id": "580ec32e059d26a48067f235",
                        "rating": 5
                    },
                    {
                        "instructions": "test da field",
                        "name": "test",
                        "_id": "580de0f99397a24d5af3dc57",
                        "rating": 4
                    }
                ]
            }
        ]);
        return responseList;
    }

    getById(assessmentId): Observable<any> {
        let responseList = {
            "_id": "581978a9827c5c42d832a8fc",
            "note": "great",
            "sessionKey": "201610281800U009",
            "coach_id": "4343245",
            "player_id": "U16001",
            "__v": 0,
            "position": 11,
            "isActive": true,
            "modifiedDate": "2016-11-04T06:52:43.955Z",
            "createdDate": "2016-11-02T05:24:57.468Z",
            "assessments": [
                {
                    "instructions": "kick da ball",
                    "name": "kicking",
                    "_id": "580ec32e059d26a48067f235",
                    "rating": 5
                },
                {
                    "instructions": "test da field",
                    "name": "test",
                    "_id": "580de0f99397a24d5af3dc57",
                    "rating": 4
                }
            ]
        };
        return Observable.of(responseList);
    }

    checkExists(assessmentDetails): Observable<any> {
        let responseList = [
            {
                "_id": "581978a9827c5c42d832a8fc",
                "note": "great",
                "sessionKey": "201610281800U009",
                "coach_id": "4343245",
                "player_id": "U16001",
                "__v": 0,
                "position": 11,
                "isActive": true,
                "modifiedDate": "2016-11-04T06:52:43.955Z",
                "createdDate": "2016-11-02T05:24:57.468Z",
                "assessments": [
                    {
                        "instructions": "kick da ball",
                        "name": "kicking",
                        "_id": "580ec32e059d26a48067f235",
                        "rating": 5
                    },
                    {
                        "instructions": "test da field",
                        "name": "test",
                        "_id": "580de0f99397a24d5af3dc57",
                        "rating": 4
                    }
                ]
            },
            {
                "_id": "581979a9827c5c42d832a8fd",
                "note": "grest",
                "sessionKey": "201610281800U009",
                "coach_id": "4343245",
                "player_id": "U16001",
                "__v": 0,
                "isActive": true,
                "modifiedDate": "2016-11-02T05:29:13.852Z",
                "createdDate": "2016-11-02T05:29:13.852Z",
                "assessments": [
                    {
                        "instructions": "kick da ball",
                        "name": "kicking",
                        "_id": "580ec32e059d26a48067f235",
                        "rating": 5
                    },
                    {
                        "instructions": "test da field",
                        "name": "test",
                        "_id": "580de0f99397a24d5af3dc57",
                        "rating": 5
                    }
                ]
            }
        ];
        return Observable.of(responseList);
    }

    NewAssessment(assessment: any): Observable<any> {
        let responseList = { status: true };
        return Observable.of(responseList);
    }

    UpdateAssessment(assessment: any) {
        let responseList = { status: true };
        return Observable.of(responseList);
    }
}
