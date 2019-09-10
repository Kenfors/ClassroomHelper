/* eslint-disable */


export var isAuthenticated = false;

export function initAuth() {
    
    var CLIENT_ID = '1045641075151-6fc0n5uqhoobih2v6nqimdv8uub0a9dv.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyDNCzSzosDQ00kQH8rd-ObNgRlRDvMdHVE';
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];
    var SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly ";
    SCOPES += " https://www.googleapis.com/auth/classroom.coursework.me.readonly ";
    SCOPES += " https://www.googleapis.com/auth/classroom.rosters.readonly ";
    SCOPES += " https://www.googleapis.com/auth/classroom.coursework.students.readonly ";
    SCOPES += " https://www.googleapis.com/auth/userinfo.email";

    gapi.load('client:auth2', function() {
        // Ready. Make a call to gapi.auth2.init or some other API 
        gapi.auth2.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES 
        }).then(function(){

            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            //document.getElementById('btn-login').onclick = function(){gapi.auth2.getAuthInstance().signIn();};
            //document.getElementById('btn-logout').onclick = function(){gapi.auth2.getAuthInstance().signOut();};

        }, function(error){

        });
    });
}

export function GAPIlogin(){
    gapi.auth2.getAuthInstance().signIn();
}

export function GAPIlogout(){
    gapi.auth2.getAuthInstance().signOut();
}

export function logonStatus(){
    if(!gapi) return false;
    if(!gapi.auth2) return false;
    if (!gapi.auth2.getAuthInstance) return false;

    return gapi.auth2.getAuthInstance().isSignedIn.get();
}

function updateSigninStatus(isSignedIn) {
    isAuthenticated = isSignedIn;
    if (isSignedIn) {
//        this.$emit('logon', true);
        console.log("Signed in.");
        
        //document.getElementById('btn-login').style.display = 'none';
        //document.getElementById('btn-logout').style.display = 'block';

    } else {
        console.log("Signed Out.");
        //document.getElementById('btn-login').style.display = 'block';
        //document.getElementById('btn-logout').style.display = 'none';
    }
}
