<template lang="">
  <div>
    <!--  <x-header
      style="background-color:green; color:white;"
      title="体重记录"
    ></x-header> -->

    <div
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">体重记录</span>
    </div>
    <div style="margin:0 0 10px 0;">
      <span style="font-size:22px; margin:10px 0 10px 20px;"
        >体重<span
          style="font-size:14px;font-weight:200; color:gery; margin:5px 0 10px 10px;"
          >单位：公斤</span
        >
      </span>
    </div>

    <v-chart :data="data">
      <v-scale x :tick-count="0" />
      <v-scale y :min="0" />
      <v-tooltip show-crosshairs show-x-value />
      <v-area />
      <v-line />
    </v-chart>

    <div style="margin:0 0 10px 0;">
      <span style="font-size:22px; margin:10px 0 10px 20px;"
        >体脂<span
          style="font-size:14px;font-weight:200; color:gery; margin:5px 0 10px 10px;"
          >单位：%</span
        >
      </span>
    </div>

    <v-chart :data="data">
      <v-scale x :tick-count="0" />
      <v-scale y :min="0" />
      <v-tooltip show-crosshairs show-x-value />
      <v-area />
      <v-line />
    </v-chart>
  </div>
</template>
<script>
import { VChart, VLine, VArea, VTooltip, VScale, VAxis } from "vux";

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VScale,
    VAxis
  },
  data() {
    return {
      data: [
        { time: "Jan.", tem: 1000 },
        { time: "Feb.", tem: 2200 },
        { time: "Mar.", tem: 2000 },
        { time: "Apr.", tem: 2600 },
        { time: "May.", tem: 2000 },
        { time: "Jun.", tem: 2600 },
        { time: "Jul.", tem: 2800 },
        { time: "Aug.", tem: 2000 }
      ],
      username: null,
      fh: require("../images/return.png")
    };
  },
  created() {
    this.username = localStorage.getItem("user_name");
    const user_name = {
      user_name: this.username
    };
    this.axios({
      method: "post",
      url: "/all_weight",
      data: user_name
    })
      .then(res => {
        console.log(res.data);

        let r = res.data.map(item => {
          return {
            time: item.time,
            tem: item.t_weight
          };
        });
        console.log(r);
        this.data = res.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onReturn() {
      this.$router.replace("/weightjilu");
    }
  }
};
</script>
<style lang="css">
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
