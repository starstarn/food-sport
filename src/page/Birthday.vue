<template>
  <div>
    <x-header style="background-color:green; color:white;"></x-header>
    <x-progress :percent="50"></x-progress>
    <flexbox orient="vertical">
      <h3>你的出生日期是？</h3>
      <label>年龄不同，热量消耗不同，请准确选择</label>
      <p class="info" style="font-size:30px;color:green;">{{ value }}</p>
    </flexbox>
    <DatetimeView v-model="value" min-year="1900"></DatetimeView>
    <x-button
      @click.native="birthday()"
      text="下一步"
      type="primary"
      style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
    ></x-button>
  </div>
</template>

<script>
import { DatetimeView } from "vux";

export default {
  components: {
    DatetimeView
  },
  data() {
    return {
      value: "2021-6-10",
      showPopup: false,
      format: "YYYY-MM-DD"
    };
  },
  created() {
    var data = new Date();
    const month =
      data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
    const day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
    this.value = data.getFullYear() + "-" + month + "-" + day;
    console.log(this.value); //2021-05-01
  },
  methods: {
    birthday() {
      console.log(this.value);
      const birthday = this.value;
      localStorage.setItem("birthday", birthday); //将变量存储到height字段
      // link="/weight"
      this.$router.replace("/weight");
    }
  }
};
</script>

<style lang="css" scoped>
h3 {
  margin: 20px 0;
}
label {
  font-size: 14px;
}
</style>
