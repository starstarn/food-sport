<template lang="">
  <div :style="backgroundDiv">
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
    <div style="margin:80px auto;text-align:center;">
      <span>{{ nickname }}</span>
      <br />
      <span><span style="font-size:18px;">您的bmi是 </span>{{ bmi }}</span>
      <br />
      <span><span style="font-size:18px;">您的体质属于</span>{{ degree }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: null,
      bmi: null,
      nickname: null,
      fh: require("../images/return.png"),
      degree: null,
      backgroundDiv: {
        backgroundImage: "url(" + require("../images/xin.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        width: "100%",
        height: "620px",
        marginTop: "50px"
      }
    };
  },
  created() {
    this.username = localStorage.getItem("user_name");
    console.log(this.username);
    const user_name = {
      user_name: this.username
    };

    this.axios({
      method: "post",
      url: "/user/sel_user",
      data: user_name
    })
      .then(res => {
        console.log(res);
        this.bmi = res.data.bmi;
        this.nickname = res.data.nick_name;

        if (this.bmi <= 18.4) {
          this.degree = "偏瘦";
        }
        //正常 18.5-23.9
        if (this.bmi >= 18.5 && this.bmi <= 23.9) {
          this.degree = "正常";
        }
        //过胖 24.0-27.9
        if (this.bmi >= 24.0 && this.bmi <= 27.9) {
          this.degree = "过胖";
        }
        //肥胖 >=28.0
        if (this.bmi >= 28.0) {
          this.degree = "肥胖";
        }
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
  background-image: url("../images/xin.png");
  background-size: 100% 100%;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
