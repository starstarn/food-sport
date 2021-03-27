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
    <p>食物推荐榜 <button>更多></button></p>

    <badge
      text="水果"
      style="background-color:rgb(241, 242, 243); color:black;padding: 4px;"
    ></badge>

    <p>大家都在搜</p>
    <badge
      text="鸡蛋"
      style="background-color:rgb(241, 242, 243); color:black;padding: 4px;"
    ></badge>
  </div>
</template>
<script>
import { Search, Badge } from "vux";

export default {
  components: {
    Search,
    Badge
  }
};
</script>
<style lang="css">
.in {
  color: rgb(241, 242, 243);
}
body {
  background-color: white;
}
p {
  margin: 20px 0;
}
button {
  float: right;
  margin-right: 10px;
}
</style>
