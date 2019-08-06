

<template>
  <div class="container justify-items-center" v-bind:class="{'border rounded border-success' : !LoginStatus}" id="content">
      <div class="container align-self-center w-100">
        <img v-if="LoginStatus" v-bind:src="UserPicture" alt="Pic">
      </div>
      <h4>{{UserName}}</h4>
      <div v-if="Loading" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
      </div>
        <button v-if="!LoginStatus && !Loading" v-on:click="signIn" class="btn btn-outline-success align-self-center m-5">Logga in</button>
        <button v-if="LoginStatus" v-on:click="signOut" class="btn btn-danger align-self-center">Logga Ut</button>

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
      Loading: false,
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
      this.Loading = true;
      vm.GClient.load('client:auth2', function() {
          // Ready. Make a call to gapi.auth2.init or some other API

          vm.GClient.client.load('classroom', 'v1', function(){
            vm.GClient.auth2.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES 
            }).then(function(){
              
  
  
            }).then(function(){
                vm.GClient.auth2.getAuthInstance().isSignedIn.listen(function(val){
                  vm.updateSignin(val);
                });
                vm.updateSignin(vm.GClient.auth2.getAuthInstance().isSignedIn.get());
                vm.Loading = false;
                //document.getElementById('btn-login').onclick = function(){gapi.auth2.getAuthInstance().signIn();};
                //document.getElementById('btn-logout').onclick = function(){gapi.auth2.getAuthInstance().signOut();};
  
            }, function(error){
              // eslint-disable-next-line
              console.log("E:" + error);
              vm.Loading = false;
            });

        });
      });
    },
    updateSignin: function(isSignedIn){
      if (isSignedIn) {
        this.$root.isAuthenticated = true;
        
      } else {
          this.$root.isAuthenticated = false;
          this.UserName = '';

      }
    },
    postLogin: function(){
        let profile = this.GClient.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        this.UserName = profile.getName();
        this.UserPicture = profile.getImageUrl();
        this.UserID = profile.getId();

        /*
        this.GClient.client.classroom.courses.list({
          pageSize: 10,
        }).then(function(answer){
            console.log(answer.result);
        });
        */

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
    if(!this.LoginStatus)
      this.login();
    else
      this.postLogin();
    
  },
}

</script>

<style>

#content {
  margin-top: 1em;
  margin-bottom: 1em;
}


</style>
