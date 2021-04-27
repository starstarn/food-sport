<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="添加运动"
    ></x-header>

    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top
      top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"
    ></search>

    <div>
      <tab :line-width="2" active-color="#fc378c" v-model="index">
        <tab-item
          class="vux-center"
          :selected="demo2 === item"
          v-for="(item, index) in list2"
          @click="demo2 = item"
          :key="index"
          >{{ item }}</tab-item
        >
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">{{ item }} 页</div>
        </swiper-item>
      </swiper>
    </div>

    <div>
      <hr />
      <div v-for="item in foodlist" :key="item" @click="add(item)">
        <li>
          <img :src="imgUrl" />

          <span style="font-size:16px;position:absolute;left:78px;top:15px;">{{
            item.name
          }}</span>
          <span
            style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
            ><span style="color:red;">{{ item.rl }}</span
            >千卡/60{{ item.danwei }}</span
          >
          <div
            style="display:inline-block; background-color:green;width:10px;height:10px;border-radius:50%;position:absolute;top:35px;right:20px;"
          ></div>
        </li>
        <hr />
      </div>
    </div>

    <!-- 弹出 -->
    <div class="toast" v-show="show">
      <p style="font-size:20px;color:gray;padding:15px 0;">
        <span style="margin:10px 0 0 20px;" @click="close">取消</span>
        <span style="margin:10px 0 0 50px;">{{ month }}月{{ day }}日/运动</span>
        <span style="margin:10px 20px 0 65px;" @click="addSport()">确认</span>
      </p>
      <div style="margin:20px 0;">
        <div>
          <li>
            <img :src="imgUrl" />

            <span
              style="font-size:16px;position:absolute;left:78px;top:15px;"
              >{{ addsport.name }}</span
            >
            <span
              style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
              ><span style="color:red;">{{ addsport.rl }}</span
              >千卡/10{{ addsport.danwei }}</span
            >
          </li>
          <hr />
        </div>
      </div>

      <div>
        <br />

        <!-- 数量选择 -->
        <div>
          <div style="text-align:center;">
            <p style="font-size:16px;color:gray;margin:0 0 5px 0;">
              {{ reliang }}千卡/
            </p>
            <p style="font-size:16px;color:gray;margin:0 0 20px 0;">
              {{ tiji }}分钟
            </p>
            <inline-x-number
              v-model="num"
              @on-change="changeNum()"
              width="60px"
              :min="1"
            ></inline-x-number>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Search,
  Tab,
  TabItem,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem,
  InlineXNumber
} from "vux";

const list = () => ["常见", "自定义"];
export default {
  components: {
    Search,
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    InlineXNumber
  },
  data() {
    return {
      list2: list(),
      foodlist: null,
      demoDisabled: "A",
      index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      imgUrl: require("../images/mika.jpg"),
      addsport: {
        danwei: "分钟",
        name: "爬山",
        rl: "1436"
      },
      show: false,
      num: 1,
      reliang: 0,
      tiji: 0,
      type: null,
      time: null,
      month: null,
      day: null
    };
  },
  created() {
    this.axios.get("http://localhost:8087/api/sportlist").then(res => {
      console.log(res.data);
      this.foodlist = res.data;
      console.log(this.foodlist);
      /* const type = localStorage.getItem("type");
      this.type = type;
      console.log(this.type); */

      var aData = new Date();
      console.log(aData); //Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间)

      this.time =
        aData.getFullYear() +
        "-" +
        (aData.getMonth() + 1) +
        "-" +
        aData.getDate();
      this.month = aData.getMonth() + 1;
      this.day = aData.getDate();
      console.log(this.time); //2019-8-20
    });
  },
  methods: {
    add(item) {
      console.log("添加");
      // console.log(item);
      // this.addsport = item;
      this.addsport.name = item.name;
      this.addsport.rl = item.rl / 6;
      this.addsport.danwei = item.danwei;
      console.log(this.addsport);
      this.show = !this.show;
      this.reliang = this.addsport.rl * this.num;
      this.tiji = 10 * this.num;
    },
    close() {
      this.show = !this.show;
      this.num = 1;
    },
    addSport() {
      //console.log(this.num);
      const user_name = localStorage.getItem("user_name");
      console.log(`用户名:${user_name}`);
      console.log(`运动热量:${this.reliang}运动名:${this.addsport.name}`);
      console.log(`时间:${this.time}`);
      this.show = !this.show;
      //保存数据
    },
    changeNum() {
      console.log(this.num);
      this.reliang = this.addsport.rl * this.num;
      this.tiji = 10 * this.num;
    }
  }
  /* updated() {
    this.$nextTick(() => {});
    this.reliang = this.item.rl * this.num;
    this.tiji = this.item.danwei * this.num;
  } */
};
</script>
<style lang="css">
hr {
  background-color: rgb(209, 212, 214);
  height: 1px;
  border: none;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
li {
  list-style-type: none;
  padding: 15px 20px;
  position: relative;
  margin: 0;
  height: 52px;
}
.toast {
  width: 100%;
  height: 400px;
  background-color: aliceblue;
  position: fixed;
  top: 300px;
}
</style>
