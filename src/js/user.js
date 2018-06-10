import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/User'
import edit from 'components/user/edit'
import user from 'components/user/user'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'user',
    component: user
  },
  '/user': {
    name: 'user',
    component: user
  },
  '/edit/:userID': {
    name: 'edit',
    component: edit
  },
})

router.start(main, '#app')