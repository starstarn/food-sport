<template lang="">
  <div>
    rwe
    <x-header
      style="background-color:green; color:white;"
      title="体重记录"
    ></x-header>
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
      ]
    };
  }
};
</script>
<style lang=""></style>
