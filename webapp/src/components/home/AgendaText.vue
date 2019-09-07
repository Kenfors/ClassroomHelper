

<template>
  <div class="input-group">
    <textarea 
      class="form-control" cols="20" rows="10"
      style="resize: none;"
      v-model="texts"
    >
    </textarea>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'card',
  components: {
      
  },
  props: {
    courseID : String,
  },
  data: function () {
    return {
        Failed : false,
        saveTimer: Object,
    }
  },
  computed: {
    texts: {
      get: function() {
        return this.$store['drf/getAgenda'];
      },
      set: function() {
        if(this.saveTimer)
          window.clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(function(){
          console.log("write..")
        }, 2000);
      }
    },
  },
  methods: {
    setup: function(){
      
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
