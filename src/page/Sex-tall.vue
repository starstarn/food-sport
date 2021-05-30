<template lang="">
  <div>
    <x-header style="background-color:green; color:white;"></x-header>
    <x-progress :percent="25"></x-progress>
    <flexbox orient="vertical">
      <h3>您的性别是？</h3>
      <div>
        <img
          src="../images/nan.png"
          @click="boy()"
          class="boys"
          style="border:3px green solid;"
        />
        <img src="../images/nv.png" @click="girl()" class="girls" />
        <div>
          <span class="boy" style="color:green;">男</span>
          <span class="girl">女</span>
        </div>
      </div>

      <span>男女对食物热量需求不一样，请正确填写</span>
      <h4>您的身高是？</h4>
      <p class="info" style="font-size:30px;color:green;">{{ value }}.0厘米</p>
    </flexbox>
    <Range
      @on-change="Onchange"
      v-model="value"
      :min="60"
      :max="220"
      :range-bar-height="4"
    ></Range>
    <x-button
      @click.native="sex_tall()"
      text="下一步"
      type="primary"
      style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
    ></x-button>
  </div>
</template>
<script>
import { Range } from "vux";
export default {
  components: {
    Range
  },
  data() {
    return {
      value: 160,
      sex: "男",
      imgUrl: require("../images/mika.jpg")
    };
  },
  methods: {
    Onchange(value) {
      console.log(value);
    },
    sex_tall() {
      const sex = this.sex;
      const value = this.value;
      localStorage.setItem("height", value); //将变量存储到height字段
      localStorage.setItem("sex", sex); //将变量imgs存储到sex字段
      console.log("保存身高性别");
      console.log(this.value + sex);
      this.$router.replace("/birthday");
      // link="/birthday"
    },
    boy() {
      this.sex = "男";
      console.log("男");
      document.querySelector(".boy").style.color = "green";
      document.querySelector(".girl").style.color = "black";
      document.querySelector(".boys").style.border = "3px green solid";
      document.querySelector(".girls").style.border = "none";
    },
    girl() {
      this.sex = "女";
      console.log("女");
      document.querySelector(".girl").style.color = "green";
      document.querySelector(".boy").style.color = "black";
      document.querySelector(".boys").style.border = "none";
      document.querySelector(".girls").style.border = "3px green solid";
    }
  }
};
</script>
<style lang="css" scoped>
h3 {
  margin-top: 15px;
}
span {
  font-size: 14px;
  color: gray;
  margin: 20px 0;
}
p {
  margin: 20px 0;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px white solid;
  margin: 10px 30px 0 30px;
}
.boy,
.girl {
  font-size: 20px;
  margin: 0 72px;
}
.sexs {
  color: rgb(41, 117, 161);
}
</style>
