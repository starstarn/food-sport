// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import FastClick from "fastclick";
import VueRouter from "vue-router";
import App from "./App";
import Birthday from "./page/Birthday";
import SexTall from "./page/Sex-tall";
import Weight from "./page/Weight";
import Goal from "./page/Goal";
import Finish from "./page/Finish";
import Login from "./page/Login";
// 在入口文件全局引入
import { XHeader, Flexbox, FlexboxItem, XProgress, XButton } from "vux";

Vue.component("x-button", XButton);
Vue.component("x-progress", XProgress);
Vue.component("flexbox", Flexbox);
Vue.component("flexbox-item", FlexboxItem);

Vue.component("x-header", XHeader);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Birthday
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/birthday",
    component: Birthday
  },
  {
    path: "/sex-tall",
    component: SexTall
  },
  {
    path: "/weight",
    component: Weight
  },
  {
    path: "/goal",
    component: Goal
  },
  {
    path: "/finish",
    component: Finish
  }
];

const router = new VueRouter({
  routes
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app-box");
