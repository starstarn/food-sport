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
    <h3>今天心情怎么样？</h3>
    <p>我感觉..</p>
    <div class="nav">
      <div style="margin-left:20%;" @click="onKx()">
        <label
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kaixin"></use></svg
        ></label>
        <br />
        <span>开心</span>
      </div>
      <div style="margin-left:65%;" @click="onBkx()">
        <label
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bukaixin"></use></svg
        ></label>
        <br />
        <span>不开心</span>
      </div>
      <div style="margin-left:20%;" @click="onSq()">
        <label
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shengqi"></use></svg
        ></label>
        <br />
        <span>生气</span>
      </div>
      <div style="margin-left:65%;" @click="onSx()">
        <label
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shangxinbiaoqing"></use></svg
        ></label>
        <br />
        <span>伤心</span>
      </div>
      <div style="margin-left:20%;" @click="onWy()">
        <label
          ><svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wuyu"></use></svg
        ></label>
        <br />
        <span>无语</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fh: require("../images/return.png"),
      u_name: null
    };
  },
  created() {
    this.u_name = localStorage.getItem("user_name");
  },
  methods: {
    onKx() {
      console.log("开心");
      const params = {
        user_name: this.u_name,
        mood: "开心"
      };
      this.axios({
        method: "post",
        url: "/user/update_mood",
        data: params
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
        this.$router.replace("/");
    },
    onBkx() {
      console.log("不开心");
      const params = {
        user_name: this.u_name,
        mood: "不开心"
      };
      this.axios({
        method: "post",
        url: "/user/update_mood",
        data: params
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
        this.$router.replace("/");
    },
    onSx() {
      console.log("伤心");
      const params = {
        user_name: this.u_name,
        mood: "伤心"
      };
      this.axios({
        method: "post",
        url: "/user/update_mood",
        data: params
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
        this.$router.replace("/");
    },
    onWy() {
      console.log("无语");
      const params = {
        user_name: this.u_name,
        mood: "无语"
      };
      this.axios({
        method: "post",
        url: "/user/update_mood",
        data: params
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
        this.$router.replace("/");
    },
    onSq() {
      console.log("生气");
      const params = {
        user_name: this.u_name,
        mood: "生气"
      };
      this.axios({
        method: "post",
        url: "/user/update_mood",
        data: params
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
        this.$router.replace("/");
    },
    onReturn() {
      this.$router.replace("/");
    }
  }
};
</script>
<style lang="css" scoped>
h3 {
  text-align: center;
}
p {
  text-align: center;
  font-size: 14px;
  margin: 10px 0 30px 0;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.nav span {
  font-size: 14px;
  margin-left: 10px;
}
</style>
