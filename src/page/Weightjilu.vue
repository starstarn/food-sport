<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="体重记录"
    ></x-header>
    <div style="width:140px;height:140px;margin:auto;margin-top:30px;">
      <x-circle
        :percent="percent"
        :stroke-width="6"
        :trail-width="6"
        :stroke-color="['#36D1DC', '#5B86E5']"
        trail-color="#ececec"
      >
        <span style="color:grey;font-size:20px;">
          比原来轻
          <br />
          {{ percent }}%</span
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
      <!-- 初始体重 -->
      <div class="begin">
        <span style="left:20px;">{{ begin_weight }}公斤</span>
        <span style="right:20px;">开始保持</span>
        <br />
        <span style="left:20px;">初始体重</span>
        <span style="right:20px;">2021年3月5日</span>
      </div>

      <!-- 最新体重 -->
      <div class="begin">
        <span style="left:20px;">{{ new_weight }}公斤</span>
        <span style="right:20px;">开始保持</span>
        <br />
        <span style="left:20px;">最新体重</span>
        <span style="right:20px;">2021年3月12日</span>
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
        text="制作对比照"
        link="/weight-chart"
        style="border-radius:99px;width:140px;font-size:14px;"
      ></x-button>
    </div>

    <!-- 弹出记录体重 -->
    <jl-weight v-show="shows"></jl-weight>
  </div>
</template>
<script>
import { XCircle } from "vux";
import jlWeight from "../components/Jiluweight";

export default {
  components: {
    XCircle,
    jlWeight
  },
  data() {
    return {
      shows: false,
      percent: 80,
      new_weight: null
    };
  },
  created() {
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
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    updatemb() {
      console.log("修改体重目标");
    },
    jiluWeight() {
      console.log("修改现在体重");
      const u_name = localStorage.getItem("user_name");
      this.shows = !this.shows;
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
        })
        .catch(error => {
          console.log(error);
        });
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
</style>
