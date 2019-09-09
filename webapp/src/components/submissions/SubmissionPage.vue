

<template>
<div class="container-fluid">
    <h3 class="display-3">Inlämningar</h3>
    <p>{{currentCourse}}</p>

    <div class="container-fluid row">
      <div v-for="(work, index) in CourseWork" v-bind:key="work.id">
        <p>{{work.title}}</p>
        <p>{{index}}</p>
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
  data: function () {
    return {
        Loading: false,
        Failed : false,

    }
  },
  computed: {
    ...mapGetters({
      CourseWork : 'classroom/getCourseWorks',
    }),

      currentCourse: function() {
        return this.$route.params['courseid'];
      },
  },
  methods: {
    ...mapActions([
      'classroom/fetchSubmissions'
    ]),

  },
  watch: {
    currentCourse(to, from){
      if(to != undefined && to != from){
        this['classroom/fetchSubmissions'](this.currentCourse);
      }
    }
  },
  mounted(){    
    
  },
}

</script>

<style>


</style>
