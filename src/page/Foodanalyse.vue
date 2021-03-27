<template lang="">
  <div>
    frf
    <x-header
      style="background-color:green; color:white;"
      title="营养分析"
    ></x-header>
    <!-- 热量分析 -->
    <span>热量分析</span>
    <div class="rl">
      <span>热量比及摄入</span>
      <v-chart :data="data" :padding="[20, 'auto']">
        <v-tooltip disabled />
        <v-scale y :options="yOptions" />
        <v-pie
          :radius="0.85"
          :inner-radius="0.7"
          series-field="name"
          :colors="['#FE5D4D', '#3BA4FF', '#737DDE']"
        />
        <v-legend :options="legendOptions" />
        <v-guide type="html" :options="htmlOptions" />
      </v-chart>
      
      <div>
<group>
      <cell title="$t('Total')" value="$t('$1024')"></cell>
      <cell-form-preview :list="list"></cell-form-preview>
    </group>
          <div>
    </div>
    <!-- 三大营养素分析 -->
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
  CellFormPreview, Group, Cell
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
    VPie,
    VGuide,
    VScale,
    CellFormPreview, Group, Cell
  },
  data() {
    return {
        list: [{
        label: 'Apple',
        value: '3.29'
      }, {
        label: 'Banana',
        value: '1.04'
      }, {
        label: 'Fish',
        value: '8.00'
      }],
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
<style lang=""></style>
