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
      u_weight: null
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
        this.u_weight = this.weight;
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
      const name_weight = {
        user_name: user_name,
        weight: this.u_weight
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
