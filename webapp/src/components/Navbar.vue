

<template>
<div class="row">
  <div class="col-2 bg-dark">

  </div>
  <div class="col-10 bg-dark text-white">
    <nav class="nav py-1 btn-group btn-group-lg">
        
        <button class="btn btn-outline-light mx-2" v-on:click="redirect('home',1)" v-bind:class="{'active' : activeBar==1}">
        <img src="../assets/icon-home.svg" class="d-inline-block align-top" alt="">
        Hem</button>
        <button class="btn btn-outline-light mx-2" v-on:click="redirect('submissions',2)" v-bind:class="{'active' : activeBar==2}">
        <img src="../assets/icon-book.svg" class="d-inline-block align-top" alt="">
        Kursöversikt</button>
        <button class="btn btn-outline-light mx-2" v-on:click="redirect('feedback',3)" v-bind:class="{'active' : activeBar==3}">
        <img src="../assets/icon-star.svg" class="d-inline-block align-top" alt="">
        Loggbok</button>
    </nav>
  </div>
</div>
</template>

<script>

export default {
  name: 'app',
  components: {
      
  },
  data: function () {
    return {
      activeBar : -1,

    }
  },
  computed: {
      
  },
  methods: {
    
    redirect: function(urlPath, activeIndex){
      var vm = this;
      let cid = '?';
      if(this.$root.CurrentCourse){
        cid = this.$root.CurrentCourse.id;
      }

      this.$root.$router.push({name: urlPath, params:{ courseid: cid}},
      function(){
        //Complete
        vm.activeBar = activeIndex;
        // eslint-disable-next-line
        console.log("Route Success..");

      },
      function(){
        //Failed
        // eslint-disable-next-line
        console.log("Route Failed..");
      });
    },
  },
  watch: {

  },
  mounted(){    
      if(this.$route.name == 'home')
        this.activeBar = 1;
      if(this.$route.name == 'submissions')
        this.activeBar = 2;
      if(this.$route.name == 'feedback')
        this.activeBar = 3;
  },
}

</script>

<style>


</style>
