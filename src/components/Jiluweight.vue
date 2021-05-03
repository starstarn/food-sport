<template lang="">
  <!-- 弹出记录体重-->
  <div class="toast" v-show="shows">
    <p style="font-size:20px;color:gray;padding:15px 0;">
      <span style="margin:10px 0 0 20px;" @click="close">取消</span>
    </p>
    <group>
      <x-number title="title" v-model="value"></x-number>
    </group>
  </div>
</template>
<script>
import { Search, Group, Cell, XCircle, XNumber } from "vux";
import Vue from "vue";
export default {};
</script>
<style lang=""></style>
