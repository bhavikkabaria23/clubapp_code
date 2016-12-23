import {Coach} from './coach'
export class SessionAssigned {
    sessionKey:string;    
}
import {Images} from './images'
export class Player {
    _id: string;
    dateOfApplication: Date;
    playerID: string;
    playerName: string;
    givenName: string;
    familyName: string;
    fFANumber: string;
    birthDate: Date;
    ageGroup: string;
    preferredPlayingPosition: number;
    preferredPlayingPositionText: string;
    gender: string;
    objectivesAmbitions: string;
    images: Images[] = [];
    residentialAddress: string;
    homeNumber: string;
    mobileNumber: string;
    email: string;    
    assessedCoaches: Coach[] = [];
    sessions: SessionAssigned[] = [];
    sessionKey: string;

    contact1_personName: string;
    contact1_relationship: string;
    contact1_contactNumber: string;
    contact1_email: string;

    contact2_personName: string;
    contact2_relationship: string;
    contact2_contactNumber: string;
    contact2_email: string;

    schoolDetails: string;
    employementDetails: string;

    previousClub2016: string;
    previousClub2015: string;
    suspensionsDetails: string;
    injuriesDetails: string;

    headCoachName: string;
    contactDetails: string;
    academicSessionPerWeekCount: number;
    arrangedBy: string;
    destination: string;
    purposeOfTrip: string;
}