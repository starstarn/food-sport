<template lang="">
  <div>
    <div
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">能量显示</span>
    </div>
    <div style="width:140px;height:140px;margin:auto;margin-top:30px;">
      <x-circle
        :percent="percent1"
        :stroke-width="6"
        :trail-width="6"
        :stroke-color="['#36D1DC', '#5B86E5']"
        trail-color="#ececec"
      >
        <span style="color:grey;font-size:20px;" v-if="percent1 >= 0">
          需减去
          <br />
          {{ percent1 }}Kg</span
        >
        <span style="color:grey;font-size:20px;" v-else>
          需增重
          <br />
          {{ -percent1 }}Kg</span
        >
      </x-circle>
    </div>
    <x-button
      @click.native="jiluWeight()"
      plain
      text="记录体重"
      type="primary"
      style="border-radius:99px;width:180px;margin-top:30px;"
    ></x-button>

    <div class="weight">
      <hr />
      <!-- 目标体重 -->
      <div class="begin">
        <span style="left:20px;">{{ s_weight }}公斤</span>
        <span style="right:20px;">开始保持</span>
        <br />
        <span style="left:20px;">目标体重</span>
        <!-- <span style="right:20px;">2021年3月5日</span> -->
      </div>

      <!-- 最新体重 -->
      <div class="begin">
        <span style="left:20px;">{{ new_weight }}公斤</span>
        <span style="right:20px;">开始保持</span>
        <br />
        <span style="left:20px;">最新体重</span>
        <span style="right:20px;">{{ time }}</span>
      </div>
    </div>

    <div style="display:inline;">
      <x-button
        @click.native="updatemb()"
        plain
        text="设定新目标"
        style="border-radius:99px;width:140px;font-size:14px;"
      ></x-button>
      <x-button
        plain
        text="查看曲线"
        link="/weight-chart"
        style="border-radius:99px;width:140px;font-size:14px;"
      ></x-button>
    </div>

    <!-- 弹出记录目标体重 -->
    <jl-weight v-show="shows"></jl-weight>

    <div class="toast" v-show="show1">
      <p style="font-size:20px;color:gray;padding:15px 0;">
        <span style="margin:10px 0 0 20px;" @click="close">取消</span>
        <span style="margin:10px 0 0 100px;color:black;">今天</span>
        <span style="margin:10px 0 0 100px;" @click="xiugai1()">确定</span>
      </p>
      <h4 style=" text-align: center">体重</h4>
      <inline-x-number
        v-model="s_weight"
        @on-change="changeWeight()"
        width="60px"
        :min="30"
        style="text-align: center;"
      ></inline-x-number>
    </div>
  </div>
</template>
<script>
import { XCircle } from "vux";
import { InlineXNumber } from "vux";
import jlWeight from "../components/Jiluweight";

export default {
  components: {
    XCircle,
    jlWeight,
    InlineXNumber
  },
  data() {
    return {
      show1: false,
      shows: false,
      percent1: 80,
      new_weight: null,
      s_weight: null,
      time: null,
      year: null,
      month: null,
      day: null,
      fh: require("../images/return.png")
    };
  },
  created() {
    var data = new Date();
    this.year = data.getFullYear();
    this.month =
      data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
    this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
    this.time = data.getFullYear() + "-" + this.month + "-" + this.day;
    console.log(this.time); //2021-05-01

    const u_name = localStorage.getItem("user_name");
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
        this.new_weight = res.data.weight;
        this.s_weight = res.data.s_weight;
        this.begin_weight = res.data.begin_weight;
        this.percent1 = this.new_weight - this.s_weight;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onReturn() {
      this.$router.replace("/");
    },
    updatemb() {
      this.show1 = !this.show1;
      console.log("修改体重目标");
    },
    jiluWeight() {
      console.log("修改现在体重");
      const u_name = localStorage.getItem("user_name");
      this.shows = !this.shows;

      var data = new Date();
      this.year = data.getFullYear();
      this.month =
        data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
      this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
      this.time = data.getFullYear() + "-" + this.month + "-" + this.day;
      console.log(this.time); //2021-05-01

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
          this.new_weight = res.data.weight;
          this.s_weight = res.data.s_weight;
          this.begin_weight = res.data.begin_weight;
          this.percent1 = this.new_weight - this.s_weight;
        })
        .catch(error => {
          console.log(error);
        });
    },
    close() {
      this.show1 = !this.show1;
    },
    changeWeight() {
      console.log(this.s_weight);
    },
    xiugai1() {
      console.log("修改目标体重");
      console.log(this.s_weight);
      const user_name = localStorage.getItem("user_name");
      const name_weight = {
        user_name: user_name,
        s_weight: this.s_weight
      };
      this.axios({
        method: "post",
        url: "/user/update_sweight",
        data: name_weight
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      this.show1 = !this.show1;
      // location.reload();
    }
  }
};
</script>
<style lang="css">
.weight {
  padding: 30px 0;
}
.begin {
  width: 100%;
  height: 80px;
  position: relative;
  margin-bottom: 10px;
}
.begin span {
  margin: 0;
  padding: 0;
  color: gray;
  font-size: 14px;
  position: absolute;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
