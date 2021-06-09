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
      <span style="position:absolute;left:45%;">个人信息</span>
    </div>
    <group style="font-size:18px;">
      
      <cell
        :link="{ path: '/user-name' }"
        title="昵称"
        :value="nick_name"
        is-link
        style="padding:15px 15px;"
      ></cell>
      <cell
        :link="{ path: '/user-declaration' }"
        title="我的宣言"
        :value="xuanyan"
        is-link
        style="padding:15px 15px;"
      ></cell>
    </group>
  </div>
</template>
<script>
import { Group, CellBox, Cell } from "vux";

export default {
  components: {
    Group,
    CellBox,
    Cell
  },
  data() {
    return {
      imgUrl: require("../images/mika.jpg"),
      fh: require("../images/return.png"),
      nick_name: null,
      xuanyan: null
      //xuanyan,
    };
  },
  created() {
    const u_name = localStorage.getItem("user_name");
    const user_name = {
      user_name: u_name
    };
    this.axios({
      method: "post",
      url: "/user/sel_user",
      data: user_name
    })
      .then(res => {
        console.log(res);
        this.nick_name = res.data.nick_name;
        this.xuanyan = res.data.xuanyan;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    onReturn() {
      this.$router.replace("/my");
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
