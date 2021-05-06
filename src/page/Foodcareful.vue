<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="食物详情"
    ></x-header>
    <div class="foodheader">
      <img :src="food_img" class="shiwu" />
      <span style="position:absolute;top:65px;">{{food.name}}</span>
    </div>
    <!-- 热量 -->
    <div class="foodnav">
      <span style="font-size:20px;font-weight:600;position:absolute;"
        >热量</span
      >
      <span style="position:absolute;right:20px;">千卡</span>
      <p>
        <span style="position:absolute;right:50%;top:56px;"
          ><span style="font-size:34px;font-weight:300;">{{food.rl}}</span>千卡</span
        >
      </p>
      <p
        style="position:absolute;right:50%;top:105px;font-size:14px;color:gray;"
      >
        每100克
      </p>
    </div>
    <!-- 营养元素 -->
    <div class="yysy">
      <p>
        <span style="font-size:20px;font-weight:600;position:absolute;padding:15px 0 10px 15px;"
          >营养元素</span
        ><span style="position:absolute;right:20px;font-size:14px;color:gray;padding:22px 10px 10px 0;">单位：每100克</span>
      </p>
      <v-chart prevent-render @on-render="renderChart"></v-chart>
    </div>
  </div>
</template>
<script>
import { VChart } from "vux";
export default {
  components: {
    VChart
  },
  data() {
    return {
      food_img: require("../images/mika.jpg"),
      food: null
    };
  },
  created() {
    this.food = localStorage.getItem("food");
    console.log(this.food)
  },
  methods: {
    renderChart({ chart }) {
      const data = [{ x: "1", y: 85 }];
      chart.source(data, {
        y: {
          max: 100,
          min: 0
        }
      });
      chart.axis(false);
      chart.tooltip(false);
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.01,
        radius: 0.85
      });
      chart.guide().arc({
        start: [0, 0],
        end: [1, 99.98],
        top: false,
        style: {
          lineWidth: 6,
          stroke: "#ccc"
        }
      });
      chart.guide().text({
        position: ["50%", "50%"],
        content: "85%",
        style: {
          fontSize: 24,
          fill: "#1890FF"
        }
      });
      chart
        .interval()
        .position("x*y")
        .size(6)
        .animate({
          appear: {
            duration: 1200,
            easing: "cubicIn"
          }
        });
      chart.render();
    }
  }
};
</script>
<style lang="css">
.foodheader {
  width: 100%;
  height: 100px;
  background-color: white;
}
.shiwu {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin: 20px;
}
.foodnav {
  position: relative;
  width: 90%;
  height: 160px;
  background-color: white;
  margin: 20px;
  border-radius: 10px;
}
.yysy {
  width: 90%;
  height: 150px;
  margin: auto;
  border-radius: 10px;
}
</style>
