<template lang="">
  <div>
    <!--  <x-header
      style="background-color:green; color:white;"
      title="食物详情"
    ></x-header> -->

    <div
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">食物详情</span>
    </div>
    <div class="foodheader">
      <img :src="food_img" class="shiwu" />
      <span style="position:absolute;top:65px;">{{ food.name }}</span>
    </div>
    <!-- 热量 -->
    <div class="foodnav">
      <span
        style="font-size:20px;font-weight:600;position:absolute;top:10px;left:15px;"
        >热量</span
      >
      <span style="position:absolute;right:20px;font-size:16px;top:10px;"
        >千卡</span
      >
      <p>
        <span style="position:absolute;right:42%;top:56px;font-size:18px;"
          ><span style="font-size:34px;font-weight:300;">{{ food.rl }}</span>
          千卡</span
        >
      </p>
      <p
        style="position:absolute;right:45%;top:105px;font-size:14px;color:gray;"
      >
        每100克
      </p>
    </div>
    <!-- 营养元素 -->
    <div class="yysy">
      <p>
        <span
          style="font-size:20px;font-weight:600;position:absolute;padding:15px 0 10px 15px;"
          >营养元素 — <span style="font-size:14px;">蛋白质</span></span
        ><span
          style="position:absolute;right:20px;font-size:14px;color:gray;padding:22px 10px 10px 0;"
          >单位：每100克</span
        >
      </p>
      <v-chart prevent-render @on-render="renderChart"></v-chart>
    </div>

    <!-- 细节 -->
    <div class="xq">
      <div
        style="position:relative;color:gray;width:100%;height:50px;background-color:rgb(236, 236, 234);line-height:50px;"
      >
        <span style="position:absolute;left:60px;">营养元素</span
        ><span style="position:absolute;right:60px;">每100克</span>
      </div>

      <div
        style="position:relative;color:gray;width:100%;height:55px;line-height:55px;"
      >
        <span style="position:absolute;left:60px;">热量</span
        ><span style="position:absolute;right:60px;">{{ food.rl }}千卡</span>
      </div>
      <hr />
      <div
        style="position:relative;color:gray;width:100%;height:55px;line-height:55px;"
      >
        <span style="position:absolute;left:60px;">碳水化合物</span
        ><span style="position:absolute;right:60px;">{{ food.shhf}}克</span>
      </div>
      <hr />
      <div
        style="position:relative;color:gray;width:100%;height:55px;line-height:55px;"
      >
        <span style="position:absolute;left:60px;">脂肪</span
        ><span style="position:absolute;right:60px;">{{ food.zf }}克</span>
      </div>
      <hr />

      <div
        style="position:relative;color:gray;width:100%;height:55px;line-height:55px;"
      >
        <span style="position:absolute;left:60px;">胆固醇</span
        ><span style="position:absolute;right:60px;">{{ food.dgc }}毫克</span>
      </div>
      <hr />
      <div
        style="position:relative;color:gray;width:100%;height:55px;line-height:55px;"
      >
        <span style="position:absolute;left:60px;">膳食纤维</span
        ><span style="position:absolute;right:60px;">{{ food.ssxw }}克</span>
      </div>
      <hr />
      <div
        style="position:relative;color:gray;width:100%;height:55px;line-height:55px;"
      >
        <span style="position:absolute;left:60px;">维生素a</span
        ><span style="position:absolute;right:60px;">{{ food.wssa }}微克</span>
      </div>
      <hr />
      <div
        style="position:relative;color:gray;width:100%;height:55px;line-height:55px;"
      >
        <span style="position:absolute;left:60px;">维生素c</span
        ><span style="position:absolute;right:60px;">{{ food.wssc }}微克</span>
      </div>
      <hr />
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
      food: null,
      fh: require("../images/return.png"),
      dbz: null
    };
  },
  created() {
    this.food = JSON.parse(localStorage.getItem("food"));
    console.log(this.food);
    /* const sum = this.food.dbz + this.food.zf + this.food.shhf;
    this.dbz = fomatFloat(this.food.dbz/sum*100, 1); */
    
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
        //content: "85%",
        content: this.food.dbz,
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
    },
    onReturn() {
      this.$router.replace("/food-type");
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
  height: 300px;
  margin: auto;
  border-radius: 10px;
}
.xq {
  width: 100%;
  height: 500px;
  background-color: white;
  font-size: 14px;
}
hr {
  color: rgb(234, 238, 241);
  width: 88%;
  margin: auto;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
