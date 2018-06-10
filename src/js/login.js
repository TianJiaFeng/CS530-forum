import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/Login'
import login from 'components/login/login'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'login',
    component: login
  },
})

router.start(main, '#app')