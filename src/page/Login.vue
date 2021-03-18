<template lang="">
  <div class="nav">
    登录
    <tab>
      <tab-item selected @on-item-click="onItemClick">注册</tab-item>
      <tab-item @on-item-click="onItemClick">登录</tab-item>
    </tab>
    <flexbox orient="vertical">
      <group>
        <x-input
          placeholder="请输入账号"
          v-model="login"
          style="background-color:rgb(236, 238, 240);margin: 25px 0;width: 100%;border-radius:25px;"
        ></x-input>
        <x-input
          title="密码"
          type="password"
          placeholder="请输入密码"
          v-model="password"
          style="background-color:rgb(236, 238, 240);width: 85%;border-radius:25px;"
        ></x-input>
      </group>
      <x-button
        text=">"
        link="/"
        type="primary"
        style="border-radius:100px; position:fixed; width:100px; height:100px;bottom:280px;"
      ></x-button>
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
<style lang="">
.nav {
  background-color: white;
}
.in {
  color: rgb(236, 238, 240);
}
</style>
