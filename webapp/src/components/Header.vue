<template>
  <header class="jumbotron">
    <h1>{{ title }}</h1>

  </header>

</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
