<template>
  <div class="navbar-default sidebar" role="navigation">
    <ul class="nav" id="menuFirst">
      <li v-for="bar of category">
        <a :href="path+bar.link" :class="{'active': bar.id==currentLink}">{{bar.txt}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import serverConfig from 'assets/js/serverConfig.js'
  window.path = serverConfig.urlConfig
  export default {
    data() {
      return {
        serverConfig: window.serverConfig,
        url: '',
        path: window.path,
        category: [],
        currentLink:'',
      }
    },
    created: function() {
      var vm = this
      let url = window.location.href
      let urlCut = url.substr(0, url.indexOf('.html'))
      let pageName = urlCut.substr(urlCut.lastIndexOf('/') + 1)
      if (url.indexOf('action=') != -1) {
        pageName = urlCut.substr(urlCut.lastIndexOf('=') + 1)
      }
      vm.currentLink = pageName
      // getBar
      $.post(serverConfig.serverApi + 'Bar/getAccountBar', {}, function(result) {
        if (result.code == 0) {
          vm.category = result.data
        }
      })
    },
  }
</script>

<style scoped>
.nav {
  width: 200px;
  vertical-align: top;
}
.nav>li>a:focus, .nav>li>a:hover {
  background-color: rgba(0, 191, 255, .1);
  color: #87CEEB;
}
.nav>li>a {
    color: #000000;
  }

.sidebar {
  position: absolute;
  /*width: 0;*/
  top: 0px;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 191, 255, .1);
}

/*.navbar {
  margin-bottom: 0;
}*/

/*.show-bar {
  padding-left: 200px;
  z-index: 99;
}*/

.show-bar .sidebar {
  width: 200px;
  display: block;
}

.sidebar{
  padding-right: 0;
  padding-left: 0;
}

.sidebar ul li a.active {
  background-color: rgba(0, 191, 255, .1);
}

/*.sidebar ul>li {
  margin-top: 0;
}*/
</style>
