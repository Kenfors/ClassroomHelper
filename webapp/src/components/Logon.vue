

<template>
  <div class="container p-5 justify-items-center" v-bind:class="{'border rounded border-success' : !LoginStatus}" id="content">
      <div class="container align-self-center w-100">
        <img v-if="LoginStatus" v-bind:src="UserPicture" alt="Pic">
      </div>
      <h4>{{UserName}}</h4>
      <div class="container align-self-center">
        <button v-if="!LoginStatus" v-on:click="signIn" class="btn btn-outline-success align-self-center">Logga in</button>
        <button v-if="LoginStatus" v-on:click="signOut" class="btn btn-outline-danger align-self-center">Logga Ut</button>
      </div>
  </div>
</template>


<script>
var CLIENT_ID = '1045641075151-6fc0n5uqhoobih2v6nqimdv8uub0a9dv.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDNCzSzosDQ00kQH8rd-ObNgRlRDvMdHVE';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];
var SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly ";
SCOPES += " https://www.googleapis.com/auth/classroom.coursework.me.readonly ";
SCOPES += " https://www.googleapis.com/auth/classroom.rosters.readonly ";
SCOPES += " https://www.googleapis.com/auth/classroom.coursework.students.readonly ";
SCOPES += " https://www.googleapis.com/auth/userinfo.email";


export default {
  name: 'app',
  components: {

  },
  data: function () {
    return {
      GClient : this.$root.$GoogleClient,
      LoginStatus : this.$root.isAuthenticated,
      UserName : '',
      UserPicture : '',
      UserID : '',

    }
  },
  computed: {
    borderColor: function(){
      if(this.LoginStatus) return 'border-danger';
      return 'border-success';
    },
  },
  methods: {
    login: function(){
      var vm = this;
      vm.GClient.load('client:auth2', function() {
          // Ready. Make a call to gapi.auth2.init or some other API 
          vm.GClient.auth2.init({
              apiKey: API_KEY,
              clientId: CLIENT_ID,
              discoveryDocs: DISCOVERY_DOCS,
              scope: SCOPES 
          }).then(function(){
              vm.GClient.auth2.getAuthInstance().isSignedIn.listen(function(val){
                vm.updateSignin(val);
              });
              vm.updateSignin(vm.GClient.auth2.getAuthInstance().isSignedIn.get());
              
              //document.getElementById('btn-login').onclick = function(){gapi.auth2.getAuthInstance().signIn();};
              //document.getElementById('btn-logout').onclick = function(){gapi.auth2.getAuthInstance().signOut();};

          }, function(error){
            // eslint-disable-next-line
            console.log("E:" + error);
          });
      });
    },
    updateSignin: function(isSignedIn){
      if (isSignedIn) {
        this.$root.isAuthenticated = true;

        let profile = this.GClient.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        this.UserName = profile.getName();
        this.UserPicture = profile.getImageUrl();
        this.UserID = profile.getId();

      } else {
          this.$root.isAuthenticated = false;
          this.UserName = '';

      }
    },
    signIn: function(){
      this.GClient.auth2.getAuthInstance().signIn();
    },
    signOut: function(){
      this.GClient.auth2.getAuthInstance().signOut();
    },
    
  },
  watch: {

  },
  mounted(){
    this.login();
    
  },
}

</script>

<style>

#content {
  margin-top: 1em;
  margin-bottom: 1em;
}


</style>
