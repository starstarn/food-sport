<template lang="">
  <div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
    ></search>
    <!-- <flexbox orient="vertical">
      <flexbox> -->
    <div class="header"></div>
    
    <!-- 卡片 -->
    <div class="card">
      <span class="head">体重管理</span> <span class="danwei">单位：公斤</span>
      <br />
      <div style="position: absolute;left:13%;top:70px;">
        <span class="weight">{{ weight }}</span>
        <br />
        <label>当前</label>
      </div>

      <div style="position: absolute;left:42%;top:38px;text-align:center;">
        <div style="width:70px;height:70px;margin:auto;">
          <x-circle
            :percent="percent"
            :stroke-width="6"
            :trail-width="6"
            :stroke-color="['#36D1DC', '#5B86E5']"
            trail-color="#ececec"
          >
            <span v-if="percent >= 0" style="color:white">{{ percent }}</span>
            <span v-else style="color:white">{{ -percent }}</span>
          </x-circle>
        </div>
        <label v-if="percent >= 0">需减去</label>
        <label v-else>需增重</label>
      </div>

      <div style="position: absolute;right:13%;top:70px;">
        <span class="weight">{{ s_weight }}</span>
        <br />
        <label>目标</label>
      </div>
    </div>

    <!-- 健康记录 -->
    <div class="jilu1">
      <div class="neirong">
        <div style="margin:0 0 5px 3px;">
          <div
            style="width:7px;height:17px;border-radius:5px;background-color:green;display:inline-block;"
          ></div>
          <span class="title">健康记录</span>
        </div>
        <div class="xiang" @click="jilu()">
          <label>饮食&运动</label>
          <br />
          <label
            >还可以吃<span> {{ 2085 }}</span
            >千卡</label
          >
        </div>
        <hr />
        <div class="xiang" @click="jiluweight()">
          <label>体重</label>
          <br />
          <label
            ><span> {{ weight }}</span
            >公斤</label
          >
        </div>
        <hr />
        <div class="xiang">
          <label>心情</label>
          <br />
          <label>：<span> 开心</span></label>
        </div>
        <hr />
      </div>
    </div>

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
      <van-tabbar-item name="search" icon="search" to="/search">发现</van-tabbar-item>
      <van-tabbar-item name="plus" icon="plus" @click="add()"></van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o">商店</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o" to="/my"
        >我的</van-tabbar-item
      >
    </van-tabbar>

    <!-- 弹出 -->
    <div class="toast" v-show="shows">
      <p style="font-size:20px;color:gray;padding:15px 0;">
        <span style="margin:10px 0 0 20px;" @click="close">取消</span>
      </p>
      <Range
        @on-change="Onchange"
        v-model="v_weight"
        :min="30"
        :max="100"
        :range-bar-height="4"
      ></Range>
    </div>

  </div>
</template>
<script>
import { Search, Group, Cell, XCircle, Range } from "vux";
import Vue from "vue";
import { Tabbar, TabbarItem, Popup } from "vant";

Vue.use(Popup);
Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
  components: {
    Search,
    Group,
    Cell,
    XCircle,
    Range
  },
  data() {
    return {
      v_weight: 50,
      shows: false,
      show: false,
      active: "home",
      percent: 80,
      weight: null,
      s_weight: null,
      intake: null,
      imgs: require("../images/mika.jpg")
    };
  },
  created() {
    /* this.axios.get("/foods").then(function(res) {
      console.log(res);
    }); */
    const weight = localStorage.getItem("weight");
    const s_weight = localStorage.getItem("s_weight");
    console.log(weight + s_weight);
    this.weight = weight;
    this.s_weight = s_weight;
    this.percent = this.weight - this.s_weight;
  },
  methods: {
    jilu() {
      this.$router.replace("/jilu-food-sport");
    },
    jiluweight() {
      this.$router.replace("/weightjilu");
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
    },
    close() {
      this.shows = !this.shows;
      // this.num = 1;
    },
    Onchange(v_weight) {
      console.log(v_weight);
    }
  }
};
</script>
<style lang="css" scope>
.header {
  width: 100%;
  height: 200px;
  background-color: rgb(49, 57, 73);
  position: fixed;
  top: 0;
}
.sel div {
  display: inline-block;
  margin: 50px 8px 0 14px;
  font-size: 18px;
}
.sel img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px white solid;
}
.jilu1 {
  width: 94%;
  height: 400px;
  position: absolute;
  margin: 0 auto;
  left: 3%;
  background-color: white;
  border-radius: 8px;
}
.neirong {
  width: 92%;
  height: 350px;
  position: absolute;
  top: 4%;
  left: 4%;
}
.title {
  font-weight: 500;
  font-size: 18px;
}
.xiang {
  width: 100%;
  height: 80px;
}
.xiang label {
  font-size: 14px;
  color: gray;
  margin: 5px 8px;
}
.xiang span {
  color: black;
  font-size: 18px;
}
hr {
  color: rgb(200, 202, 202);
  width: 85%;
}
.card {
  background-color: rgb(127, 197, 185);
  width: 85%;
  height: 155px;
  border-radius: 12px;
  color: white;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  margin-bottom: 10px;
}
.head {
  position: absolute;
  /* left: 0px;
  top: 0px; */
  padding: 4px 7px;
  font-size: 18px;
  font-family: "微软雅黑,宋体";
  border-radius: 10px 0 10px 0;
  border: 1px white solid;
  box-shadow: 1px 1px 1px rgb(126, 168, 168);
}
.danwei {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 14px;
}
.card label {
  font-size: 14px;
}
.weight {
  font-size: 24px;
}
span,
label {
  margin: 0;
  padding: 0;
}
.part {
  color: gray;
}
.part label {
  padding: 20px 0;
}
.vux-cell-bd vux-cell-primary {
  width: 0;
}
.toast {
  width: 100%;
  height: 400px;
  background-color: rgb(168, 199, 226);
  position: fixed;
  top: 300px;
}
</style>
