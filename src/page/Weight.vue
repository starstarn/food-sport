<template lang="">
  <div>
    <x-header style="background-color:green; color:white;"></x-header>
    <x-progress :percent=75></x-progress>
    <flexbox orient="vertical">
      <h3>你今天的体重是？</h3>
      <label>体重仅自己可见，请放心填写</label>
      <p class="info">{{ value }}.0<span>公斤</span></p>
    </flexbox>
    <Range
      @on-change="Onchange"
      v-model="value"
      :min="30"
      :max="100"
      :range-bar-height="4"
    ></Range>
    <x-button
      @click.native="weight()"
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
      value: 50
    };
  },
  methods: {
    Onchange(value) {
      console.log(value);
    },
    weight() {
      const weight = this.value;
      localStorage.setItem("weight", weight); //将变量存储到height字段
      console.log("保存体重");
      //link="/goal"
       this.$router.replace("/finish");
    }
  }
};
</script>
<style lang="css" scoped>
h3 {
  margin-top: 15px;
}
label {
  margin: 20px 0;
  font-size: 14px;
}
p {
  font-size: 30px;
  color: green;
  margin-bottom: 15px;
}
span {
  font-size: 1px;
  color: green;
}
</style>
