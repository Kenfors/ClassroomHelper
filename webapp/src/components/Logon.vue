

<template>
  <div class="container justify-items-center" v-bind:class="{'border rounded border-success' : !LoginStatus}" id="logoncontent">
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

import {mapActions, mapGetters} from 'vuex'

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
//    LoginStatus : function(){
//      return this['auth/isAuthenticated'];
//    },
    ...mapGetters({
      LoginStatus : 'auth/isAuthenticated',
      
    }),
    ...mapActions([
      'auth/signin',
      'auth/signout',

    ]),
  },
  methods: {

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

#logoncontent {
  margin-top: 1em;
  margin-bottom: 1em;
}

</style>
