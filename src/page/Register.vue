<template lang="">
  <div>
    <flexbox orient="vertical">
      <div style="background-color:green;width:100%;height:50px;color:white;">
        <span @click="zc()" style="position:absolute;left:20px;font-size:16px;height:50px;line-height:50px;"
          >返回登录</span
        >
        <span style="position:absolute;right:40%;">注册</span>
      </div>
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
          placeholder="密码（5-8位只能包含字母和数字）"
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
      </group>
      <x-button
        @click.native="register()"
        text="下一步"
        type="primary"
        style="width:300px; height:36px; background-color:white;color:green;border-radius:10px;margin:30px 0;"
      ></x-button>
    </flexbox>
    <toast v-model="show" type="cancel">{{ text }}</toast>
  </div>
</template>
<script>
import { XInput, Tab, TabItem, Toast } from "vux";

export default {
  components: {
    XInput,
    Tab,
    TabItem,
    Toast
  },
  data() {
    return {
      info: {
        user_name: null,
        user_password: null,
        user_password1: null,
        nick_name: null
      },
      text: null,
      show: false
    };
  },
  methods: {
    zc() {
      this.$router.replace("/login");
    },
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
      let reg = /^[0-9a-zA-Z]+$/;

      //校验输入
      if (
        !this.info.nick_name ||
        !this.info.user_name ||
        !this.info.user_password ||
        !this.info.user_password1
      ) {
        console.log("不能为空");
      } else if (this.info.user_password !== this.info.user_password1) {
        this.text = "两次密码不一致";
        this.show = !this.show;
      } else if (!reg.test(this.info.user_password)) {
        this.text = "密码只能包含字母和数字！";
        this.show = !this.show;
      } else if (this.info.user_password.length < 5) {
        this.text = "密码不能少于5位！";
        this.show = !this.show;
      } else if (this.info.user_password.length > 8) {
        this.text = "密码不能长于8位！";
        this.show = !this.show;
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
};
</script>
<style lang="css" scoped></style>
