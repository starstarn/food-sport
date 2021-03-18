<template lang="">
  <div>
    <x-header style="background-color:green; color:white;"></x-header>
    <x-progress percent="20"></x-progress>
    <flexbox orient="vertical">
      <h3>您的性别是？</h3>
      <span>男女对食物热量需求不一样，请正确填写</span>
      <h4>您的身高是？</h4>
      <p class="info" style="font-size:30px;color:green;">{{ value }}.0厘米</p>
    </flexbox>
    <Range v-model="value" :min="60" :max="220" :range-bar-height="4"></Range>
    <x-button
      text="下一步"
      link="/birthday"
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
      value: 160
    };
  }
};
</script>
<style lang="css">
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
</style>
