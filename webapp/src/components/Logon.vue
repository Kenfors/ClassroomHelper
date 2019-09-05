

<template>
  <div class="container justify-items-center" v-bind:class="{'border rounded border-success' : !LoginStatus}" id="content">
      <div class="container justify-items-center w-100">
        <img v-if="LoginStatus" v-bind:src="UserPicture" class="mx-auto" style="display:block;" alt="Pic">
      </div>
      <h4 class="text-center">{{UserName}}</h4>
      <div v-if="Loading" class="spinner-border m-5" role="status">
          <span class="sr-only">Loading...</span>
      </div>
      <div class="container">
        <button v-if="!LoginStatus && !Loading" v-on:click="signIn" class="btn btn-outline-success m-5" >Logga in</button>
        <button v-if="LoginStatus" v-on:click="signOut" class="btn btn-danger mx-auto " style="display:block;">Logga Ut</button>
      </div>

  </div>
</template>


<script>
/*
var CLIENT_ID = '1045641075151-6fc0n5uqhoobih2v6nqimdv8uub0a9dv.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDNCzSzosDQ00kQH8rd-ObNgRlRDvMdHVE';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];
var SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly ";
SCOPES += " https://www.googleapis.com/auth/classroom.coursework.me.readonly ";
SCOPES += " https://www.googleapis.com/auth/classroom.rosters.readonly ";
SCOPES += " https://www.googleapis.com/auth/classroom.coursework.students.readonly ";
SCOPES += " https://www.googleapis.com/auth/userinfo.email";
*/

import {mapActions} from 'vuex'

export default {
  name: 'app',
  components: {

  },
  data: function () {
    return {
      Loading: false,
      UserName : '',
      UserPicture : '',
      UserID : '',
      AuthInstance : null,

    }
  },
  computed: {
    borderColor: function(){
      if(this.LoginStatus) return 'border-danger';
      return 'border-success';
    },
    LoginStatus : function(){
      return this.$store.getters['auth/isAuthenticated'];
    },
    ...mapActions([
      'auth/signin',
      'auth/signout',

    ]),
  },
  methods: {
/*
    login: function(){
      var vm = this;
      this.Loading = true;
      this.$root.$GoogleClient.load('client:auth2', function() {
          // Ready. Make a call to gapi.auth2.init or some other API

          vm.$root.$GoogleClient.client.load('classroom', 'v1', function(){
            vm.$root.$GoogleClient.auth2.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES 
            }).then(function(){
              
  
  
            }).then(function(){
                vm.$root.$GoogleClient.auth2.getAuthInstance().isSignedIn.listen(function(val){
                  vm.updateSignin(val);
                });
                  vm.updateSignin(vm.$root.$GoogleClient.auth2.getAuthInstance().isSignedIn.get());
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
*/
/*
    updateSignin: function(isSignedIn){

      if (isSignedIn) {
        this.apiLogon(true);
        
      } else {
        this.UserName = '';
        this.$store.dispatch('authenticate', false);

      }
    },
*/
    apiLogon: function(gStatus){
/*
      let fetch = new XMLHttpRequest();
      //let csrfslug = document.getElementsByName('csrfmiddlewaretoken')[0].value;
      let profile = this.$root.$GoogleClient.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      let vm = this;
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
          vm.$store.dispatch('authenticate', resp.success && gStatus);
          vm.$store.dispatch('setUser', authData);
          vm.postLogin();
        }
        else{
          vm.Failed = true;
        }
      };

      fetch.open("POST", "/api/auth/", true);
      fetch.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      fetch.setRequestHeader("Content-Type", "application/json");
      fetch.send(JSON.stringify(authData));
*/
    },

    postLogin: function(){
      this.Loading = false;
      
      let profile = this.$store.getters['auth/profile'];
      this.UserName = profile.getName();
      this.UserPicture = profile.getImageUrl();
      this.UserID = profile.getId();

    },
    signIn: function(){
      this.Loading = true;
      this['auth/signin'];
    },
    signOut: function(){
      this['auth/signout'];
    },
    
  },
  watch: {

  },
  mounted(){
    if(this.LoginStatus)
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
