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
      <span style="position:absolute;left:45%;">修改密码</span>
    </div>
    <flexbox orient="vertical">
      <div>
        <group
          title="请输入5-8位（可包含字母或数字）"
          style="margin:50px 0 0 0;"
        >
          <x-input
            :min="5"
            :max="8"
            title="密码"
            type="password"
            placeholder="请输入密码"
            v-model="password"
            style="width:90%;height:30px;border:1px gray solid;font-size:20px;"
          ></x-input>
          <!--  <x-input
            title="密码"
            type="password"
            placeholder="请输入密码"
            v-model="password1"
            style="width:90%;height:30px;background-color:white;border:1px gray solid;margin:0 auto;font-size:20px;"
          ></x-input> -->
        </group>
      </div>

      <x-button
        @click.native="save()"
        text="完成"
        type="primary"
        style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
      ></x-button>
    </flexbox>
    <toast v-model="show" type="cancel">{{ text }}</toast>
    <toast v-model="show1" @on-hide="onHide">修改密码成功</toast>
  </div>
</template>
<script>
import { XInput, Group, Toast } from "vux";

export default {
  components: {
    XInput,
    Group,
    Toast
  },
  data() {
    return {
      password: null,
      fh: require("../images/return.png"),
      show: false,
      text: null,
      show1: false
    };
  },
  methods: {
    onReturn() {
      this.$router.replace("/set");
    },
    save() {
      console.log("保存");
      console.log(this.password);

      //正则验证
      let reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(this.password)) {
        this.text = "密码只能包含字母和数字！";
        this.show = !this.show;
      }
      else if (this.password.length < 5) {
        this.text = "密码不能少于5位！";
        this.show = !this.show;
      } else {
        const u_name = localStorage.getItem("user_name");
        const name_pass = {
          user_name: u_name,
          user_password: this.password
        };

        this.axios({
          method: "post",
          url: "/user/update_pass",
          data: name_pass
        })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
        this.show1 = !this.show1;
      }
    },
    onHide(type) {
      console.log("on hide", type);
    }
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
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
