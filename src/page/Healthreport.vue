<template lang="">
  <div>
    <x-header
      style="background-color:bule; color:white;"
      title="健康报告"
    ></x-header>
    健康报告
    <div>
      <span>我的体重</span>
      <div class="card1">111</div>
    </div>

    <div>
      <span>我的目标</span>
      <div class="card2">111</div>
    </div>

    <div>
      <span>体重日志</span>
      <div class="card3">
        <v-chart ref="demo" :data="data1">
          <v-bar />
          <v-tooltip :show-item-marker="false" />
        </v-chart>
        <p>体重保持的不错</p>
        <x-button type="primary" plain @click.native="$refs.demo.rerender()"
          >渲染</x-button
        >
      </div>
    </div>

    <div>
      <span>均衡饮食</span>
      <div class="card4">
        <v-chart :data="data" :padding="[20, 'auto']">
          <v-tooltip disabled />
          <v-scale y :options="yOptions" />
          <v-pie
            :radius="0.5"
            :inner-radius="0.8"
            series-field="name"
            :colors="['#FE5D4D', '#3BA4FF', '#737DDE']"
          />
          <v-legend :options="legendOptions" />
          <v-guide type="html" :options="htmlOptions" />
        </v-chart>
        <span>2222千卡</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  VChart,
  VLine,
  VArea,
  VTooltip,
  VLegend,
  VBar,
  XButton,
  VPie,
  VGuide,
  VScale
} from "vux";

const data = [
  { name: "股票类", percent: 83.59, a: "1" },
  { name: "债券类", percent: 2.17, a: "1" },
  { name: "现金类", percent: 14.24, a: "1" }
];

const map = {};
data.map(obj => {
  map[obj.name] = obj.percent + "%";
});

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton,
    VPie,
    VGuide,
    VScale
  },
  data() {
    return {
      data1: [
        { year: "1951 年", sales: 38 },
        { year: "1952 年", sales: 52 },
        { year: "1956 年", sales: 61 },
        { year: "1957 年", sales: 145 },
        { year: "1958 年", sales: 48 },
        { year: "1959 年", sales: 38 },
        { year: "1960 年", sales: 38 },
        { year: "1962 年", sales: 38 }
      ],
      map,
      htmlOptions: {
        position: ["50%", "45%"],
        html: `
          <div style="width: 250px;height: 40px;text-align: center;">
           
          </div>`
      },
      legendOptions: {
        position: "right",
        itemFormatter(val) {
          return val + "  " + map[val];
        }
      },
      yOptions: {
        formatter(val) {
          return val * 100 + "%";
        }
      },
      data
    };
  }
};
</script>
<style lang="css">
.card3 {
  width: 100%;
  height: 400px;
  background-color: white;
}
.card4 {
  width: 100%;
  height: 300px;
  background-color: white;
  color: rgb(157, 224, 236);
}
</style>
