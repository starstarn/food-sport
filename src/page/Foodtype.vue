<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="食物排行榜"
    ></x-header>

    <van-tree-select
      height="100vw"
      width="10vw"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div v-if="active === 0" class="panel">
          <li @click="fruits_low()">
            <img :src="imgss" />
            <span>低热量—水果类</span>
            <label>></label>
          </li>
          <hr />
          <li @click="zhushi_low()">
            <img :src="imgss" />
            <span>低热量—主食类</span>
            <label>></label>
          </li>
        </div>
        <div v-if="active === 1" class="panel">
          <li>
            <img :src="imgss" />
            <span>高维生素C—水果类</span>
            <label>></label>
          </li>
          <hr />
          <li>
            <img :src="imgss" />
            <span>高维生素C—蔬菜类</span>
            <label>></label>
          </li>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
import Vue from "vue";
import { TreeSelect } from "vant";

Vue.use(TreeSelect);
export default {
  data() {
    return {
      active: 0,
      items: [
        { text: "减肥" },
        { text: "美白" },
        { text: "补钙" },
        { text: "高血压" }
      ],
      imgss: require("../images/mika.jpg")
    };
  },
  methods: {
    fruits_low() {
      console.log("水果-低");
      localStorage.setItem("f_type", "水果-低");
      this.$router.replace("/food-list");
    },
    zhushi_low() {
      console.log("主食-低");
      localStorage.setItem("f_type", "主食-低");
      this.$router.replace("/food-list");
    }
  }
};
</script>
<style lang="css" scope>
hr {
  background-color: rgb(235, 237, 238);
  height: 1px;
  border: none;
}
li {
  list-style-type: none;
  position: relative;
  height: 90px;
}
.panel span {
  position: absolute;
  left: 85px;
  top: 36%;
  font-size: 15px;
}
.panel label {
  position: absolute;
  right: 20px;
  top: 36%;
  font-size: 15px;
}
.panel img {
  position: absolute;
  top: 20%;
  left: 20px;

  width: 50px;
  height: 50px;
  border-radius: 10px;
}
</style>
