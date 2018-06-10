import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/History'
import history from 'components/history/history'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'history',
    component: history
  },
})

router.start(main, '#app')