<template lang="">
  <div>
    注册
    <tab>
      <tab-item selected @on-item-click="onItemClick">注册</tab-item>
      <tab-item @on-item-click="onItemClick">登录</tab-item>
    </tab>
    <flexbox orient="vertical">
      <group>
        <x-input placeholder="请输入昵称" v-model="name"></x-input>
        <x-input
          title="账号"
          placeholder="请输入账号"
          v-model="login"
        ></x-input>
        <x-input
          title="密码"
          type="password"
          placeholder="必填"
          v-model="password"
        ></x-input>
        <x-input
          title="请再次输入"
          type="password"
          placeholder="必填"
          v-model="password"
        ></x-input>
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
