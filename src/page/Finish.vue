<template lang="">
  <div>
    <x-header style="background-color:green; color:white;"></x-header>
    <x-progress :percent="100"></x-progress>
    <flexbox orient="vertical">
      <h4>填写完毕</h4>
    </flexbox>
    <x-button
      @click.native="save_info()"
      text="进入"
      type="primary"
      style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
    ></x-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    save_info() {
      console.log("保存信息");
      const user_name = localStorage.getItem("user_name"); //获取指定key本地存储的值
      const user_password = localStorage.getItem("user_password");
      const nick_name = localStorage.getItem("nick_name");
      const sex = localStorage.getItem("sex"); //获取指定key本地存储的值
      const height = parseInt(localStorage.getItem("height"));
      const birthday = localStorage.getItem("birthday");
      const weight = parseInt(localStorage.getItem("weight"));
      const begin_weight = weight;
      console.log(
        user_name + user_password + nick_name + sex + height + birthday + weight
      );
      const bmi = weight / ((height / 100) * (height / 100));
      const s_weight = height - 105;
      // const kll = s_weight * 35;
      let kll;
      //偏瘦 <=18.4
      if (bmi <= 18.4) {
        kll = weight * 38;
      }
      //正常 18.5-23.9
      if (bmi >= 18.5 && bmi <= 23.9) {
        kll = weight * 36;
      }
      //过胖 24.0-27.9
      if (bmi >= 24.0 && bmi <= 27.9) {
        kll = weight * 34;
      }
      //肥胖 >=28.0
      if (bmi >= 28.0) {
        kll = weight * 32;
      }
      localStorage.setItem("bmi", bmi); //将变量存储到height字段
      localStorage.setItem("s_weight", s_weight); //将变量imgs存储到sex字段
      localStorage.setItem("kll", kll); //将变量imgs存储到sex字段
      const info = {
        user_name,
        user_password,
        nick_name,
        sex,
        height,
        weight,
        birthday,
        bmi,
        s_weight,
        kll,
        begin_weight
      };
      console.log(info);
      //link="/"
      this.axios({
        method: "post",
        url: "/user/register",
        data: info
      })
        .then(res => {
          console.log(res.data);
          if (res.data.msg === "请求成功") {
            alert("注册成功");
            this.$router.replace("/");
          } else {
            alert("错误");
            console.log(error);
          }
        })
        .catch(error => {
          // alert("账号或密码错误");
          console.log(error);
        });
    }
  }
};
</script>
<style lang=""></style>
