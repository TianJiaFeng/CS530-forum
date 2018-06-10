<template>
  <div class="nav-container">
    <nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0;">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <font color="black">Management system<font>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import serverConfig from 'assets/js/serverConfig.js'
window.serverConfig = serverConfig
export default {
  name: 'header',
  components:{},
  data() {
    return {
    }
  },
  methods: {
  },
  created: function() {
    var vm = this
  }
}
</script>
<style>
.navbar-default {
  background-color: rgba(0, 191, 255, .1);
  border-color: #87CEEB;
}
</style>
