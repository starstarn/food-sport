<template lang="">
  <div>
    <!-- 搜索框样式 -->

    <div class="header">
      <div class="search1" @click="serarch1()">
        <icon type="search"></icon>搜索
      </div>
    </div>

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
            >还可以吃<span> {{ kaluli }}</span
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

    <!-- 弹出记录体重-->
    <div class="toast" v-show="shows">
      <p style="font-size:20px;color:gray;padding:15px 0;">
        <span style="margin:10px 0 0 20px;" @click="close">取消</span>
        <span style="margin:10px 0 0 100px;color:black;">今天</span>
        <span style="margin:10px 0 0 100px;" @click="xiugai()">确定</span>
      </p>
      <h4 style=" text-align: center">体重</h4>
      <inline-x-number
        v-model="u_weight"
        @on-change="changeWeight()"
        width="60px"
        :min="30"
        style="text-align: center;"
      ></inline-x-number>
    </div>
  </div>
</template>
<script>
import { Search, Group, Cell, XCircle, InlineXNumber, Icon } from "vux";
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
    InlineXNumber,
    Icon
  },
  data() {
    return {
      // v_weight: 50,
      shows: false,
      show: false,
      active: "home",
      percent: 0,
      weight: null,
      s_weight: null,
      intake: null,
      imgs: require("../images/mika.jpg"),
      u_weight: null,
      kaluli: null,
      time: null,
      username: null,
      info_weight: null
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
    this.u_weight = this.weight;
    const u_name = localStorage.getItem("user_name");
    this.username = u_name;
    const user_name = {
      user_name: u_name
    };

    this.axios({
      method: "post",
      url: "/user/sel_user",
      data: user_name
    })
      .then(res => {
        console.log(res);
        this.kaluli = res.data.kll;
        this.weight = res.data.weight;
        this.u_weight = this.weight;
        this.s_weight = res.data.s_weight;
        this.percent = this.weight - this.s_weight;
        localStorage.setItem("weight", this.weight);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    serarch1() {
      this.$router.replace("/search");
    },
    changeWeight() {
      console.log(this.u_weight);
    },
    xiugai() {
      console.log("修改体重");
      console.log(this.u_weight);
      const user_name = localStorage.getItem("user_name");
      const name_weight = {
        user_name: user_name,
        weight: this.u_weight
      };
      this.axios({
        method: "post",
        url: "/user/update_weight",
        data: name_weight
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });

      //查找体重表
      var data = new Date();
      this.month =
        data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
      this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
      this.time = data.getFullYear() + "-" + this.month + "-" + this.day;
      console.log(this.time); //2021-05-01
      const time_name = {
        time: this.time,
        user_name: this.username
      };
      this.axios({
        method: "post",
        url: "/sel_tweight",
        data: time_name
      })
        .then(res => {
          console.log(res.data);
          this.info_weight = res.data;
        })
        .catch(error => {
          console.log(error);
        });

      const u_infoweight = {
        time: this.time,
        user_name: this.username,
        t_weight: this.u_weight
      };

      if (this.info_weight === null) {
        this.axios({
          method: "post",
          url: "/add_weight",
          data: u_infoweight
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.axios({
          method: "post",
          url: "/update_tweight",
          data: u_infoweight
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.shows = !this.shows;
      location.reload();
    },
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
      this.shows = !this.shows;
      this.show = !this.show;
    },
    close() {
      this.shows = !this.shows;
    }
  }
};
</script>
<style lang="css" scope>
.search1 {
  width: 94%;
  height: 40px;
  line-height: 40px;
  border-radius: 3px;
  background-color: white;
  margin: 10px auto;
  z-index: 3;
  text-align: center;
  font-size: 16px;
  color: gray;
}
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
  width: 100%;
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
  margin-top: 70px;
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
