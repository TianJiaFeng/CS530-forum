import Vue from 'vue'
import Router from 'vue-router'

import Account from 'src/Account'
import edit from 'components/account/edit'
import content from 'components/account/content'
Vue.use(Router)
var router = new Router()

router.map({
    '/': {
      name: 'content',
      component: content
    },
    '/content': {
      name: 'content',
      component: content
    },
    '/edit/:userID': {
      name: 'edit',
      component: edit
    },
});
router.start(Account, '#app')