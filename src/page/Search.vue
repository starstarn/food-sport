<template lang="">
  <div>
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <!-- <div
      style="width:100%;height:50px;background-color:#4fc08d;position:relative;"
    >
      <label
        ><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use></svg
      ></label>
      <input
        class="sr"
        v-model="value"
        placeholder="请输入搜索关键词"
      
        
        oninput="change"
      />
    </div> -->

    <!--展示数据-->
    <!-- <ul v-for="item in allArea" :key="item.communityId">
      <li v-if="allNewArea.length != 0">{{ item.name }}</li>
      <li v-else>{{ item.name }}</li>
    </ul> -->

    <p>食物推荐榜 <button class="button" @click="more()">更多></button></p>

    <badge
      v-for="item in list"
      :key="item"
      @click.native="look(item)"
      :text="item"
      style="background-color:rgb(241, 242, 243); color:black;padding: 6px;margin: 0 20px;"
    ></badge>

    <!--  <p>大家都在搜</p>
    <badge
      text="鸡蛋"
      style="background-color:rgb(241, 242, 243); color:black;padding: 4px;"
    ></badge> -->

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
        <div @click="jlMood()">
          <img src="../images/sleep.jpg" />
          <br />
          记心情
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
    <toast v-model="show1" type="cancel" >食物不存在！</toast>
  </div>
</template>
<script>
import { Badge, Toast } from "vux";
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
    jlWeight,
    Toast
  },
  data() {
    return {
      list: ["牛奶", "鸡蛋", "苹果"],
      shows: false,
      active: "search",
      show: false,
      imgUrl: require("../images/mika.jpg"),
      imgs: require("../images/mika.jpg"),
      food: [],
      value: null,
      show1: false
    };
  },
  created() {
    this.getAreaDetail();
  },
  /*   mounted() {
    window.addEventListener("touchmove", func, { passive: false });
  }, */
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
    },
    look(item) {
      console.log("查询");
      console.log(item);

      const foodname = {
        name: item
      };

      this.axios({
        method: "post",
        url: "/s_name",
        data: foodname
      })
        .then(res => {
          console.log(res.data);
          this.food.push(res.data);

          this.food.forEach(node => {
            //node.image = require(`../images/${node.image}.jpg`);
            try {
              node.image = require(`../images/${node.image}.jpg`);
            } catch (err) {
              node.image = require(`../images/${node.image}.png`);
            }
          });
          const obj = { ...this.food };
          console.log(obj[0]);
          localStorage.setItem("food", JSON.stringify(obj[0]));
          this.$router.replace("/food-careful");
        })
        .catch(error => {
          console.log(error);
        });
    },
    jlMood() {
      this.$router.replace("/mood");
    },
    onSearch() {
      /* var evt = window.event || e;
      if (evt.keyCode == 13) {
        //回车后要干的业务代码
        
      } */
      console.log(this.value);
      const foodname = {
        name: this.value
      };

      this.axios({
        method: "post",
        url: "/s_name",
        data: foodname
      })
        .then(res => {
          console.log(res.data);
          this.food.push(res.data);

          this.food.forEach(node => {
            //node.image = require(`../images/${node.image}.jpg`);
            try {
              node.image = require(`../images/${node.image}.jpg`);
            } catch (err) {
              node.image = require(`../images/${node.image}.png`);
            }
          });
          const obj = { ...this.food };
          console.log(obj[0]);
          localStorage.setItem("food", JSON.stringify(obj[0]));
          this.$router.replace("/food-careful");
        })
        .catch(error => {
          console.log(error);
          //alert("不存在");
          this.show1 = !this.show1;
        });
    },
    change() {
      console.log(this.value);
    }
    /* getAreaDetail() {
      // 获取数据
      this.axios.post("/foodlist").then(res => {
        console.log(res.data);
        this.allArea = res.data;
        this.allNewArea = res.data;
      });
    } */
    /* autoSearch() {
      // 模糊搜索加节流（500ms触发一次）
      var allowPass = true;
      if (!allowPass) {
        return;
      }
      setTimeout(() => {
        allowPass = false;
        this.allArea = [];
        this.allNewArea.filter(item => {
          if (item.name.indexOf(this.value) !== -1) {
            // 此处也可使用js的 search 方法实现indexOf 一样效果
            this.allArea.push(item);
          }
        });
      }, 500);
      console.log(this.allNewArea);
    } */
  }
};
</script>
<style lang="css" scoped>
.sr {
  width: 93%;
  height: 35px;

  background-color: white;
  border: none;
  border-radius: 20px;
  position: absolute;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: rgb(190, 187, 187);
  /* placeholder字体大小  */
  font-size: 14px;
  /* placeholder位置  */
  text-indent: 30px;
}
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
.icon {
  width: 0.8em;
  height: 0.8em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  position: absolute;
  z-index: 3;
  left: 22px;
  top: 17px;
}
</style>
