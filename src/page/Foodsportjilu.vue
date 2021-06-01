<template lang="">
  <div>
    <div
      style="position:fixed;top:0;width:100%;z-index:3;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">能量显示</span>
    </div>

    <div class="card1">
      <div style="margin:50px 0 0 30px;">
        <span class="title">饮食摄入</span>
        <span>{{ foodsall }}</span>
      </div>

      <div style="width:140px;height:140px;margin:auto;margin-top:30px;">
        <x-circle
          :percent="maybe"
          :stroke-width="6"
          :trail-width="6"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec"
        >
          <span v-if="maybe >= 0" style="color:grey;font-size:14px;">
            <span>还可以吃</span>
            <br />
            <span style="font-size:18px;color:black;">{{ maybe }}</span>
            <br />
            <span style="margin-top:10px;">推荐预算{{ biaozhun }}</span></span
          >
          <span v-else style="color:grey;font-size:14px;">
            <span>超出热量</span>
            <br />
            <span style="font-size:18px;color:black;">{{ -maybe }}</span>
            <br />
            <span style="margin-top:10px;">推荐预算{{ biaozhun }}</span></span
          >
        </x-circle>
      </div>
      <div style="margin:50px 0 0 30px;">
        <span class="title">运动消耗</span>
        <span>{{ sport_rl }}</span>
      </div>
    </div>

    <!-- 早饭 -->
    <div>
      <cell title="早餐" is-link style="font-size:18px;font-weight:600;"
        ><span style="font-size:14px;">{{ break_rl }}千卡</span></cell
      >
    </div>

    <div
      v-for="(item, index) in breaks"
      :key="index"
      @click="deleteBreak(item)"
    >
      <li>
        <!-- <img class="img_food" :src="img_foods" /> -->
        <img class="img_food" :src="item.image" />

        <span
          style="font-size:14px;font-weight:600;position:absolute;left:78px;top:15px;"
          >{{ item.breakfast }}</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:gray;">{{ item.rl }}千卡</span></span
        >
        <img :src="sc" class="sc" />
      </li>
      <hr />
    </div>

    <!-- 午饭 -->
    <div>
      <cell title="午餐" is-link style="font-size:18px;font-weight:600;"
        ><span style="font-size:14px;">{{ lunch_rl }}千卡</span></cell
      >
    </div>

    <div
      v-for="(item, index) in lunchs"
      :key="index"
      @click="deleteLunch(item)"
    >
      <li>
        <img class="img_food" :src="item.image" />

        <span
          style="font-size:14px;font-weight:600;position:absolute;left:78px;top:15px;"
          >{{ item.lunch }}</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:gray;">{{ item.rl }}千卡</span></span
        >
        <img :src="sc" class="sc" />
      </li>
      <hr />
    </div>

    <!-- 晚饭 -->
    <div>
      <cell title="晚餐" is-link style="font-size:18px;font-weight:600;"
        ><span style="font-size:14px;">{{ dinner_rl }}千卡</span></cell
      >
    </div>

    <div
      v-for="(item, index) in dinners"
      :key="index"
      @click="deleteDinner(item)"
    >
      <li>
        <img class="img_food" :src="item.image" />

        <span
          style="font-size:14px;font-weight:600;position:absolute;left:78px;top:15px;"
          >{{ item.dinner }}</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:gray;">{{ item.rl }}千卡</span></span
        >
        <img :src="sc" class="sc" />
      </li>
      <hr />
    </div>

    <!-- 运动 -->
    <div>
      <cell title="运动" is-link style="font-size:18px;font-weight:600;"
        ><span style="font-size:14px;">{{ sport_rl }}千卡</span></cell
      >
    </div>

    <div
      v-for="(item, index) in sports"
      :key="index"
      @click="deleteSport(item)"
    >
      <li>
        <img class="img_food" :src="item.image" />

        <span
          style="font-size:14px;font-weight:600;position:absolute;left:78px;top:15px;"
          >{{ item.sport }}</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:gray;">{{ item.rl }}千卡</span></span
        >
        <img :src="sc" class="sc" />
      </li>
      <hr />
    </div>
    <x-button
      @click.native="yingyang()"
      text="营养分析"
      type="primary"
      style="display:inline; border-radius:99px; width:50%;margin-top:30px;left:25%"
    ></x-button>
    <div style="margin-bottom:100px;"></div>

    <div class="leibie" style="position:fixed; bottom:0;">
      <img :src="zf" @click="zaofan()" class="tp1" /><img
        :src="wf"
        @click="wufan()"
        class="tp1"
      /><img :src="wanf" @click="wanfan()" class="tp1" /><img
        :src="sport"
        @click="sport1()"
        class="tp1"
      />
    </div>

    <div v-transfer-dom>
      <confirm
        v-model="show_del"
        theme="android"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
      >
        <p v-if="type == '早餐'" style="text-align:center;">
          确定要删除早餐-（{{ del_food.breakfast }}）的记录吗？
        </p>
        <p v-else-if="type == '午餐'" style="text-align:center;">
          确定要删除午餐-（{{ del_food.lunch }}）的记录吗？
        </p>
        <p v-else-if="type == '晚餐'" style="text-align:center;">
          确定要删除晚餐-（{{ del_food.dinner }}）的记录吗？
        </p>
        <p v-else-if="type == '运动'" style="text-align:center;">
          确定要删除运动-（{{ del_food.sport }}）的记录吗？
        </p>
      </confirm>
    </div>
  </div>
