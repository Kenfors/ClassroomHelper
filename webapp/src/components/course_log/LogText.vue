

<template>
  <div class="container-fluid row">
    <textarea class="form-control col-10" placeholder="Enter text.." cols="2" rows="2" style="resize: none;"
    v-model="text"></textarea>
    <button class="btn btn-outline-secondary col-2"
    v-on:click="submit()">></button>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'logtextarea',
  components: {
      
  },
  props: {
    Student : Object,

  },
  data: function () {
    return {


    }
  },
  computed: {
    textValue : function(){
      return this.$el.children[0].value;

    },
    text: {
      get() {
        return "";
      },
      set(newvalue) {
        
      }
    }
  },
  methods: {
    submit: function() {
      let vm = this;
      let data = {
        stu : this.Student.userId,
        course : this.Student.courseId,
        text : this.$el.children[0].value
      };
      vm['drf/updateSubmissionComment'](data);

    },
    ...mapActions([
      'drf/updateSubmissionComment',

    ]),
  },
  watch: {

  },
  mounted(){    
    
  },
}

</script>

<style>


</style>
