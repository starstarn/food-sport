<template lang="">
  <div>
    <group>
      <x-input
        title="title"
        placeholder="请输入账号"
        v-model="value"
        style="background-color:pink;"
      ></x-input>
    </group>
  </div>
</template>
<script>
import { XInput } from "vux";

export default {
  components: {
    XInput
  },
  data() {
    return {
      value: null
    };
  }
};
</script>
<style lang=""></style>
