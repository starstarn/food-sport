<template lang="">
  <div>
    <x-header style="background-color:green; color:white;"></x-header>
    <x-progress percent="60"></x-progress>
    <flexbox orient="vertical">
      <h3>你今天的体重是？</h3>
      <label>体重仅自己可见，请放心填写</label>
      <p class="info" style="font-size:30px;color:green;">{{ value }}公斤</p>
    </flexbox>
    <Range v-model="value" :min="30" :max="100" :range-bar-height="4"></Range>
    <x-button
      text="下一步"
      link="/goal"
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
  }
};
</script>
<style lang=""></style>
