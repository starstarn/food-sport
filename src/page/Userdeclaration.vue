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
              :max="20"
              placeholder="请输入宣言"
              @on-focus="onEvent('focus')"
              @on-blur="onEvent('blur')"
            ></x-textarea>
          </group>
        </group>
      </div>

      <x-button
        text="完成"
        type="primary"
        style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
      ></x-button>
    </flexbox>
  </div>
</template>
<script>
import { XTextarea, Group } from "vux";

export default {
  components: {
    XTextarea,
    Group
  },
  data() {
    return {
      xuanyan: null,
      u_name:null
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