</template>
<script>
import { XCircle, Cell, Confirm } from "vux";
import axios from "axios";

export default {
  components: {
    XCircle,
    Cell,
    Confirm
  },
  data() {
    return {
      show_del: false,
      percent: 80,
      zf: require("../images/早饭.jpg"),
      wf: require("../images/午饭.jpg"),
      wanf: require("../images/晚饭.jpg"),
      sport: require("../images/运动.jpg"),
      foods: null,
      img_foods: require("../images/mika.jpg"),
      sc: require("../images/shanchu.png"),
      biaozhun: 0,
      break_rl: 0,
      lunch_rl: 0,
      dinner_rl: 0,
      sport_rl: 0,
      maybe: 0,
      breaks: null,
      lunchs: null,
      dinners: null,
      sports: null,
      foodsall: 0,
      del_food: null,
      type: null,
      fh: require("../images/return.png")
    };
  },
  created() {
    const u_name = localStorage.getItem("user_name");
    const us_name = {
      user_name: u_name
    };

    this.axios({
      method: "post",
      url: "/user/sel_user",
      data: us_name
    })
      .then(res => {
        console.log(res);
        this.kaluli = res.data.kll;
        this.weight = res.data.weight;
        this.u_weight = this.weight;
        this.s_weight = res.data.s_weight;
        this.bmi = res.data.bmi;
        this.height = res.data.height;
        this.percent = this.weight - this.s_weight;
        localStorage.setItem("weight", this.weight);
        this.biaozhun = res.data.kll;
      })
      .catch(error => {
        console.log(error);
      });

    //this.biaozhun = localStorage.getItem("kll");
    var data = new Date();
    var month =
      data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
    var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
    const time = data.getFullYear() + "-" + month + "-" + date;
    console.log(time); //2021-05-01
    const user_name = localStorage.getItem("user_name");

    const name_time = {
      user_name: user_name,
      time: time
    };
    console.log(name_time);

    function getBreak() {
      return axios({
        method: "post",
        url: "/s_breakfast",
        data: name_time
      });
    }
    function getLunch() {
      return axios({
        method: "post",
        url: "/s_lunch",
        data: name_time
      });
    }
    function getDinner() {
      return axios({
        method: "post",
        url: "/s_dinner",
        data: name_time
      });
    }
    function getSport() {
      return axios({
        method: "post",
        url: "/s_sport",
        data: name_time
      });
    }

    this.axios.all([getBreak(), getLunch(), getDinner(), getSport()]).then(
      axios.spread((user_break, user_lunch, user_dinner, user_sport) => {
        // 四个请求现在都执行完成
        console.log(user_break.data);
        console.log(user_lunch.data);
        console.log(user_dinner.data);
        console.log(user_sport.data);

        this.breaks = user_break.data;
        this.lunchs = user_lunch.data;
        this.dinners = user_dinner.data;
        this.sports = user_sport.data;

        const addDuration = arr => {
          let res = 0;
          for (let i = 0; i < arr.length; i++) {
            res += arr[i].rl;
          }
          return res;
        };
        this.break_rl = addDuration(user_break.data);
        this.lunch_rl = addDuration(user_lunch.data);
        this.dinner_rl = addDuration(user_dinner.data);
        this.sport_rl = addDuration(user_sport.data);
        // 食物热量总和
        this.foodsall = this.break_rl + this.lunch_rl + this.dinner_rl;
        localStorage.setItem("breaks", this.break_rl);
        localStorage.setItem("lunchs", this.lunch_rl);
        localStorage.setItem("dinners", this.dinner_rl);
        localStorage.setItem("foodall", this.foodsall);
        this.maybe = this.biaozhun - (this.foodsall - this.sport_rl);
      })
    );
  },
  methods: {
    onReturn() {
      this.$router.replace("/");
    },
    zaofan() {
      console.log("zao");
      this.$router.replace("/add-food");
      localStorage.setItem("type", "早饭"); //将变量存储到字段
    },
    wufan() {
      console.log("wu");
      this.$router.replace("/add-food");
      localStorage.setItem("type", "午饭"); //将变量存储到字段
    },
    wanfan() {
      console.log("wan");
      this.$router.replace("/add-food");
      localStorage.setItem("type", "晚饭"); //将变量存储到字段
    },
    sport1() {
      console.log("sport");
      this.$router.replace("/add-sport");
    },
    yingyang() {
      this.$router.replace("/food-analyse");
    },
    deleteBreak(item) {
      console.log("删除早餐");
      this.show_del = !this.show_del;
      console.log(item);
      this.del_food = item;
      this.type = "早餐";
    },
    deleteLunch(item) {
      console.log("删除午餐");
      this.show_del = !this.show_del;
      console.log(item);
      this.del_food = item;
      this.type = "午餐";
    },
    deleteDinner(item) {
      console.log("删除晚餐");
      this.show_del = !this.show_del;
      console.log(item);
      this.del_food = item;
      this.type = "晚餐";
    },
    deleteSport(item) {
      console.log("删除运动");
      this.show_del = !this.show_del;
      console.log(item);
      this.del_food = item;
      this.type = "运动";
    },
    onConfirm() {
      console.log("确定删除");
      console.log(this, this.del_food.id);
      const food = {
        id: this.del_food.id
      };
      if (this.type === "早餐") {
        this.axios({
          method: "post",
          url: "/d_breakfast",
          data: food
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }

      if (this.type === "午餐") {
        this.axios({
          method: "post",
          url: "/d_lunch",
          data: food
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }

      if (this.type === "晚餐") {
        this.axios({
          method: "post",
          url: "/d_dinner",
          data: food
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }

      if (this.type === "运动") {
        this.axios({
          method: "post",
          url: "/d_sport",
          data: food
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }

      location.reload();
    },
    onCancel() {
      console.log("取消删除");
    }
  }
};
</script>
<style lang="css" scoped>
hr {
  background-color: rgb(209, 212, 214);
  height: 1px;
  border: none;
}
.card1 {
  border: 1px gainsboro solid;
  border-radius: 20px;
  width: 90%;
  height: 180px;
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  margin-bottom: 10px;
  margin-top: 60px;
}
.img_food {
  width: 45px;
  height: 45px;
  border-radius: 10px;
}
.title {
  font-size: 14px;
  color: gray;
}
li {
  list-style-type: none;
  padding: 15px 20px;
  position: relative;
  margin: 0;
  height: 52px;
}

.leibie img {
  width: 25%;
  margin: 0;
  padding: 0;
  border: 0;
}
.img_foods {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.sc {
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
