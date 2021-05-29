<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="完善个人信息"
    ></x-header>
    <flexbox orient="vertical">
      <h4>我的宣言</h4>
      <div>
        <group>
          <group>
            <x-textarea
              @on-change="onChange()"
              v-model="xuan"
              :max="20"
              placeholder="请输入宣言"
              @on-focus="onEvent('focus')"
              @on-blur="onEvent('blur')"
            ></x-textarea>
          </group>
        </group>
      </div>

      <x-button
        @click.native="save()"
        text="完成"
        type="primary"
        style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
      ></x-button>
    </flexbox>
    <toast v-model="show1" @on-hide="onHide">修改宣言成功</toast>
  </div>
</template>
<script>
import { XTextarea, Group,Toast } from "vux";

export default {
  components: {
    XTextarea,
    Group,
    Toast
  },
  data() {
    return {
      xuanyan: null,
      u_name: null,
      xuan: null,
      show1: false
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
        this.xuanyan = res.data.xuanyan;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onEvent(event) {
      console.log("on", event);
    },
    onChange() {
      console.log(this.xuan);
    },
    save() {
      console.log(this.xuan);

      const user_xuan = {
        user_name: this.u_name,
        xuanyan: this.xuan
      };

      this.axios({
        method: "post",
        url: "/user/update_xuan",
        data: user_xuan
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
