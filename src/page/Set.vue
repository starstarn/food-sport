<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="设置"
    ></x-header>
    <group style="font-size:18px;">
      <cell title="修改用户名/昵称" style="padding:15px 15px;"></cell>
      <cell title="修改密码" style="padding:15px 15px;"></cell>
      <cell title="注销账号（永久删除账号）" style="padding:15px 15px;"></cell>
    </group>
    <x-button
      plain
      text="退出登录"
      link="/birthday"
      type="primary"
      style="border-radius:99px;width:180px;margin-top:100px;"
    ></x-button>
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
