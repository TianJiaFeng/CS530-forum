import Vue from 'vue'
import Router from 'vue-router'

import main from 'src/Post'
import post from 'components/post/post'
import detail from 'components/post/detail'

Vue.use(Router)

var router = new Router()

router.map({
  '/': {
    name: 'post',
    component: post
  },
   '/post': {
    name: 'post',
    component: post
  },
  '/detail/:postID': {
    name: 'detail',
    component: detail
  },
})

router.start(main, '#app')