

<template>
<div class="px-0 mx-1">
      <textarea class="form-control" rows="1" cols="60" style="resize: none;"
      placeholder="-"
      v-model="texts">
      </textarea>
</div>
</template>


<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'app',
  components: {
      
  },
  props: {
    submissionID: String,
    studentID: String,
    courseID: String,

  },
  data: function () {
    return {
        Loading: false,
        Failed : false,
        saveTimer : Object,

    }
  },
  computed: {
    ...mapGetters({
      getSubmissionText: 'drf/getSubmissionText',
    }),
    currentCourse: function() {
      return this.$route.params['courseid'];
    },
    texts: {
      get() {
        let vm = this;
        return this.getSubmissionText(vm.submissionID);
      },
      set(newValue) {
        let vm = this;
        if(this.saveTimer)
          window.clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(function(){
            let newComment = {
              sub: vm.submissionID,
              stu: vm.studentID,
              course: vm.courseID,
              text: newValue,
            };
            vm['drf/updateSubmissionComment'](newComment);
            console.log("Saving grade-comment..");
          }, 2000);
        },
    },
  },
  methods: {
    ...mapActions([
      'classroom/fetchSubmissions',
      'drf/fetchSubmissionComment',
      'drf/updateSubmissionComment',

    ]),
    openlink: (url) => {
      window.open(url);
    },
  },
  watch: {

  },
  mounted(){

    let attrs = {
      sub: this.submissionID,
      stu: this.studentID,
      course: this.courseID,
    };

    this['drf/fetchSubmissionComment'](attrs);
  },
}

</script>

<style>


</style>
