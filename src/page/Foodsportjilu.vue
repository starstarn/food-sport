<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="能量显示"
    ></x-header>
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

    <div v-for="(item, index) in breaks" :key="index">
      <li>
        <img class="img_food" :src="img_foods" />

        <span
          style="font-size:14px;font-weight:600;position:absolute;left:78px;top:15px;"
          >{{ item.breakfast }}</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:gray;">{{ item.rl }}千卡</span></span
        >
      </li>
      <hr />
    </div>

    <!-- 午饭 -->
    <div>
      <cell title="午餐" is-link style="font-size:18px;font-weight:600;"
        ><span style="font-size:14px;">{{ lunch_rl }}千卡</span></cell
      >
    </div>

    <div v-for="(item, index) in lunchs" :key="index">
      <li>
        <img class="img_food" :src="img_foods" />

        <span
          style="font-size:14px;font-weight:600;position:absolute;left:78px;top:15px;"
          >{{ item.lunch }}</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:gray;">{{ item.rl }}千卡</span></span
        >
      </li>
      <hr />
    </div>

    <!-- 晚饭 -->
    <div>
      <cell title="晚餐" is-link style="font-size:18px;font-weight:600;"
        ><span style="font-size:14px;">{{ dinner_rl }}千卡</span></cell
      >
    </div>

    <div v-for="(item, index) in dinners" :key="index">
      <li>
        <img class="img_food" :src="img_foods" />

        <span
          style="font-size:14px;font-weight:600;position:absolute;left:78px;top:15px;"
          >{{ item.dinner }}</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:gray;">{{ item.rl }}千卡</span></span
        >
      </li>
      <hr />
    </div>

    <!-- 运动 -->
    <div>
      <cell title="运动" is-link style="font-size:18px;font-weight:600;"
        ><span style="font-size:14px;">{{ sport_rl }}千卡</span></cell
      >
    </div>

    <div v-for="(item, index) in sports" :key="index">
      <li>
        <img class="img_food" :src="img_foods" />

        <span
          style="font-size:14px;font-weight:600;position:absolute;left:78px;top:15px;"
          >{{ item.sport }}</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:gray;">{{ item.rl }}千卡</span></span
        >
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
  </div>
</template>
<script>
import { XCircle, Cell } from "vux";
import axios from "axios";

export default {
  components: {
    XCircle,
    Cell
  },
  data() {
    return {
      percent: 80,
      zf: require("../images/早饭.jpg"),
      wf: require("../images/午饭.jpg"),
      wanf: require("../images/晚饭.jpg"),
      sport: require("../images/运动.jpg"),
      foods: null,
      img_foods: require("../images/mika.jpg"),
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
      foodsall: 0
    };
  },
  created() {
    this.biaozhun = localStorage.getItem("kll");

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
        localStorage.setItem("breaks",this.break_rl);
        localStorage.setItem("lunchs",this.lunch_rl);
        localStorage.setItem("dinners",this.dinner_rl);
        localStorage.setItem("foodall",this.foodsall);

        this.maybe = this.biaozhun - (this.foodsall - this.sport_rl);
        /* if (user_break.data !== null) {
          const break_name = user_break.data.breakfast;
          const brl = user_break.data.rl;
          // 字符串转数组；
          const b_rl = brl.split(",").map(Number);
          console.log(b_rl);
          for (let i = 0; i < b_rl.length; i++) {
            this.break_rl += b_rl[i];
          }
        }

        const sport_name = user_sport.data.sport;
        const srl = user_sport.data.rl;
        const s_rl = srl.split(",").map(Number);
        for (let i = 0; i < s_rl.length; i++) {
          this.sport_rl += s_rl[i];
        } */

        /*  this.maybe =
          this.biaozhun -
          (this.break_rl + this.lunch_rl + this.dinner_rl - this.sport_rl); */
      })
    );

    //早饭
    /*  this.axios({
      method: "post",
      url: "/s_breakfast",
      data: name_time
    })
      .then(res => {
        console.log(res.data);
        const name = res.data.breakfast;
        const rl = res.data.rl;
        // 字符串转数组；
        const b_rl = rl.split(",").map(Number);
        for (let i = 0; i < b_rl.length; i++) {
          this.break_rl += b_rl[i];
        }
        // console.log(this.break_rl);
      })
      .catch(error => {
        console.log(error);
      });

    //运动
    this.axios({
      method: "post",
      url: "s_sport",
      data: name_time
    })
      .then(res => {
        console.log(res.data);
        const sport = res.data.sport;
        const rl = res.data.rl;

        const s_rl = rl.split(",").map(Number);
        for (let i = 0; i < s_rl.length; i++) {
          this.sport_rl += s_rl[i];
        }
        // console.log(this.sport_rl);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(this.sport_rl + this.break_rl); */
  },
  methods: {
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
    yingyang(){
      this.$router.replace("/food-analyse");
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
</style>
