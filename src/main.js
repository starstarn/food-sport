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
import Register from "./page/Register";
import Main from "./page/Main";
import Search from "./page/Search";
import My from "./page/My";
/* import FoodClass from "./page/Food-class";
import FoodList from "./page/Food-list";
 */
import WeightJilu from "./page/Weightjilu";
import WeightChart from "./page/Weightchart";
import FoodAnalyse from "./page/Foodanalyse";
// 在入口文件全局引入
import { XHeader, Flexbox, FlexboxItem, XProgress, XButton } from "vux";

import 'amfe-flexible'
// import { Style, ScrollNav } from "cube-ui";

Vue.component("x-button", XButton);
Vue.component("x-progress", XProgress);
Vue.component("flexbox", Flexbox);
Vue.component("flexbox-item", FlexboxItem);
Vue.component("x-header", XHeader);

// Vue.use(ScrollNav);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/search",
    component: Search
  },
  {
    path: "/my",
    component: My
  },
  {
    path: "/weightjilu",
    component: WeightJilu
  },
  {
    path: "/weight-chart",
    component: WeightChart
  },
  {
    path: "/food-analyse",
    component: FoodAnalyse
  },
  /* {
    path: "/food-class",
    component: FoodClass
  },
  {
    path: "/food-list",
    component: FoodList
  }, */
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
