

<template>
<div class="col">
    <h3 class="display-4 mb-5">Loggbok</h3>
    <div class="col-12 row">
      <div class="col-6 list-group">
        <div class="text-dark text-truncate row ml-1"
        v-for="(student, index) in Students" v-bind:key="student.id">
          <div class="list-group-item list-group-item-action col-4"
          v-bind:class="{'active bg-info' : ActiveStudent == index}"
          v-on:click="chooseStudent(index, student.id, student.profile.name.fullName)">
            {{student.profile.name.fullName}}
          </div>
          <textarea disabled placeholder="Funktion ej klar" class="form-control col-8" id="" cols="2" rows="2" style="resize: none;"></textarea>
        </div>
      </div>
      <div class="col-6 bg-info">
        <div class="container-fluid"
        v-if="!Loading">
          <div class=""
          v-for="post in Logs" v-bind:key="post">
            <p>{{post}}</p>
          </div>
        </div>
        <div v-else>
          <div class="spinner-border m-5" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>



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
      
      ActiveStudent: Number,
      StuID: String,
      Logs : Array,



    }
  },
  computed: {
    ...mapGetters({
      Students : 'classroom/getStudents',

    }),
  },
  methods: {
    chooseStudent: function(index) {
      this.ActiveStudent = index;
      this.StuID = this.Students[index].userId;
      this.fetchPosts(this.StuID);
    },
    fetchPosts: function(id){
      this.Loading = true;
      let vm = this;
      let fetch = new XMLHttpRequest();
      fetch.onreadystatechange = function(resp) {
          let success = (this.readyState == 4 && this.status == 200);
          vm.Loading = false;
          let data = Object;
          try {
            data = JSON.parse(this.response);
            
          } catch (error) {
            
          }
          vm.Logs = data.context;
      };
      fetch.open("POST", "/api/summary", true);
      fetch.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      fetch.setRequestHeader("Content-Type", "application/json");
      fetch.send(JSON.stringify({'id': id}));

    },

  },
  watch: {

  },
  mounted(){    
    
  },
}

</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}

</style>
