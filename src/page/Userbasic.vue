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
        v-model="u_sex"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        :placeholder="sex"
        style="padding:6px 3px;"
      ></popup-picker>

      <datetime
        title="出生日期"
        v-model="date"
        @on-change="onChangetime"
        style="padding:15px 15px;"
      ></datetime>
      <cell
        @click.native="onHeight()"
        title="身高"
        :value="height"
        is-link
        style="padding:15px 15px;"
      ></cell>
    </group>
    <van-field
      readonly
      clickable
      label="城市"
      :value="value"
      placeholder="选择城市"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>

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
  </div>
</template>
<script>
import { Group, CellBox, Cell, PopupPicker, Datetime } from "vux";

import Vue from "vue";
import { Slider } from "vant";

Vue.use(Slider);

export default {
  components: {
    Group,
    CellBox,
    Cell,
    PopupPicker,
    Datetime
  },
  data() {
    return {
      shows: false,
      list: [["男", "女"]],
      fh: require("../images/return.png"),
      u_sex: null,
      sex: null,
      date: null,
      value: "",
      height: "160",
      u_name: null,
      showPicker: false,
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"]
    };
  },
  created() {
    const u_name = localStorage.getItem("user_name");
    this.username = u_name;
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
        this.sex = res.data.sex;
        this.u_sex = res.data.sex;
        this.data = res.data.birthday;
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
    onChange(u_sex) {
      console.log("val change", u_sex);
    },
    onChangetime(date) {
      console.log(date);
    },
    changeList10() {
      this.list1 = [
        ["小米1", "iPhone1", "华为1", "情怀1", "三星1", "其他1", "不告诉你1"]
      ];
    },
    changeList11() {
      this.list1[0].push("我是push条目");
    },
    changeList20() {},
    changeList21() {
      this.list3.push({
        name: "美国002_007",
        value: "0007",
        parent: "usa002"
      });
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
    cgHeight(height){
      console.log(height);
      this.height = height;
    },
    xiugai() {
      console.log("修改身高");
      this.shows = !this.shows;
      const user_name = localStorage.getItem("user_name");
      this.u_name = user_name;
    }
  }
};
</script>
<style lang="css">
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
