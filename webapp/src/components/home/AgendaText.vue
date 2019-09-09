

<template>
  <div class="form-group">
    <textarea class="form-control" rows="5" style="resize: none;"
    v-model="texts">

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
        Loaded: false,

    }
  },

  watch: {
    //getAgenda(newvalue, oldvalue){
    //},
  },

  computed: {
    giveme: function(){
      return this.$store.state.drf.agenda;
    },
    texts: {
      get() {
        let vm = this;
        let text = this.getAgenda.find(function(element){
          return element.courseID == vm.courseID;
        });
        if (text != undefined) return text.text;
        else return "";
      },
      set(newValue) {
        let vm = this;
        if(this.saveTimer)
          window.clearTimeout(this.saveTimer);
          this.saveTimer = setTimeout(function(){
            let newAgenda = {
              'courseID' : vm.courseID,
              'text': newValue,
            };

            vm.saveAgenda(newAgenda);
          }, 2000);
        },
    },
    ...mapGetters({
      getAgenda: 'drf/getAgenda',

    }),
  },
  methods: {
    ...mapActions({
      saveAgenda: 'drf/updateAgenda',
      loadAgenda: 'drf/fetchAgenda',

    }),
    save: function(value){
      let vm = this;
      if(this.saveTimer){
        window.clearTimeout(this.saveTimer);
      }
      this.saveTimer = setTimeout(function(){
        let newAgenda = {
          'courseID' : vm.courseID,
          'text': newValue,
        };

        vm.saveAgenda(newAgenda);
      }, 2000);
    }
  },

  mounted(){
    this.loadAgenda(this.courseID);
  },
}

</script>

<style>


</style>
