<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="能量显示"
    ></x-header>
    <div class="card1">
      <div style="margin:50px 0 0 30px;">
        <span class="title">饮食摄入</span>
        <span>{{ break_rl }}</span>
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

    <div>
      <cell title="早餐" is-link></cell>
    </div>
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
      maybe: 0
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
    function getSport() {
      return axios({
        method: "post",
        url: "/s_sport",
        data: name_time
      });
    }
    this.axios.all([getBreak(), getSport()]).then(
      axios.spread((user_break, user_sport) => {
        // 两个请求现在都执行完成
        console.log(user_break.data);
        console.log(user_sport.data);

        if (user_break.data !== null) {
          const break_name = user_break.data.breakfast;
          const brl = user_break.data.rl;
          // 字符串转数组；
          const b_rl = brl.split(",").map(Number);
          console.log(b_rl);
          for (let i = 0; i < b_rl.length; i++) {
            this.break_rl += b_rl[i];
          }
          // console.log(this.break_rl);
        }

        const sport_name = user_sport.data.sport;
        const srl = user_sport.data.rl;
        const s_rl = srl.split(",").map(Number);
        for (let i = 0; i < s_rl.length; i++) {
          this.sport_rl += s_rl[i];
        }

        this.maybe =
          this.biaozhun -
          (this.break_rl + this.lunch_rl + this.dinner_rl - this.sport_rl);
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
