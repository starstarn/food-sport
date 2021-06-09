<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="完善个人信息"
    ></x-header>
    <flexbox orient="vertical">
      <h4>昵称</h4>
      <div>
        <group>
          <x-input
            @on-blur="onBlur"
            @on-focus="onFocus"
            @on-change="change"
            v-model="ni_name"
            title="昵称"
            :placeholder="n_name"
            :min="2"
            :max="20"
            style="width:90%;height:30px;border:1px gray solid;font-size:20px;"
          ></x-input>
        </group>
      </div>

      <x-button
        @click.native="save()"
        text="完成"
        type="primary"
        style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
      ></x-button>
    </flexbox>

    <toast v-model="show1" @on-hide="onHide">修改昵称成功</toast>
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
      show1: false,
      n_name: null,
      ni_name: null,
      u_name: null
    };
  },
  created() {
    this.u_name = localStorage.getItem("user_name");
    const user_name = {
      user_name: this.u_name
    };
    this.axios({
      method: "post",
      url: "/user/sel_user",
      data: user_name
    })
      .then(res => {
        console.log(res);
        this.n_name = res.data.nick_name;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    change(val) {
      //console.log("on change", val);
      // console.log(this.number + this.password);
    },
    onBlur(val) {
      console.log("on blur", val);
    },
    onFocus(val, $event) {
      console.log("on focus", val, $event);
    },
    save() {
      console.log(this.ni_name);
      const user_nick = {
        user_name: this.u_name,
        nick_name: this.ni_name
      };
      this.axios({
        method: "post",
        url: "/user/update_nick",
        data: user_nick
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      this.show1 = !this.show1;
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
</style>
