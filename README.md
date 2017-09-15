IMP source

Input Mask
--
https://github.com/RobinHerbots/Inputmask
Example and download : http://robinherbots.github.io/Inputmask/
JS : <script src="https://rawgit.com/RobinHerbots/Inputmask/4.x/dist/jquery.inputmask.bundle.js"></script>

Example code
<input class="money" type="text" />   
 $(".money").blur(function () {
            //alert($(this).inputmask('unmaskedvalue'));
            alert($(this).val());
        });
        $(".money").inputmask("currency", {
            'autoUnmask' : true
            //onUnMask: function (maskedValue, unmaskedValue) {
            //    //do something with the value
            //    alert(maskedValue);
            //}
        });


Gofer Pro App
=
> This documented is updated 23 October 2016 - Version 0.0.1 of Gofer Pro

This App is designed for clubs to manage all aspects of sporting activities.


Architecture and Design Goals
--
The App is built on the Ionic Framework and communicates to a Node server connected to MongoDB.  The Location of the development server with Node and MongoDB (both on the same server.

Images are stored and served separately from a different Node/MongoDB server.

####Location of c9 Development Servers
> Node & Mongo Server is at <https://ide.c9.io/robert_leidl/profile-app-dev>   
>Ionic App is at <https://ide.c9.io/robert_leidl/grmfc-club>   
>Image Server is at <https://ide.c9.io/robert_leidl/image-server>

####The endpoints
>API  <https://profile-app-dev-robert-leidl.c9users.io>  
>Images <https://image-server-robert-leidl.c9users.io/>


###Design
####User Roles
The app is designed to cater for Registrations, Players, Coaches, Technical Directors and Administrators.  Hence the system has a user database where roles are assigned as follows:

1. Root User
2. Administrator
3. Technical Director
4. Coach
5. Player

A root user is an Administrator that cannot be deleted or modified by other administrators.  This user is usually manually created and maintained by Gravity Fusion .


##### Administrator
Administrators are users of the system that can add/modify/delete other users in the system.  Administrators have all access to the system and can modify other users's roles.

##### Technical Director
The Technical Director is not able to modify users, but is able to see modify the profiles of Players, and Coaches.  They are also able to create _ASSESSMENT_ skills, and assign Coaches and Players to _SESSIONS_.

Technical Directors are able to view all the assessments in real time.  As coaches assess players, they should be able to see how players rank.

##### Coach
Coaches can only modify their own profile, and can view players that have been assigned to them for assessment.  The have the ability to rate players via skill assessment that was setup by the Technical Director.

Multiple coaches can assess the same player - but only use the skills assigned by the Technical Director.

##### Player
A player is recorded as they attend a trial session.  The are created by Administrators from registration records.  At this time, there is no need for a player to use the app, but in the near future (as requirements are capture) they will have App features open to them.

###Parts of the Application
1. User Administration
2. Player Registration
2. Player Profiles
3. Coach Profiles
4. Sessions
5. Skill

####User Administration
Users and their roles are to be entered into the system.  This is initially done by the ***root user***.  The roles specified 
####Player Registration
Players can register themselves for trial using the registration system.  The app lists all the registrations and the registration records are used to create the player records once the registrant comes to the trial.  The registration record has a unique ID of 5 characters.
####Player Profiles
Player Profiles are created from the registration record.  When a player record is created a unique Player ID is created, made up of the age group and an auto generated sequential number.  For instance ```U9004```.
A photo is taken at the time of the player record being created.  The player is identified by the Player ID, player name and the Photo.
####Coach Profiles
Coach records are imported manually.  The records can be modified by Administrators or Technical Directors. The unique identifier for a coach is their FFANumber.  Photos of the coaches are taken at trials, and are stored with the profile record. 
####Sessions
A technical directors creates session records that specify the date, time and age group.  The format of a session key is *YYYYMMMDDDHHMMAG* where *AG* is the age group.  And example key would be ```201610231800U09``` which translates to 23 October 2016, at 18:00 for Under 9s.
####Skill
A technical director creates skills that will be used in sessions to test players.  A skill will have a unique skill name and a description.
Different skills can be associated with different sessions.

Trial Session Process
-
The steps for trial sessions are

1. ***Coaches*** are manually entered into the system.  They are identified by their ***FFANumber***.
1. A potential player registers themselves and a ***registration*** record is captured.
2. A ***technical director*** creates ***session*** records that specify the date, time and age group.  The format of a ***session*** key is *YYYYMMMDDDHHMMAG* where *AG* is the ***age group***.  And example key would be ```201610231800U09``` which translates to 23 October 2016, at 18:00 for Under 9s.
3. A ***technical director*** creates ***skills*** that will be used in ***sessions*** to test ***players***.  A ***skill*** will have a unique ***skill name*** and a ***description***.
4. Different ***skills*** can be associated with different ***sessions***.
5. A ***technical director*** assigns ***coaches*** to sessions.
6. ***Coach***es turn up for the session trial, and is marked as ***available to assess***. If their ***photo*** has not already been taken, the the ***administrator*** takes a photo of the ***coach***.
2. The potential player turns up for trial and a ***photo*** is captured and the ***registration*** data is used to create a ***player*** record.  The ***player*** record has a unique ***player_id*** assigned to it.
3. The ***administrator*** assigns the ***player*** to a ***session***.
5. The ***player*** goes to the area on the field where the trial ***session*** is happening.
6. The ***coach***s that is running the ***session*** can assess the ***players*** that have been assigned to the ***session***.  The ***coach*** should be able to select a ***player*** from the system and start grading the ***player*** on the ***skill***s that have been set in the ***session*** by the ***technical director***. 
7. When the ***coach*** finishes assessing the ***player***, the ***player*** may need to be ***assessed*** by a different ***coach*** during the ***session***.  Multiple ***coach***es can assess the same ***player***.
8. Data from the all the ***assessment***s from all of the ***session***s should be viewed by the ***Technical Director*** as the ***assessment***s are happening.  
9. An ***assessment*** report can be generated by the ***Technical Director***.





=======
##### Existing users for Testing
Ionic app for club
For testing ...  
The root user is 111111/test@123
The administrator is 222222/test@123
The coach is 333333/test@123
The coach is 56789123/test@123
The technical director is 444444/test@123

