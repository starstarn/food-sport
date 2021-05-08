<template lang="">
  <div>
    <flexbox orient="vertical">
      <div class="header1">
        <!-- 头像 -->
        <img class="img1" :src="imgUrl" />
        <!--   昵称 -->
        <span class="call">tiamo</span>
        <!-- 修改个人信息按钮 -->
        <img :src="bj" class="xiugai" @click="update()" />
        <!-- 设置按钮 -->
        <img src="../images/set.png" class="set" @click="set()" />
      </div>
      <div style="margin:40px 0;">
        <group
          title="我的健康资料"
          style="background-color:white; border-radius:10px; padding: 10px 0; width: 330px"
        >
          <cell
            @click.native="basic()"
            title="基本信息"
            style="padding:20px 15px;"
            is-link
          >
            <div class="badge-value">
              <span class="vertical-middle">&nbsp;</span>
            </div>
          </cell>
          <cell title="健康报告" style="padding:20px 15px;" is-link>
            <div class="badge-value">
              <span class="vertical-middle">&nbsp;</span>
            </div>
          </cell>
          <cell title="基本信息" style="padding:20px 15px;" is-link>
            <div class="badge-value">
              <span class="vertical-middle">&nbsp;</span>
            </div>
          </cell>
        </group>
      </div>
    </flexbox>

    <!-- 图标位置 -->
    <van-popup
      v-model="show"
      closeable
      round
      close-icon-position="top-right"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="sel">
        <div @click="jlfood()">
          <img src="../images/food.jpg" />
          <br />
          记饮食
        </div>
        <div @click="jlsport()">
          <img src="../images/sport.jpg" />
          <br />
          记运动
        </div>
        <div @click="jlweight()">
          <img src="../images/weight.jpg" />
          <br />
          记体重
        </div>
        <div @click="jlsleep()">
          <img src="../images/sleep.jpg" />
          <br />
          记睡眠
        </div>
      </div>
    </van-popup>

    <van-tabbar v-model="active" fixed route replace active-color="green">
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/search"
        >发现</van-tabbar-item
      >
      <van-tabbar-item name="plus" icon="plus" @click="add()"></van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">商店</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o" to="/my"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <!-- 弹出记录体重 -->
    <jl-weight v-show="shows"></jl-weight>
  </div>
</template>
<script>
import { Group, Cell } from "vux";
import Vue from "vue";
import { Tabbar, TabbarItem, Icon, Popup } from "vant";
import "vant/lib/index.css";
import "vant/lib/icon/local.css"; //本地
import jlWeight from "../components/Jiluweight";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Popup);

export default {
  components: {
    Group,
    Cell,
    jlWeight
  },
  data() {
    return {
      shows: false,
      show: false,
      active: "home",
      imgUrl: require("../images/mika.jpg"),
      imgs: require("../images/mika.jpg"),
      bj: require("../images/bj.png")
    };
  },
  methods: {
    add() {
      console.log("添加");
      this.show = true;
    },
    jlfood() {
      console.log("记录饮食");
      this.$router.replace("/jilu-food-sport");
    },
    jlsport() {
      this.$router.replace("/add-sport");
    },
    update() {
      this.$router.replace("/my-info");
    },
    basic() {
      this.$router.replace("/user-basic");
    },
    jlweight() {
      // this.$$router.replace("/");
      const user_name = localStorage.getItem("user_name");
      this.shows = !this.shows;
      this.show = !this.show;
    },
    set(){
      console.log("设置");
      this.$router.replace("/set");
    }
  }
};
</script>
<style lang="css" scoped>
.header1 {
  width: 100%;
  height: 180px;
  background-color: rgb(49, 192, 180);
  position: relative;
}
.img1 {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px white solid;
  position: absolute;
  top: 70px;
  left: 28px;
}
.sel div {
  display: inline-block;
  margin: 50px 8px 0 14px;
  font-size: 18px;
}
img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px white solid;
}
.call {
  position: absolute;
  top: 80px;
  left: 108px;
}
.xiugai {
  position: absolute;
  top: 90px;
  left: 180px;
  width: 20px;
  height: 20px;
}
.set {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
}
</style>
