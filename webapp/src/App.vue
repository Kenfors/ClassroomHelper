<template>
  <div id="app" class="container-fluid">
    <Header title="Classroom Helper"></Header>
    <div class="container-fluid row">
      <LSide></LSide>
      <Page></Page>
      <RSide></RSide>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import LSide from './components/LSide.vue'
import Page from './components/Page.vue'
import RSide from './components/RSide.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    LSide,
    Page,
    RSide,
    Footer
  }
}

</script>

<style>
#app{

}

</style>
