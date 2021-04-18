<template lang="">
  <div>
    <flexbox orient="vertical">
      <span style="margin:25px 0 20px 0;">注册</span>
      <group>
        <x-input
          @on-blur="onBlur"
          @on-focus="onFocus"
          @on-change="change"
          placeholder="请输入昵称"
          v-model="info.nick_name"
          style="font-size:18px; background-color:rgb(236, 238, 240);margin: 25px auto;width: 90%;  height:30px; border-radius:20px;"
        ></x-input>
        <x-input
          @on-blur="onBlur"
          @on-focus="onFocus"
          @on-change="change"
          placeholder="请输入账号"
          v-model="info.user_name"
          style="font-size:18px; background-color:rgb(236, 238, 240);margin: 25px auto;width: 90%;  height:30px; border-radius:20px;"
        ></x-input>
        <x-input
          @on-blur="onBlur"
          @on-focus="onFocus"
          @on-change="change"
          title="密码"
          type="password"
          placeholder="请输入密码"
          v-model="info.user_password"
          style="font-size:18px; background-color:rgb(236, 238, 240);margin: 25px auto;width: 90%;  height:30px; border-radius:20px;"
        ></x-input>
        <x-input
          @on-blur="onBlur"
          @on-focus="onFocus"
          @on-change="change"
          title="请再次输入"
          type="password"
          placeholder="必填"
          v-model="info.user_password1"
          style="font-size:18px; background-color:rgb(236, 238, 240);margin: 25px auto;width: 90%;  height:30px; border-radius:20px;"
        ></x-input>
        <x-button
          @click.native="register()"
          text="下一步"
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
      info: {
        user_name: null,
        user_password: null,
        user_password1: null,
        nick_name: null
      }
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
    register() {
      if (
        !this.info.nick_name ||
        !this.info.user_name ||
        !this.info.user_password ||
        !this.info.user_password1
      ) {
        console.log("不能为空");
      } else {
        if (this.info.user_password !== this.info.user_password1) {
          console.log("两次密码不一致");
        } else {
          console.log(this.info);

          const user_name = this.info.user_name;
          const nick_name = this.info.nick_name;
          const user_password = this.info.user_password;
          localStorage.setItem("user_name", user_name); //将变量存储到height字段
          localStorage.setItem("nick_name", nick_name); //将变量imgs存储到sex字段
          localStorage.setItem("user_password", user_password); //将变量imgs存储到sex字段
          this.$router.replace("/sex-tall");
        }
      }
    }
  }
};
</script>
<style lang=""></style>
