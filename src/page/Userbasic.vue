<template lang="">
  <div>
    <x-header
      style="background-color:green; color:white;"
      title="基本信息"
    ></x-header>
    <group style="font-size:18px;">
      <popup-picker
        title="性别"
        :data="list"
        v-model="value1"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        :placeholder="val"
        style="padding:6px 3px;"
      ></popup-picker>

      <datetime
        title="出生日期"
        v-model="date"
        style="padding:15px 15px;"
      ></datetime>
      <cell
        title="身高"
        value="165厘米"
        is-link
        style="padding:15px 15px;"
      ></cell>
      <cell
        title="最新体重"
        value="90.2公斤"
        is-link
        style="padding:15px 15px;"
      ></cell>
    </group>
  </div>
</template>
<script>
import { Group, CellBox, Cell, PopupPicker, Datetime } from "vux";

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
      list: [["男", "女"]]
    };
  },
  methods: {
    onChange(val) {
      console.log("val change", val);
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
    }
  }
};
</script>
<style lang="css">
body {
  background-color: white;
}
</style>
