<template lang="">
  <!-- 弹出记录体重-->
  <div class="toast" v-show="shows">
    <p style="font-size:20px;color:gray;padding:15px 0;">
      <span style="margin:10px 0 0 20px;" @click="close()">取消</span>
      <span style="margin:10px 0 0 100px;color:black;">今天</span>
      <span style="margin:10px 0 0 100px;" @click="xiugai()">确定</span>
    </p>
    <h4 style=" text-align: center">体重</h4>
    <inline-x-number
      v-model="u_weight"
      @on-change="changeWeight()"
      width="60px"
      :min="30"
      style="text-align: center;"
    ></inline-x-number>
  </div>
</template>
<script>
import { InlineXNumber } from "vux";
export default {
  components: {
    InlineXNumber
  },
  data() {
    return {
      shows: false,
      u_weight: null,
      kaluli: null,
      bmi: null,
      height: null
    };
  },
  created() {
    const u_name = localStorage.getItem("user_name");
    const weight = localStorage.getItem("weight");
    this.u_weight = weight;
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
        this.u_weight = res.data.weight;
        this.kaluli = res.data.kll;
        this.bmi = res.data.bmi;
        this.height = res.data.height;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    close() {
      this.shows = !this.shows;
    },
    changeWeight() {
      console.log(this.u_weight);
    },
    xiugai() {
      console.log("修改体重");
      console.log(this.u_weight);
      const user_name = localStorage.getItem("user_name");

      this.bmi = this.u_weight / ((this.height / 100) * (this.height / 100));
      //偏瘦 <=18.4
      if (this.bmi <= 18.4) {
        this.kaluli = this.u_weight * 38;
      }
      //正常 18.5-23.9
      if (this.bmi >= 18.5 || this.bmi <= 23.9) {
        this.kaluli = this.u_weight * 36;
      }
      //过胖 24.0-27.9
      if (this.bmi >= 24.0 || this.bmi <= 27.9) {
        this.kaluli = this.u_weight * 34;
      }
      //肥胖 >=28.0
      if (this.bmi >= 28.0) {
        this.kaluli = this.u_weight * 32;
      }

      const name_weight = {
        user_name: user_name,
        weight: this.u_weight,
        bmi: this.bmi,
        kll: this.kaluli
      };
      this.axios({
        method: "post",
        url: "/user/update_weight",
        data: name_weight
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      this.shows = !this.shows;
      location.reload();
    }
  }
};
</script>
<style lang="css">
.toast {
  width: 100%;
  height: 400px;
  background-color: rgb(168, 199, 226);
  position: fixed;
  top: 300px;
}
</style>
