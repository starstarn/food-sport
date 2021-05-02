<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="营养分析"
    ></x-header>

    <flexbox orient="vertical">
      <!-- 热量分析 -->
      <div>
        <span class="head">热量分析</span>
        <div class="rl">
          <span class="titler">热量比及摄入</span>
          <v-chart :data="data" :padding="[20, 'auto']">
            <v-tooltip disabled />
            <v-scale y :options="yOptions" />
            <v-pie
              :radius="0.65"
              :inner-radius="0.4"
              series-field="name"
              :colors="['#9999FF', '#FF8800', '#00BBFF']"
            />
            <v-legend :options="legendOptions" />
            <v-guide type="html" :options="htmlOptions" />
          </v-chart>

          <div>
            <group>
              <cell
                title="总摄入(千卡)"
                value="2000"
                style="widht:90%;height:40px;border-radius: 25px 25px 0 0;background-color: rgb(240, 242, 243);"
              ></cell>
              <cell-form-preview
                :list="list"
                style="background-color: rgb(240, 242, 243);"
              ></cell-form-preview>
            </group>
          </div>
        </div>
      </div>

      <!-- 三大营养素分析 -->
      <div>
        <span class="head">三大营养素分析</span>
        <div class="rl">
          <span class="titler">供能比及摄入</span>
          <v-chart :data="data" :padding="[20, 'auto']">
            <v-tooltip disabled />
            <v-scale y :options="yOptions" />
            <v-pie
              :radius="0.65"
              :inner-radius="0.4"
              series-field="name"
              :colors="['#FE5D4D', '#3BA4FF', '#737DDE']"
            />
            <v-legend :options="legendOptions" />
            <v-guide type="html" :options="htmlOptions" />
          </v-chart>

          <div>
            <group>
              <cell
                title="总摄入(千卡)"
                value="2000"
                style="widht:90%;height:40px;border-radius: 25px 25px 0 0;background-color: rgb(240, 242, 243);"
              ></cell>
              <cell-form-preview
                :list="list"
                style="background-color: rgb(240, 242, 243);"
              ></cell-form-preview>
            </group>
          </div>
        </div>
      </div>
    </flexbox>
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
  VPie,
  VGuide,
  VScale,
  CellFormPreview,
  Group,
  Cell
} from "vux";

const data = [
  { name: "早餐", percent: 30, a: "1" },
  { name: "午餐", percent: 30, a: "1" },
  { name: "晚餐", percent: 40, a: "1" }
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
    VPie,
    VGuide,
    VScale,
    CellFormPreview,
    Group,
    Cell
  },
  data() {
    return {
      list: null,
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
  },
  created() {
    const breaks = localStorage.getItem("breaks");
    const lunchs = localStorage.getItem("lunchs");
    const dinners = localStorage.getItem("dinners");
    const foodall = localStorage.getItem("foodall");
    const breaks_p = breaks / foodall;
    const lunchs_p = lunchs / foodall;
    const dinners_p = dinners / foodall;
    console.log(breaks_p)

    this.list = [
      { name: "早餐", percent: breaks_p, a: "1" },
      { name: "午餐", percent: lunchs_p, a: "1" },
      { name: "晚餐", percent: dinners_p, a: "1" }
    ];
  }
};
</script>
<style lang="css" scoped>
body {
  background-color: rgb(240, 242, 243);
}
.head {
  font-size: 22px;
  margin: 10px;
}
.rl {
  background-color: white;
  width: 94%;
  height: 550px;
  border-radius: 25px;
}
.titler {
  font-size: 16px;
  margin: 20px 0 0 20px;
  color: black;
}
</style>
