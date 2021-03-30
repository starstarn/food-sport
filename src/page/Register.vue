<template lang="">
  <div>
    <flexbox orient="vertical">
      <span style="margin:25px 0 20px 0;">注册</span>
      <group>
        <x-input
          placeholder="请输入昵称"
          v-model="name"
          style="font-size:18px; background-color:rgb(236, 238, 240);margin: 25px auto;width: 90%;  height:30px; border-radius:20px;"
        ></x-input>
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
        <x-input
          title="请再次输入"
          type="password"
          placeholder="必填"
          v-model="password"
          style="font-size:18px; background-color:rgb(236, 238, 240);margin: 25px auto;width: 90%;  height:30px; border-radius:20px;"
        ></x-input>
        <x-button
          text="下一步"
          link="/sex-tall"
          type="primary"
          style="width:300px; height:36px; background-color:white;color:black;border-radius:10px;margin:30px 0;"
        ></x-button>
      </group>
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
      name: null,
      login: null,
      password: null
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
    }
  }
};
</script>
<style lang=""></style>
