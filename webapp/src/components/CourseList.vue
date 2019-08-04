

<template>
<div class="container">
    <div>

    </div>
    <div v-if="Failed">
        ERRRER
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
        GClient : this.$root.$GoogleClient,
        Failed : false,
    }
  },
  computed: {
      
  },
  methods: {
    getCourses: function(){
        var vm = this;

        this.GClient.client.classroom.courses.list({
            pageSize: 20,
        }).then(function(courseQuery){
            vm.Failed = false;
            // eslint-disable-next-line
            console.log(courseQuery.result);

        }, function(error){
            vm.Failed = true;
            // eslint-disable-next-line
            console.log("E:" + error);
        });
    
    },
  },
  watch: {

  },
  mounted(){    
      this.getCourses();
      
  },
}

</script>

<style>
header {
    background-color: transparent !important;
}
.readableText {
    background-color: rgba(255, 185, 145, 0.5);
    text-shadow: 0 0 8px white;
    
}
</style>
