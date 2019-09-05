
// eslint-disable-next-line
const GCLIENT = gapi;



export default {

    login: function(context){
        var CLIENT_ID = '1045641075151-6fc0n5uqhoobih2v6nqimdv8uub0a9dv.apps.googleusercontent.com';
        var API_KEY = 'AIzaSyDNCzSzosDQ00kQH8rd-ObNgRlRDvMdHVE';
        var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];
        var SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly ";
        SCOPES += " https://www.googleapis.com/auth/classroom.coursework.me.readonly ";
        SCOPES += " https://www.googleapis.com/auth/classroom.rosters.readonly ";
        SCOPES += " https://www.googleapis.com/auth/classroom.coursework.students.readonly ";
        SCOPES += " https://www.googleapis.com/auth/userinfo.email";

        let vm = this;

        GCLIENT.load('client:auth2', function() {
            // Ready. Make a call to gapi.auth2.init or some other API
            GCLIENT.client.load('classroom', 'v1', function(){
                GCLIENT.auth2.init({
                  apiKey: API_KEY,
                  clientId: CLIENT_ID,
                  discoveryDocs: DISCOVERY_DOCS,
                  scope: SCOPES 
                }).then(function(){
                    GCLIENT.auth2.getAuthInstance().isSignedIn.listen(function(val){
                        vm.updateSignin(context, val);
                    });
                    if(!GCLIENT.auth2.getAuthInstance().isSignedIn.get()){
                        GCLIENT.auth2.getAuthInstance().signIn();
                    }
                    else {
                        vm.updateSignin(context, true);
                    }
                    
              }, function(error){
                // eslint-disable-next-line
                console.log("E:" + error);

              });
            });
        });
    },

    logout: function(context){
        let vm = this;
        GCLIENT.auth2.getAuthInstance().isSignedIn.listen(function(val){
            vm.updateSignin(context, val);
        });
        GCLIENT.auth2.getAuthInstance().signOut();
    },

    updateSignin: (context, isSignedIn) => {
        if (isSignedIn) {
            context.commit('updateLogin', true);
            let fetch = new XMLHttpRequest();
            //let csrfslug = document.getElementsByName('csrfmiddlewaretoken')[0].value;
            let profile = GCLIENT.auth2.getAuthInstance().currentUser.get().getBasicProfile();

            

            let authData = {
            mail : profile.getEmail(),
            ID : profile.getId(),
            name : profile.getName(),
            first : profile.getGivenName(),
            last : profile.getFamilyName(),
            }
    
            fetch.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                let resp = JSON.parse(this.response);
                context.commit('updateLogin', resp.success);
            }

            };
    
            fetch.open("POST", "/api/auth/", true);
            fetch.setRequestHeader("X-Requested-With", "XMLHttpRequest")
            fetch.setRequestHeader("Content-Type", "application/json");
            fetch.send(JSON.stringify(authData));


        } 
        else {
            context.commit('updateLogin', false);
        }
    },


    profile: () => {
        return GCLIENT.auth2.getAuthInstance().currentUser.get().getBasicProfile();
    },

}