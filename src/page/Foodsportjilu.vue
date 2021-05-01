<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="能量显示"
    ></x-header>
    <div class="card1">
      <div style="margin:50px 0 0 30px;">
        <span class="title">饮食摄入</span>
        <span>1000</span>
      </div>

      <div style="width:140px;height:140px;margin:auto;margin-top:30px;">
        <x-circle
          :percent="percent"
          :stroke-width="6"
          :trail-width="6"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec"
        >
          <span style="color:grey;font-size:16px;">
            还可以吃
            <br />
            {{ percent }}
            <br />
            推荐预算{{biaozhun}}</span
          >
        </x-circle>
      </div>
      <div style="margin:50px 0 0 30px;">
        <span class="title">运动消耗</span>
        <span>1000</span>
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
      biaozhun: 0
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
    this.axios({
      method: "post",
      url: "/s_breakfast",
      data: name_time
    })
      .then(res => {
        console.log(res.data);
        const name = res.data.breakfast;
        const rl = res.data.rl;
        console.log(name + rl);
        // this.foods= res.data;
      })
      .catch(error => {
        console.log(error);
      });
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
