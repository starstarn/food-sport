// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
//import './assets/icon/iconfont.css'
import './assets/icon//iconfont.js'

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
import Myinfo from "./page/Myinfo";
import Set from "./page/Set";
import Username from "./page/Username";
import Userpassword from "./page/Userpassword";
import Userdeclaration from "./page/Userdeclaration";
import Userbasic from "./page/Userbasic";
import FoodType from "./page/Foodtype";
import FoodList from "./page/Foodlist";
import WeightJilu from "./page/Weightjilu";
import WeightChart from "./page/Weightchart";
import FoodAnalyse from "./page/Foodanalyse";
import FoodSportjilu from "./page/Foodsportjilu";
import Healthreport from "./page/Healthreport";
import Addfood from "./page/Addfood";
import Addsport from "./page/Addsport";
import Makefood from "./page/Makefood";
import MakeSport from "./page/Makesport";
import FoodCareful from "./page/Foodcareful";
import Mood from "./page/Mood";
// 在入口文件全局引入
import { XHeader, Flexbox, FlexboxItem, XProgress, XButton } from "vux";

import "amfe-flexible";

Vue.component("x-button", XButton);
Vue.component("x-progress", XProgress);
Vue.component("flexbox", Flexbox);
Vue.component("flexbox-item", FlexboxItem);
Vue.component("x-header", XHeader);


Vue.prototype.axios = axios;
axios.defaults.baseURL = "/api"; //关键代码
Vue.config.productionTip = false;
Vue.prototype.$EventBus = new Vue();

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
    path: "/food-type",
    component: FoodType
  },
  {
    path: "/food-list",
    component: FoodList
  },
  {
    path: "/food-careful",
    component: FoodCareful
  },
  {
    path: "/my",
    component: My
  },
  {
    path: "/health-report",
    component: Healthreport
  },
  {
    path: "/my-info",
    component: Myinfo
  },
  {
    path: "/user-basic",
    component: Userbasic
  },
  {
    path: "/set",
    component: Set
  },
  {
    path: "/user-name",
    component: Username
  },
  {
    path: "/user-declaration",
    component: Userdeclaration
  },
  {
    path: "/user-password",
    component: Userpassword
  },
  {
    path: "/add-food",
    component: Addfood
  },
  {
    path: "/make-food",
    component: Makefood
  },
  {
    path: "/add-sport",
    component: Addsport
  },
  {
    path: "/weightjilu",
    component: WeightJilu
  },
  {
    path: "/make-sport",
    component: MakeSport
  },
  {
    path: "/weight-chart",
    component: WeightChart
  },
  {
    path: "/food-analyse",
    component: FoodAnalyse
  },
  {
    path: "/jilu-food-sport",
    component: FoodSportjilu
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
  },
  {
    path: "/mood",
    component: Mood
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
