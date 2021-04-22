<template lang="">
  <div>
    能量显示
    <div class="card">
      <div style="margin:50px 0 0 30px;">
        <span class="title">饮食摄入</span>
        <span>1000</span>
      </div>

      <div style="width:140px;height:140px;margin:auto;margin-top:30px;">
        <x-circle
          :percent="percent"
          :stroke-width="6"
          :trail-width="6"
          :stroke-color="['#36D1DC', '#5B86E5']"
          trail-color="#ececec"
        >
          <span style="color:grey;font-size:16px;">
            还可以吃
            <br />
            {{ percent }}
            <br />
            推荐预算</span
          >
        </x-circle>
      </div>
      <div style="margin:50px 0 0 30px;">
        <span class="title">运动消耗</span>
        <span>1000</span>
      </div>
    </div>

    <div>
      <group title="$t('Use is-link to show arrow')">
        <cell is-link>
          <span slot="title" style="color:green;"
            ><span style="vertical-align:middle;">{{ 53 }}</span>
            <badge text="1"></badge
          ></span>
        </cell>
        <cell title="早餐" is-link></cell>
        <cell title="牛奶" is-link style="font-size:16px;"></cell>
        </cell>
      </group>
    </div>
    <div style="position:fixed; bottom:0;">
    <img :src="zf" @click="zaofan()" class="tp"/><img :src="wf" @click="wufan()" class="tp"/><img :src="wanf" @click="wanfan()" class="tp"/><img :src="sport" @click="sport1()" class="tp"/> 
      </div>
  </div>
</template>
<script>
import { XCircle, Cell } from "vux";

export default {
  components: {
    XCircle,
    Cell
  },
  data() {
    return {
      percent: 80,
      zf: require("../images/早饭.jpg"),
      wf: require("../images/午饭.jpg"),
      wanf: require("../images/晚饭.jpg"),
      sport: require("../images/运动.jpg")
    };
  },
  methods:{
    zaofan(){
      console.log("zao");
      this.$router.replace("/add-food");
      localStorage.setItem("type", '早饭'); //将变量存储到字段
          
    },
    wufan(){
      console.log("wu");
      this.$router.replace("/add-food");
      localStorage.setItem("type", '午饭'); //将变量存储到字段
    },
    wanfan(){
      console.log("wan");
      this.$router.replace("/add-food");
      localStorage.setItem("type", '晚饭'); //将变量存储到字段
    },
    sport1(){
      console.log("sport");
      this.$router.replace("/add-sport");
    }
  }
};
</script>
<style lang="css">
.card {
  border: 1px gainsboro solid;
  border-radius: 20px;
  width: 90%;
  height: 180px;
  display: flex;
  flex-direction: row;
}
.title {
  font-size: 14px;
  color: gray;
}
.tp{
  width: 25%;
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
