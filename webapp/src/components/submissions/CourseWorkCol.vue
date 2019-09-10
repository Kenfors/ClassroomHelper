

<template>
<div class="px-0 mx-1 hoverable"
  v-bind:class="{'col-1': !Expanded, 'col-7' : Expanded}">
  <p class="text-truncate break-word "><b>{{courseTitle}}</b></p>
  <div style="min-height: 40px; max-height: 40px;"
  class="container-fluid d-flex my-1 p-0"
  v-for="sub in Submissions[index]" v-bind:key="sub.id">
    <div class="p-0 m-0"
    v-on:click="toggle"
    v-bind:class="{
      'col-12': !Expanded, 
      'col-2' : Expanded,
      'bg-NTI' : sub.state == 'NEW' || sub.state == 'SUBMISSION_STATE_UNSPECIFIED',
      'bg-danger' : sub.state == 'CREATED' ,
      'bg-success' : sub.state == 'TURNED_IN',
      'bg-warning' : sub.state == 'RETURNED' || sub.state == 'RECLAIMED_BY_STUDENT'
    }" 
    style="min-height: 40px; max-height: 40px;">
    </div>
    <div v-if="Expanded" class="col-10 p-0 m-0 bg-light d-flex"
    style="min-height: 40px; max-height: 40px;">
      <button class="btn btn-outline-dark mx-2"
      v-on:click="openlink(sub.alternateLink)">
        <i class="material-icons">local_library</i>
      </button>
      <textarea disabled name="" id="" cols="70" rows="2"
      placeholder="Funktion ej färdig">

      </textarea>

    </div>
  </div>
</div>
</template>


<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
      
  },
  props: {
    courseTitle : String,
    index : Number,


  },
  data: function () {
    return {
        Loading: false,
        Failed : false,
        Expanded : false,


    }
  },
  computed: {
    ...mapGetters({
      CourseWork : 'classroom/getCourseWorks',
      Submissions :'classroom/getSubmissions',

    }),
    currentCourse: function() {
      return this.$route.params['courseid'];
    },

  },
  methods: {
    ...mapActions([
      'classroom/fetchSubmissions'
    ]),
    toggle: function() {
      this.Expanded = !this.Expanded;
    },
    openlink: (url) => {
      window.open(url);
    },
  },
  watch: {

  },
  mounted(){    
    
  },
}

</script>

<style>


</style>
