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
      <span style="position:absolute;left:45%;">基本信息</span>
    </div>
    <group style="font-size:18px;">
      <popup-picker
        title="性别"
        :data="list"
        v-model="sexs"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        :placeholder="sex"
      ></popup-picker>

      <datetime
        title="出生日期"
        v-model="date"
        @on-change="onChangetime"
        style="padding:15px 15px;"
        :placeholder="date"
        min-year="1900"
      ></datetime>
      <cell
        @click.native="onHeight()"
        title="身高"
        :value="height"
        is-link
        style="padding:15px 15px;"
      ></cell>
    </group>

    <x-button
      @click.native="save()"
      text="保存"
      type="primary"
      style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
    ></x-button>

    <!-- 弹出修改身高-->
    <div class="toast" v-show="shows">
      <p style="font-size:20px;color:gray;padding:15px 0;">
        <span style="margin:10px 0 0 20px;" @click="close()">取消</span>
        <span style="margin:10px 0 0 240px;" @click="xiugai()">确定</span>
      </p>
      <h4 style=" text-align: center">身高</h4>
      <van-slider
        @change="cgHeight"
        v-model="height"
        active-color="rgb(94, 213, 235)"
        :max="210"
        :min="60"
        style="margin-top:30px;"
      >
        <template #button>
          <div class="custom-button">{{ height }}</div>
        </template>
      </van-slider>
    </div>

    <toast v-model="show1" @on-hide="onHide">保存成功</toast>
  </div>
</template>
<script>
import { Group, CellBox, Cell, PopupPicker, Datetime, Toast } from "vux";

import Vue from "vue";
import { Slider } from "vant";

Vue.use(Slider);

export default {
  components: {
    Group,
    CellBox,
    Cell,
    PopupPicker,
    Datetime,
    Toast
  },
  data() {
    return {
      show1: false,
      shows: false,
      list: [["男", "女"]],
      sexs: [],
      fh: require("../images/return.png"),
      sex: [],
      date: null,
      value: "",
      height: "160",
      u_name: null,
      showPicker: false,
      format: function(value, name) {
        return `${value[0]}:${value[1]}`;
      },
      bmi: null,
      kll: null,
      weight: null
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
        this.sexs.push(res.data.sex);
        this.sex.push(res.data.sex);
        this.date = res.data.birthday;
        this.bmi = res.data.bmi;
        this.kll = res.data.kll;
        this.weight = res.data.weight;
        this.height = res.data.height;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onReturn() {
      this.$router.replace("/my");
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onChange(sexs) {
      console.log("val change", sexs);
    },
    onChangetime(date) {
      console.log(date);
    },
    onShow() {
      console.log("on show");
    },
    onHide(type) {
      console.log("on hide", type);
    },
    onHeight() {
      console.log("修改身高");
      this.shows = !this.shows;
    },
    close() {
      this.shows = !this.shows;
    },
    cgHeight(height) {
      console.log(height);
      this.height = height;
    },
    xiugai() {
      console.log("修改身高");
      this.shows = !this.shows;
      this.u_name = localStorage.getItem("user_name");
    },
    save() {
      console.log("保存");
      console.log(this.sexs + this.date + this.height + this.u_name);
      // console.log(typeof(toString(this.sexs)));
      this.sexs = this.sexs.toString();
      console.log(typeof this.sexs);

      this.bmi = this.weight / ((this.height / 100) * (this.height / 100));

      //偏瘦 <=18.4
      if (this.bmi <= 18.4) {
        this.kll = this.weight * 38;
      }
      //正常 18.5-23.9
      if (this.bmi >= 18.5 || this.bmi <= 23.9) {
        this.kll = this.weight * 36;
      }
      //过胖 24.0-27.9
      if (this.bmi >= 24.0 || this.bmi <= 27.9) {
        this.kll = this.weight * 34;
      }
      //肥胖 >=28.0
      if (this.bmi >= 28.0) {
        this.kll = this.weight * 32;
      }
      const info = {
        user_name: this.u_name,
        sex: this.sexs,
        birthday: this.date,
        height: this.height,
        bmi: this.bmi,
        kll: this.kll
      };

      this.axios({
        method: "post",
        url: "/user/update_basic",
        data: info
      })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      this.show1 = !this.show1;
      // this.$router.replace("/my");
    }
  }
};
</script>
<style lang="css" scoped>
body {
  background-color: white;
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: rgb(94, 213, 235);
  border-radius: 100px;
}
.toast {
  width: 100%;
  height: 400px;
  background-color: rgb(199, 215, 230);
  position: fixed;
  top: 300px;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
