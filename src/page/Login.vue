<template lang="">
  <div class="nav">
    <flexbox orient="vertical">
      <span style="padding:15px 0 30px 0;">登录</span>
      <span
        @click="dl"
        style="position:absolute; right:20px;top:20px;font-size:18px;"
        >注册</span
      >
      <img :src="imgUrl" />
      <group>
        <x-input
          placeholder="请输入账号"
          v-model="login"
          style="font-size:18px; background-color:rgb(236, 238, 240);margin: 25px auto;width: 90%;  height:30px; border-radius:20px;"
        ></x-input>
        <x-input
          title="密码"
          type="password"
          placeholder="请输入密码"
          v-model="password"
          style="font-size:18px; background-color:rgb(236, 238, 240);margin: 25px auto;width: 90%;  height:30px; border-radius:20px;"
        ></x-input>
      </group>
      <x-button
        text="登录"
        link="/"
        type="primary"
        style="width:300px; height:36px; background-color:white;color:black;border-radius:10px;margin:30px 0;"
      ></x-button>
      <button>忘记密码</button>
    </flexbox>
  </div>
</template>
<script>
import { XInput, Tab, TabItem } from "vux";

export default {
  components: {
    XInput,
    Tab,
    TabItem
  },
  data() {
    return {
      login: null,
      password: null,
      imgUrl: require("../images/mika.jpg")
    };
  },
  methods: {
    change(val) {
      console.log("on change", val);
    },
    onBlur(val) {
      console.log("on blur", val);
    },
    onFocus(val, $event) {
      console.log("on focus", val, $event);
    },
    onEnter(val) {
      console.log("click enter!", val);
    },
    dl() {
      this.$router.replace("/register");
    }
  }
};
</script>
<style lang="css">
body {
  background-color: rgb(146, 212, 175);
}

.in {
  color: rgb(236, 238, 240);
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px white solid;
}
</style>
