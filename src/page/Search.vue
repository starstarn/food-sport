<template lang="">
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
    <p>食物推荐榜 <button class="button" @click="more()">更多></button></p>

    <badge
      text="水果"
      style="background-color:rgb(241, 242, 243); color:black;padding: 4px;"
    ></badge>

    <p>大家都在搜</p>
    <badge
      text="鸡蛋"
      style="background-color:rgb(241, 242, 243); color:black;padding: 4px;"
    ></badge>

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
          <img :src="imgs" />
          <br />
          记饮食
        </div>
        <div @click="jlsport()">
          <img :src="imgs" />
          <br />
          记运动
        </div>
        <div @click="jlweight()">
          <img :src="imgs" />
          <br />
          记体重
        </div>
        <div @click="jlsleep()">
          <img :src="imgs" />
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
    <jl-weight  v-show="shows"></jl-weight>
  </div>
</template>
<script>
import { Badge } from "vux";
import Vue from "vue";
import { Search, Tabbar, TabbarItem, Icon, Popup } from "vant";
import "vant/lib/index.css";
import "vant/lib/icon/local.css"; //本地
import jlWeight from "../components/Jiluweight";

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Popup);

Vue.use(Search);

export default {
  components: {
    Badge,
    jlWeight
  },
  data() {
    return {
      shows: false,
      active: "search",
      show: false,
      imgUrl: require("../images/mika.jpg"),
      imgs: require("../images/mika.jpg")
    };
  },

  methods: {
    more() {
      console.log("更多");
      this.$router.replace("/food-type");
    },
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
    jlweight() {
      // this.$$router.replace("/");
      const user_name = localStorage.getItem("user_name");
      this.shows = !this.shows;
      this.show = !this.show;
    }
  }
};
</script>
<style lang="css" scoped>
.button {
  background-color: white;
  font-size: 14px;
  color: gray;
  border: none;
  float: right;
  margin-right: 10px;
}
.in {
  color: rgb(241, 242, 243);
}
body {
  background-color: white;
}
p {
  margin: 20px 0;
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
</style>
