

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
      <div class="col-3 bg-info">
        <h4>Här samlas loginlägg</h4>
      </div>
      <div class="col-3 bg-info">
        <h4>Här samlas rättning</h4>
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
      ActiveStudent: Number,

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
