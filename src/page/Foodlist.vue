<template lang="">
  <div>
    <!-- <x-header
      style="background-color:green; color:white;"
      title="食物榜单"
    ></x-header> -->

    <div
      style="width:100%;height:50px;background-color:green;line-height:50px;color:white;font-size:16px;"
    >
      <span
        @click="onReturn()"
        style="margin:15px;font-size:15px;color:rgb(223, 226, 226);"
        ><img :src="fh" class="fanhui" /> 返回</span
      >
      <span style="position:absolute;left:45%;">食物榜单</span>
    </div>
    <div
      style="width:100%;height:80px;background-color:aliceblue;line-height:80px;"
    >
      <span style="margin-left:20px;">{{ type_s }}</span>
    </div>

    <div v-for="item in food" :key="item" @click="look(item)">
      <li class="li1">
        <!-- <img :src="food_img" class="food_img" /> -->
        <img :src="item.image" class="food_img" />
        <span style="font-size:16px;position:absolute;left:78px;top:15px;">{{
          item.name
        }}</span>
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:red;">{{ item.rl }}</span
          >千卡/100{{ item.danwei }}</span
        >
      </li>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type_s: null,
      food_img: require("../images/mika.jpg"),
      food: null,
      fh: require("../images/return.png")
    };
  },
  created() {
    const f_type = localStorage.getItem("f_type");
    this.type_s = f_type;
    console.log(this.type_s);
    const food_type = {
      type: this.type_s
    };

    this.axios({
      method: "post",
      url: "/s_type",
      data: food_type
    })
      .then(res => {
        console.log(res.data);
        this.food = res.data;
        this.food.forEach(node => {
          //node.image = require(`../images/${node.image}.jpg`);
          try {
            node.image = require(`../images/${node.image}.jpg`);
          } catch (err) {
            node.image = require(`../images/${node.image}.png`);
          }
        });
        localStorage.setItem("user_name", user_name);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onReturn() {
      this.$router.replace("/food-type");
    },
    look(item) {
      console.log(item);
      localStorage.setItem("food", JSON.stringify(item));
      // this.$EventBus.$emit("look", item);
      this.$router.replace("/food-careful");
    }
  }
};
</script>
<style lang="css">
.food_img {
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.li1 {
  list-style-type: none;
  padding: 15px 20px;
  position: relative;
  margin: 0;
  height: 52px;
}
.fanhui {
  width: 15px;
  height: 15px;
  text-align: center;
}
</style>
