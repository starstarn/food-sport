<template lang="">
  <div>
    <!-- <x-header
      style="background-color:green; color:white;"
      title="营养分析"
    ></x-header> -->

    <div
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">营养分析</span>
    </div>

    <flexbox orient="vertical">
      <!-- 热量分析 -->
      <div style="width:95%;">
        <span class="head_rl">热量分析</span>
        <div class="rl">
          <span class="titler">热量比及摄入</span>
          <v-chart :data="data">
            <v-scale y :options="yOptions" />
            <v-tooltip disabled />
            <v-pie
              :radius="0.65"
              series-field="name"
              :colors="['#9999FF', '#FF8800', '#00BBFF']"
            />
            <v-legend :options="legendOptions" />
          </v-chart>

          <div style="width:92%;position:relative;margin:auto;">
            <group>
              <cell
                title="总摄入(千卡)"
                :value="all_rl"
                style="widht:85%;height:40px;border-radius: 15px 15px 0 0;background-color: rgb(240, 242, 243);"
              ></cell>
              <cell-form-preview
                :list="list"
                style="background-color: rgb(240, 242, 243);width:92%;height:120px; border-radius: 0 0 15px 15px;"
              ></cell-form-preview>
            </group>
          </div>
        </div>
      </div>

      <!-- 三大营养素分析 -->

      <!-- 热量分析 -->
      <div style="width:95%;">
        <span class="head_rl">三大营养素分析</span>
        <div class="rl">
          <span class="titler">供能比及摄入</span>
          <v-chart :data="data1">
            <v-scale y :options="yOptions" />
            <v-tooltip disabled />
            <v-pie
              :radius="0.65"
              series-field="name"
              :colors="['#9999FF', '#FF8800', '#00BBFF']"
            />
            <v-legend :options="legendOptions1" />
          </v-chart>

          <div style="width:92%;position:relative;margin:auto;">
            <group>
              <cell
                title="名称(克)"
                :value="all_rl"
                style="widht:85%;height:40px;border-radius: 15px 15px 0 0;background-color: rgb(240, 242, 243);"
              ></cell>
              <cell-form-preview
                :list="list1"
                style="background-color: rgb(240, 242, 243);width:92%;height:120px; border-radius: 0 0 15px 15px;"
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

const map = {
  早餐: "40%",
  午餐: "20%",
  晚餐: "18%"
};
const map1 = {
  蛋白质: "40%",
  脂肪: "20%",
  碳水: "18%"
};

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
      fh: require("../images/return.png"),
      legendOptions: {
        position: "left",
        right: "50px",
        itemFormatter(val) {
          return val + "  " + map[val];
        }
      },
      legendOptions1: {
        position: "left",
        right: "50px",
        itemFormatter(val) {
          return val + "  " + map1[val];
        }
      },
      yOptions: {
        formatter(val) {
          return val * 100 + "%";
        }
      },
      map,
      data: [
        { name: "早餐", percent: 30, a: "1" },
        { name: "午餐", percent: 30, a: "1" },
        { name: "晚餐", percent: 40, a: "1" }
      ],
      map1,
      data1: [
        { name: "蛋白质", percent: 30, a: "1" },
        { name: "脂肪", percent: 30, a: "1" },
        { name: "碳水", percent: 40, a: "1" }
      ],
      all_rl: 0,
      list: null,
      list1: [
        {
          label: "蛋白质",
          value: "3.29"
        },
        {
          label: "脂肪",
          value: "1.04"
        },
        {
          label: "碳水",
          value: "8.00"
        }
      ]
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
    this.all_rl = foodall;
    console.log(breaks_p);

    this.data = [
      { name: "早餐", percent: breaks_p, a: "1" },
      { name: "午餐", percent: lunchs_p, a: "1" },
      { name: "晚餐", percent: dinners_p, a: "1" }
    ];
    this.map = {
      早餐: this.data[0].percent,
      午餐: this.data[1].percent,
      晚餐: this.data[2].percent
    };
    this.list = [
      {
        label: "早餐",
        value: breaks
      },
      {
        label: "午餐",
        value: lunchs
      },
      {
        label: "晚餐",
        value: dinners
      }
    ];
    console.log(this.data);
    console.log(this.map);
  },
  methods: {
    onReturn() {
      this.$router.replace("/jilu-food-sport");
    }
  }
};
</script>
<style lang="css" scoped>
.head_rl {
  font-size: 22px;
  margin: 10px 0 10px 18px;
  display: block;
}
.rl {
  background-color: white;
  width: 94%;
  height: 560px;
  border-radius: 25px;
  margin: auto;
  margin-bottom: 30px;
}
.titler {
  font-size: 16px;
  margin: 20px 0 0 20px;
  color: black;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
