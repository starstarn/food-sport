<template lang="">
  <div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
    ></search>
    <!-- <flexbox orient="vertical">
      <flexbox> -->
    <div class="header"></div>
    <div class="nav"></div>
    <!-- 卡片 -->
    <div class="card">
      <span class="head">体重管理</span> <span class="danwei">单位：公斤</span>
      <br />
      <div style="position: absolute;left:13%;top:70px;">
        <span class="weight">{{ weight }}</span>
        <br />
        <label>当前</label>
      </div>

      <div style="position: absolute;left:42%;top:38px;text-align:center;">
        <div style="width:70px;height:70px;margin:auto;">
          <x-circle
            :percent="percent"
            :stroke-width="6"
            :trail-width="6"
            :stroke-color="['#36D1DC', '#5B86E5']"
            trail-color="#ececec"
          >
            <span v-if="percent >= 0" style="color:#36D1DC">{{ percent }}</span>
            <span v-else style="color:#36D1DC">{{ -percent }}</span>
          </x-circle>
        </div>
        <label v-if="percent >= 0">需减去</label>
        <label v-else>需增重</label>
      </div>

      <div style="position: absolute;right:13%;top:70px;">
        <span class="weight">{{ s_weight }}</span>
        <br />
        <label>目标</label>
      </div>
    </div>

    <!-- 健康记录 -->
    <div class="jilu">
      <div class="neirong">
        <div style="margin:0 0 5px 3px;">
          <div
            style="width:7px;height:17px;border-radius:5px;background-color:green;display:inline-block;"
          ></div>
          <span class="title">健康记录</span>
        </div>
        <div class="xiang" @click="jilu()">
          <label>饮食&运动</label>
          <br />
          <label
            >还可以吃<span> {{ 2085 }}</span
            >千卡</label
          >
        </div>
        <hr />
        <div class="xiang">
          <label>体重</label>
          <br />
          <label
            ><span> {{ weight }}</span
            >公斤</label
          >
        </div>
        <hr />
        <div class="xiang">
          <label>心情</label>
          <br />
          <label>：<span> 开心</span></label>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import { Search, Group, Cell, XCircle } from "vux";

export default {
  components: {
    Search,
    Group,
    Cell,
    XCircle
  },
  data() {
    return {
      percent: 80,
      weight: null,
      s_weight: null,
      intake: null
    };
  },
  created() {
    /* this.axios.get("/foods").then(function(res) {
      console.log(res);
    }); */
    const weight = localStorage.getItem("weight");
    const s_weight = localStorage.getItem("s_weight");
    console.log(weight + s_weight);
    this.weight = weight;
    this.s_weight = s_weight;
    this.percent = this.weight - this.s_weight;
  },
  methods: {
    jilu() {
      this.$router.replace("/jilu-food-sport");
    }
  }
};
</script>
<style lang="css">
.header {
  width: 100%;
  height: 200px;
  background-color: rgb(49, 57, 73);
  position: fixed;
  top: 0;
}
.nav {
  width: 100%;
  height: 600px;
  background-color: rgb(229, 230, 227);
  position: fixed;
  top: 200px;
}
.jilu {
  width: 94%;
  height: 400px;
  position: absolute;
  margin: 0 auto;
  left: 3%;
  background-color: rgb(241, 241, 241);
  border-radius: 8px;
}
.neirong {
  width: 92%;
  height: 350px;
  position: absolute;
  top: 4%;
  left: 4%;
}
.title {
  font-weight: 500;
  font-size: 18px;
}
.xiang {
  width: 100%;
  height: 80px;
}
.xiang label {
  font-size: 14px;
  color: gray;
  margin: 5px 8px;
}
.xiang span {
  color: black;
  font-size: 18px;
}
hr {
  color: rgb(200, 202, 202);
  width: 85%;
}
.card {
  background-color: rgb(127, 197, 185);
  width: 85%;
  height: 155px;
  border-radius: 12px;
  color: white;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  margin-bottom: 10px;
}
.head {
  position: absolute;
  /* left: 0px;
  top: 0px; */
  padding: 4px 7px;
  font-size: 18px;
  font-family: "微软雅黑,宋体";
  border-radius: 10px 0 10px 0;
  border: 1px white solid;
  box-shadow: 1px 1px 1px rgb(126, 168, 168);
}
.danwei {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 14px;
}
.card label {
  font-size: 14px;
}
.weight {
  font-size: 24px;
}
span,
label {
  margin: 0;
  padding: 0;
}
.part {
  color: gray;
}
.part label {
  padding: 20px 0;
}
.vux-cell-bd vux-cell-primary {
  width: 0;
}
</style>
