<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="修改密码"
    ></x-header>
    <flexbox orient="vertical">
      <div>
        <group title="set min=2 and max=5">
          <x-input
            title="密码"
            type="password"
            placeholder="请输入密码"
            v-model="password"
            style="width:90%;height:30px;background-color:white;border:1px gray solid; margin:0 auto;margin-top:30px;font-size:20px;"
          ></x-input>
          <x-input
            title="密码"
            type="password"
            placeholder="请输入密码"
            v-model="password"
            style="width:90%;height:30px;background-color:white;border:1px gray solid;margin:0 auto;font-size:20px;"
          ></x-input>
        </group>
      </div>

      <x-button
        text="完成"
        link="/birthday"
        type="primary"
        style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
      ></x-button>
    </flexbox>
  </div>
</template>
<script>
import { XInput } from "vux";

export default {
  components: {
    XInput
  }
};
</script>
<style lang="css">
body {
  background-color: rgb(240, 240, 240);
}
h4 {
  font-size: 24px;
  font-weight: 400;
  margin: 30px 0 0 0;
}
</style>
