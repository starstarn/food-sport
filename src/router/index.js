import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import SexTall from '@/page/Sex-tall'

Vue.use(Router)

export default new Router({
  routes: [
    /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, */
    {
      path: '/sex-tall',
      component: SexTall
    },
    // { path: "/birthday", component: () => import("pages/Birthday.vue") },
  ]
})
