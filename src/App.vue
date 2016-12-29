<template lang="pug">
  div
    nav.navbar.navbar-light.bg-faded
      a.navbar-brand(href="#") JWT shit
      //- ul.nav.navbar-nav
      //-   li.nav-item.active
      //-     a.nav-link(href="javascript:;") Home
    .container-fluid(style="margin-top: 15px;")
      #app
        home
</template>

<script>
import Home from './components/Home'

export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>
</style>
