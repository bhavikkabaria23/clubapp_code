import {Skill} from './skill';
export class Session {
    sessionKey:string;
    isActive:boolean;    
    selected:boolean;
    ended: boolean;
    startDateTime: any;
    skills: Skill[]
}