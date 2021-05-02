<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="食物榜单"
    ></x-header>
    <div
      style="width:100%;height:80px;background-color:aliceblue;line-height:80px;"
    >
      <span style="margin-left:20px;">{{ type_s }}</span>
    </div>

    <div class="list">
      <li>
        <img :src="food_img" />
        <span style="font-size:16px;position:absolute;left:78px;top:15px;">{{
          52
        }}</span>
        <span
          style="font-size:12px;color:gray;position:absolute;left:78px;top:45px;"
          ><span style="color:red;">{{ a534rl }}</span
          >千卡/100{{ a543 }}</span
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
      food_img: require("../images/mika.jpg")
    };
  },
  created() {
    const f_type = localStorage.getItem("f_type");
    this.type_s = f_type;
    console.log(this.type_s);

    this.axios
      .get("http://localhost:8087/api/foodlist", {
        params: {
          type: this.type_s
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style lang="css">
.list li {
  position: relative;
  margin: 10px;
  list-style-type: none;
}
.list img {
  position: absolute;
  top: 18px;
  left: 20px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
</style>
