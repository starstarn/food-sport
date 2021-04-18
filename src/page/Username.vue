<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="完善个人信息"
    ></x-header>
    <flexbox orient="vertical">
      <h4>用户名/昵称</h4>
      <div>
        <group>
          <x-input
            title="name"
            placeholder="请输入昵称"
            :min="5"
            :max="20"
            style="width:90%;height:30px;border:1px gray solid;font-size:20px;"
          ></x-input>
        </group>
      </div>

      <x-button
        text="完成"
        link="/birthday"
        type="primary"
        style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
      ></x-button>
    </flexbox>
  </div>
</template>
<script>
import { XInput, Group } from "vux";

export default {
  components: {
    XInput,
    Group
  },
  created() {
    this.axios.get("/foods").then(function(res) {
      console.log(res);
    });
  }
  /* mounted() {
    axios
      .get("http://localhost:8086/foods")
      .then(response => (this.food = response));
  } */
  /* methods:{
                get_weather(){
                    axios.get("http://wthrcdn.etouch.cn/weather_mini?city="+this.city)
                        .then(response=>{
                            console.log(response);
                        }).catch(error=>{
                            console.log(error.response)
                    });
                }
   }, */
};
</script>
<style lang="css">
body {
  background-color: rgb(240, 240, 240);
}
h4 {
  font-size: 24px;
  font-weight: 400;
  margin: 30px 0 0 0;
}
</style>
