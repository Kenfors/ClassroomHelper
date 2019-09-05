

<template>
  <div class="m-2">
    <div class="container border border-dark">

    Hello!



    </div>
  </div>
</template>


<script>

export default {
  name: 'card',
  components: {
      
  },
  props: {
    course : Object,

  },
  data: function () {
    return {
        GClient : this.$root.$GoogleClient,
        Loading: false,
        Failed : false,

    }
  },
  computed: {
      
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
