<template lang="">
  <div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
    ></search>
    <cell>
      <badeg style="background-color:pink;">11</badeg>
    </cell>
  </div>
</template>
<script>
import { Search, Cell, Badge } from "vux";

export default {
  components: {
    Search,
    Cell,
    Badge
  }
};
</script>
<style lang=""></style>
