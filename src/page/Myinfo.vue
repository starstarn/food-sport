<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="个人信息"
    ></x-header>
    <group style="font-size:18px;">
      <cell title="头像" :value="imgUrl" is-link style="padding:25px 15px;"></cell>
      <cell title="用户名/昵称" value="tiamo" is-link style="padding:15px 15px;"></cell>
      <cell title="我的宣言" value="happy" is-link style="padding:15px 15px;"></cell>
    </group>
  </div>
</template>
<script>
import { Group, CellBox, Cell } from "vux";

export default {
  components: {
    Group,
    CellBox,
    Cell
  },
   data() {
    return {
      imgUrl: require("../images/mika.jpg")
    };
  }
};
</script>
<style lang="css">
body {
  background-color: white;
}
</style>
