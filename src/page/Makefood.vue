<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="添加自定义食物"
    ></x-header>
    <h5>基本信息（必填）</h5>
    <group>
      <x-input
        @on-blur="onBlur"
        @on-focus="onFocus"
        @on-change="change"
        title="食物名称"
        v-model="f_name"
        placeholder="       如：水果沙拉"
        style="height:50px;"
      ></x-input>
      <selector
        title="单位"
        :options="['克', '毫升']"
        v-model="f_danwei"
        style="height:50px;"
      ></selector>
      <x-input
        @on-blur="onBlur"
        @on-focus="onFocus"
        @on-change="change"
        title="热量"
        v-model="f_rl"
        placeholder="       如：100"
        style="height:50px;"
      ></x-input>
    </group>
    <x-button
      @click.native="makeFood()"
      text="确定"
      type="primary"
      style=" border-radius:99px; width:250px;margin: 50px auto;"
    ></x-button>
    <toast v-model="show" type="warn">每一项都必填！</toast>
  </div>
</template>
<script>
import { Group, XInput, Selector, Toast } from "vux";

export default {
  components: {
    Group,
    XInput,
    Selector,
    Toast
  },
  data() {
    return {
      value1: 2,
      f_name: null,
      f_danwei: "克",
      f_rl: null,
      show: false
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
    makeFood() {
      if (!this.f_name || !this.f_rl || !this.f_danwei) {
        this.show = !this.show;
      } else {
        console.log("添加食物");
        const user_name = localStorage.getItem("user_name");
        console.log(this.f_name + this.f_rl + this.f_danwei);
        const u_foods = {
          name: this.f_name,
          rl: parseInt(this.f_rl),
          danwei: this.f_danwei,
          user_name: user_name
        };

        this.axios({
          method: "post",
          url: "/makefood",
          data: u_foods
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
        this.$router.replace("/add-food");
      }
    }
  }
};
</script>
<style lang=""></style>
