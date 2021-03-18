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
  </div>
</template>
<script>
import { Search } from "vux";

export default {
  components: {
    Search
  }
};
</script>
<style lang=""></style>
