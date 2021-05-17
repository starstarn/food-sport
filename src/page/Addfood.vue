<template lang="">
  <div>
    <!-- <x-header
      v-if="type == '早饭'"
      style="background-color:green; color:white;"
      title="添加早餐"
    ></x-header>
    <x-header
      v-else-if="type == '午饭'"
      style="background-color:green; color:white;"
      title="添加午饭"
    ></x-header>
    <x-header
      v-else
      style="background-color:green; color:white;"
      title="添加晚饭"
    ></x-header> -->

    <div
      v-if="type == '早饭'"
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">添加早餐</span>
    </div>

    <div
      v-else-if="type == '午饭'"
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">添加午餐</span>
    </div>

    <div
      v-else
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">添加晚餐</span>
    </div>

    <van-tabs
      v-model="activeName"
      type="line"
      title-active-color="black"
      title-inactive-color="gray"
      line-width="50px"
      line-height="8px"
      color="#144a9e"
    >
      <van-tab title="常见" name="a">
        <div>
          <hr />
          <div v-for="item in foodlist" :key="item" @click="add(item)">
            <li>
              <!-- <img class="img_food" src="../images/egg.jpg" /> -->
              <img class="img_food" :src="require(`${item.image}`)" />

              <span
                style="font-size:16px;position:absolute;left:78px;top:15px;"
                >{{ item.name }}</span
              >
              <span
                style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
                ><span style="color:red;">{{ item.rl }}</span
                >千卡/100{{ item.danwei }}</span
              >
              <div
                style="display:inline-block; background-color:green;width:10px;height:10px;border-radius:50%;position:absolute;top:35px;right:20px;"
              ></div>
            </li>
            <hr />
          </div>
        </div>
      </van-tab>
      <van-tab title="自定义" name="b">
        <div @click="makeFood()">
          <van-icon
            name="plus"
            color="#1989fa"
            style="margin:20px;"
          />添加自定义食物
        </div>
        <div v-for="item in ufoodlist" :key="item" @click="add(item)">
          <li>
            <img class="img_food" src="../images/set_food.jpg" />

            <span
              style="font-size:16px;position:absolute;left:78px;top:15px;"
              >{{ item.name }}</span
            >
            <span
              style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
              ><span style="color:red;">{{ item.rl }}</span
              >千卡/100{{ item.danwei }}</span
            >
            <img :src="shanChu" class="delete" @click="deleteFood()" />
          </li>
          <hr />
        </div>
      </van-tab>
    </van-tabs>
    <!-- 弹出 -->
    <div class="toast" v-show="show">
      <p style="font-size:20px;color:gray;padding:15px 0;">
        <span style="margin:10px 0 0 20px;" @click="close">取消</span>
        <span style="margin:10px 0 0 50px;"
          >{{ month }}月{{ day }}日/{{ type }}</span
        >
        <span style="margin:10px 20px 0 55px;" @click="finFood()">确认</span>
      </p>
      <div style="margin:20px 0;">
        <div>
          <li>
            <img class="img_food" :src="imgUrl" />

            <span
              style="font-size:16px;position:absolute;left:78px;top:15px;"
              >{{ addfood.name }}</span
            >
            <span
              style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
              ><span style="color:red;">{{ addfood.rl }}</span
              >千卡/100{{ addfood.danwei }}</span
            >
          </li>
          <hr />
        </div>
      </div>

      <div>
        <br />
        <!-- 数量选择 -->
        <div>
          <div style="text-align:center;">
            <p style="font-size:16px;color:gray;margin:0 0 5px 0;">
              {{ reliang }}千卡
            </p>
            <p style="font-size:16px;color:gray;margin:0 0 20px 0;">
              {{ tiji }}克
            </p>
            <inline-x-number
              v-model="num"
              @on-change="changeNum()"
              width="60px"
              :min="1"
            ></inline-x-number>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车 -->
    <div class="footer">
      <span style="margin-left:10px;" @click="look()"
        >食物<badge :text="s_num"></badge
      ></span>
      <x-button
        @click.native="addFood()"
        text="完成"
        type="primary"
        style="display:inline; border-radius:99px; width:250px;margin-left:22px; "
      ></x-button>
    </div>
  </div>
