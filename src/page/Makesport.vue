<template lang="">
  <div>
    <div
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">添加自定义运动</span>
    </div>
    <h5>基本信息（必填）</h5>
    <group>
      <x-input
        @on-blur="onBlur"
        @on-focus="onFocus"
        @on-change="change"
        title="运动名称"
        v-model="f_name"
        placeholder="       如：健身操"
        style="height:50px;"
      ></x-input>
      <x-input
        disabled
        @on-blur="onBlur"
        @on-focus="onFocus"
        @on-change="change"
        title="单位(固定60分钟)"
        v-model="f_danwei"
        placeholder="分钟"
        style="height:50px;color:red;"
      ></x-input>
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
import { Group, XInput, Selector,Toast } from "vux";

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
      f_rl: null,
      f_danwei: "分钟",
      fh: require("../images/return.png"),
      show: false
    };
  },
  methods: {
    onReturn() {
      this.$router.replace("/add-sport");
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
    makeFood() {
      if (!this.f_name || !this.f_rl || !this.f_danwei) {
        this.show = !this.show;
      } else {
        const user_name = localStorage.getItem("user_name");
        console.log(this.f_name + this.f_rl + this.f_danwei);
        const u_sports = {
          name: this.f_name,
          rl: parseInt(this.f_rl),
          danwei: this.f_danwei,
          user_name: user_name,
          image:"set_sport"
        };

        this.axios({
          method: "post",
          url: "/makesport",
          data: u_sports
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
        this.$router.replace("/add-sport");
      }
    }
  }
};
</script>
<style lang="css">
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
