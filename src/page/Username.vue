<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="完善个人信息"
    ></x-header>
    <flexbox orient="vertical">
      <h4>用户名/昵称</h4>
      <div>
        <group title="set min=2 and max=5">
          <x-input
            title="name"
            placeholder="请输入昵称"
            :min="5"
            :max="20"
            style="width:90%;height:30px;background-color:white;border:1px gray solid;margin:20px auto;font-size:20px;"
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
