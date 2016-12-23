
export class message {
    public static alert_title: string = "Registration";
    public static alert_update_title: string = "Player Details";
    public static alert_message: string = "Registration sent.";
    public static alert_update_message: string = "Player details updated successfully.";
    public static alert_ok: string = "OK";
    public static confirm_title: string = "Agreement on submission";
    public static confirm_message: string = "Agreement message";
    public static accept_button: string = "Accept";
    public static cancel_button: string = "Cancel";
    public static invalid_alert_title: string = "Incomplete Form";
    public static email_exist: string = "Player email address is already exist.";
    public static alert_signin_title: string = "Sign In";
    public static alert_skill_title: string = "Skill";
    public static alert_assessment_title: string = "Assessment";
    public static alert_incomplete: string = "incomplete details";
    public static alert_signin_invalid: string = "Please check your credentials!";
    public static session_exist: string = "Session is already exist.";
    public static session_invalid: string = "session is not valid.";
    public static ffa_exist: string = "FFANumber is already exist.";
}

export class url {
    public static apiUrl: string = "https://profile-app-dev-robert-leidl.c9users.io/";
    public static apiImageManagerUrl: string = "https://image-server-robert-leidl.c9users.io/";
    public static defaultImagePath: string = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAAHCCAYAAAB8GMlFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDFERDFDNUE5NUMzMTFFNjkzMzlBRkJFOUQ0QkU1OUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDFERDFDNUI5NUMzMTFFNjkzMzlBRkJFOUQ0QkU1OUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MUREMUM1ODk1QzMxMUU2OTMzOUFGQkU5RDRCRTU5RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MUREMUM1OTk1QzMxMUU2OTMzOUFGQkU5RDRCRTU5RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpQzDGwAADzSSURBVHja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";
}

export class cloudinary {
    public static UPLOAD_PRESET: string = 't8innunp';
    public static API_URL: string = 'https://api.cloudinary.com/v1_1/lwve0xa7a/image/upload';
}

export class common {
    static getPreferredPlayingPosition(position) {
        switch (position) {         
            case 1:
                return "Attack: #7, #9, #11";
            case 2:
                return "Midfield: #6, #8, #10";
            case 3:
                return "Defence: #2, #3, #4, #5";
            case 4:
                return "Goal Keeper: #1";
            default:
                "No Position";
                break;
        }
    }
    static getProposedPosition(position) {
        switch (position) {
            case 1:
                return "#1 : Goal Keeper";
            case 2:
                return "#2 : Defence";
            case 3:
                return "#3 : Defence";
            case 4:
                return "#4 : Defence";
            case 5:
                return "#5 : Defence";
            case 6:
                return "#6 : Midfield";
            case 7:
                return "#7 : Attack";
            case 8:
                return "#8 : Midfield";
            case 9:
                return "#9 : Attack";
            case 10:
                return "#10 : Midfield";
            case 11:
                return "#11 : Attack";
            default:
                "No Position";
                break;            
        }
    }
}



