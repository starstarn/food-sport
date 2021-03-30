<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="添加早餐"
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
          <div class="tab-swiper vux-center">{{ item }} Container</div>
        </swiper-item>
      </swiper>
    </div>

    <div>
      <hr />
      <li>
        <img :src="imgUrl" />

        <span style="font-size:16px;position:absolute;left:78px;top:15px;"
          >米饭</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:red;">116 </span>千卡/100克</span
        >
        <div
          style="display:inline-block; background-color:green;width:10px;height:10px;border-radius:50%;position:absolute;top:35px;right:20px;"
        ></div>
      </li>
      <hr />
      <li>
        <img :src="imgUrl" />

        <span style="font-size:16px;position:absolute;left:78px;top:15px;"
          >米饭</span
        >
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:red;">116 </span>千卡/100克</span
        >
        <div
          style="display:inline-block; background-color:green;width:10px;height:10px;border-radius:50%;position:absolute;top:35px;right:20px;"
        ></div>
      </li>
      <hr />
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
  SwiperItem
} from "vux";

const list = () => ["常见", "自定义", "收藏"];
export default {
  components: {
    Search,
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      list2: list(),

      demoDisabled: "A",
      index: 0,
      getBarWidth: function(index) {
        return (index + 1) * 22 + "px";
      },
      imgUrl: require("../images/mika.jpg")
    };
  }
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
</style>
