

<template>
  <div class="col-4 ">
    <div class="container bg-bleach shadow p-3 mb-5 rounded">
      <h5 class="text-center">{{course.name}}</h5>
      <div class=" mx-1 d-flex justify-content-between">
        <button class="btn btn-outline-dark" 
          v-on:click="openClassroom(course.alternateLink)">
          <i class="material-icons large">local_library</i>
          Classroom
        </button>
        <h3 class="display-5">{{week}}</h3>


      </div>
    <AgendaText v-bind:courseID="course.id">
    </AgendaText>


    </div>
  </div>
</template>


<script>

import {mapActions} from 'vuex'
import AgendaText from './AgendaText.vue'

export default {
  name: 'card',
  components: {
      AgendaText,

  },
  props: {
    course : Object,

  },
  data: function () {
    return {
        Failed : false,
    }
  },
  computed: {
      week: function(){
        let d = new Date();
        let newYear = new Date(d.getYear());
        console.log(newYear);
        return 4;
        //d = new Date(d.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        //let dayNum = d.getUTCDay() || 7;
        //d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        //let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        //return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
      },
  },
  methods: {
    ...mapActions([
      
    ]), 
    setup: function(){
      
    },
    openClassroom: function(url){
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