</template>
<script>
import {
  Search,
  Badge,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem,
  InlineXNumber
} from "vux";
import Vue from "vue";
import { Tab, Tabs, Icon } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);

const list = () => ["常见", "自定义"];
export default {
  components: {
    Search,
    Badge,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    InlineXNumber
  },
  data() {
    return {
      activeName: "a",
      list2: list(),
      foodlist: null,
      demoDisabled: "A",
      index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      // imgUrl: require("../images/mika.jpg"),
      imgUrl: require("../images/mika.jpg"),
      shanChu: require("../images/shanchu.png"),
      addfood: {
        danwei: "克",
        name: "午餐肉",
        rl: "366"
      },
      show: false,
      num: 1,
      foodname: null,
      ufoodlist: null,
      reliang: 0,
      tiji: 0,
      type: null,
      time: null,
      month: null,
      day: null,
      food: null,
      s_num: 0,
      fh: require("../images/return.png")
    };
  },
  created() {
    this.axios.post("/foodlist").then(res => {
      console.log(res.data);
      this.foodlist = res.data;
      console.log(this.foodlist);
      const type = localStorage.getItem("type");
      this.type = type;
      console.log(this.type);

      var data = new Date();
      this.month =
        data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
      this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
      this.time = data.getFullYear() + "-" + this.month + "-" + this.day;
      console.log(this.time); //2021-05-01
    });

    const u_name = localStorage.getItem("user_name");
    const user_name = {
      user_name: u_name
    };
    this.axios({
      method: "post",
      url: "/s_makefood",
      data: user_name
    }).then(res => {
      console.log(res.data);
      this.ufoodlist = res.data;
    });
  },
  methods: {
    onReturn() {
      this.$router.replace("/jilu-food-sport");
    },
    add(item) {
      console.log("添加");
      // console.log(item);
      this.addfood = item;
      console.log(this.addfood);
      this.show = !this.show;
      this.foodname = this.addfood.name;
      this.reliang = this.addfood.rl * this.num;
      this.tiji = 100 * this.num;
    },
    close() {
      this.show = !this.show;
      this.num = 1;
    },
    finFood() {
      this.show = !this.show;
      this.num = 1;
      console.log(this.foodname + this.reliang);
      this.s_num += 1;

      const user_name = localStorage.getItem("user_name");

      if (this.type === "早饭") {
        this.food = {
          user_name: user_name,
          breakfast: this.foodname,
          rl: this.reliang,
          time: this.time
        };
        this.axios({
          method: "post",
          url: "/add_breakfast",
          data: this.food
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }

      if (this.type === "午饭") {
        this.food = {
          user_name: user_name,
          lunch: this.foodname,
          rl: this.reliang,
          time: this.time
        };
        this.axios({
          method: "post",
          url: "/add_lunch",
          data: this.food
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }

      if (this.type === "晚饭") {
        this.food = {
          user_name: user_name,
          dinner: this.foodname,
          rl: this.reliang,
          time: this.time
        };
        this.axios({
          method: "post",
          url: "/add_dinner",
          data: this.food
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    look() {
      console.log("查看");
    },
    addFood() {
      console.log("保存");
      this.s_num = 0;
      this.$router.replace("/jilu-food-sport");
    },
    changeNum() {
      console.log(this.num);
      this.reliang = this.addfood.rl * this.num;
      this.tiji = 100 * this.num;
    },
    makeFood() {
      console.log("tianjia");
      this.$router.replace("/make-food");
    },
    deleteFood() {
      console.log("删除食物");
    }
  }
};
</script>
<style lang="css">
hr {
  background-color: rgb(209, 212, 214);
  height: 1px;
  border: none;
}
.img_food {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
li {
  list-style-type: none;
  padding: 15px 20px;
  position: relative;
  margin: 0;
  height: 52px;
}
.toast {
  width: 100%;
  height: 400px;
  background-color: aliceblue;
  position: fixed;
  top: 300px;
  z-index: 2;
}
.footer {
  z-index: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 10px;
  height: 55px;
  border-top: 1px rgb(197, 194, 194) solid;
  background-color: white;
}
.delete {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 30px;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
