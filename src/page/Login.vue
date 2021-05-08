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
      </group>
      <x-button
        @click.native="login()"
        text="登录"
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
      info: {
        user_name: null,
        user_password: null
      },
      imgUrl: require("../images/mika.jpg")
    };
  },
  methods: {
    change(val) {
      console.log("on change", val);
      // console.log(this.number + this.password);
    },
    onBlur(val) {
      console.log("on blur", val);
    },
    onFocus(val, $event) {
      console.log("on focus", val, $event);
    },
    dl() {
      this.$router.replace("/register");
    },
    login() {
      console.log(this.info);
      if (!this.info.user_name || !this.info.user_password) {
        console.log("账号或密码不能为空");
      } else {
        /* this.axios
          .get("/test")
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error.response);
          }); */

        this.axios({
          method: "post",
          url: "/user/login",
          data: this.info
        })
          .then(res => {
            console.log(res.data);
            if (res.data.msg === "请求成功") {
              alert("登录成功");
              localStorage.setItem("user_name", this.info.user_name);
              this.$router.replace("/");
            } else {
              alert("账号或密码错误");
              console.log(error);
            }
          })
          .catch(error => {
            // alert("账号或密码错误");
            console.log(error);
          });
      }
    }
  }
};
</script>
<style lang="css" scoped>
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
