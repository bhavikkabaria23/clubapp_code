import { Images } from './images'
export class SessionAssigned {
    sessionKey:string;    
}
export class Coach {
    _id: string;   
    coachName: string;
    birthDate: Date;
    fFANumber: string;
    coachingLicence: string;
    childrenRegistration: string;
    gender: string;
    residentialAddress: string;
    homeNumber: string;
    mobileNumber: string;
    email: string;
    givenName: string;
    familyName: string;
    images: Images[] = [];
    contact1_personName: string;
    contact1_relationship: string;
    contact1_contactNumber: string;
    contact1_email: string;
    previousClub2016: string;
    previousClub2015: string;
    suspensionsDetails: string;

    sessions: SessionAssigned[] = [];
}