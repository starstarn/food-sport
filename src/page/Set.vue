<template lang="">
  <div>
    <!--   <x-header
      style="background-color:green; color:white;"
      title="设置"
    ></x-header> -->

    <div
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">设置</span>
    </div>
    <group style="font-size:18px;">
      <!-- <cell title="修改用户名/昵称" style="padding:15px 15px;"></cell> -->
      <cell
        @click.native="xiugai()"
        title="修改密码"
        style="padding:15px 15px;"
      ></cell>
      <cell
        title="注销账号（永久删除账号）"
        style="padding:15px 15px;"
        @click.native="zx()"
      ></cell>
    </group>
    <x-button
    @click.native="tc()"
      plain
      text="退出登录"
      link="/login"
      type="primary"
      style="border-radius:99px;width:180px;margin-top:100px;"
    ></x-button>

    <div v-transfer-dom>
      <confirm
        v-model="show_del"
        theme="android"
        @on-cancel="onCancel"
        @on-confirm="onConfirm"
      >
        <p style="text-align:center;">此行为不可撤销，是否要注销用户？</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import { Group, CellBox, Cell, Confirm } from "vux";

export default {
  components: {
    Group,
    CellBox,
    Cell,
    Confirm
  },
  data() {
    return {
      imgUrl: require("../images/mika.jpg"),
      fh: require("../images/return.png"),
      show_del: false
    };
  },
  methods: {
    onReturn() {
      this.$router.replace("/my");
    },
    xiugai() {
      console.log("修改密码");
      this.$router.replace("/user-password");
    },
    zx() {
      this.show_del = !this.show_del;
    },
    onCancel() {
      console.log("取消删除");
    },
    onConfirm() {
      const u_name = {
        user_name: localStorage.getItem("user_name")
      };
      this.axios({
        method: "post",
        url: "/user/d_user",
        data: u_name
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      this.$router.replace("/login");
    },
    tc(){
      console.log("退出");
    }
  }
};
</script>
<style lang="css" scoped>
body {
  background-color: white;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
