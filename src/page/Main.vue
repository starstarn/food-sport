<template lang="">
  <div>
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
    <!-- <flexbox orient="vertical">
      <flexbox> -->
    <!-- 卡片 -->
    <div class="card">
      <span class="head">体重管理</span> <span class="danwei">单位：公斤</span>
      <br />
      <div style="position: absolute;left:30px;top:70px;">
        <span class="weight">90</span>
        <br />
        <label>当前</label>
      </div>

      <div style="position: absolute;left:120px;top:40px;text-align:center;">
        <div style="width:80px;height:80px;margin:auto;">
          <x-circle
            :percent="percent"
            :stroke-width="6"
            :trail-width="6"
            :stroke-color="['#36D1DC', '#5B86E5']"
            trail-color="#ececec"
          >
            <span style="color:#36D1DC">{{ percent }}%</span>
          </x-circle>
        </div>
        <label>已减去</label>
      </div>

      <div style="position: absolute;right:30px;top:70px;">
        <span class="weight">80</span>
        <br />
        <label>目标</label>
      </div>
    </div>

    <div>
      <div style="width:10px;height:20pxbackground-color:green;"></div>
      <group
        title="健康记录"
        style="background-color:white; border-radius:15px; padding: 10px 0; width: 330px"
      >
        <cell is-link>
          <div style="text-align:left;width:100%;">
            <label>饮食&运动</label>
            <br />
            <label>还可以吃{{}}千卡</label>
            <span class="vertical-middle">记饮食</span>
          </div>
        </cell>
        <cell title="体重" is-link>
          <div class="badge-value">
            {{}}公斤
            <span class="vertical-middle">&nbsp;</span>
          </div>
        </cell>
        <cell title="基本信息" is-link>
          <div class="badge-value">
            <span class="vertical-middle">&nbsp;</span>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>
<script>
import { Search, Group, Cell, XCircle } from "vux";

export default {
  components: {
    Search,
    Group,
    Cell,
    XCircle
  },
  data() {
    return {
      percent: 80
    };
  }
};
</script>
<style lang="css">
.card {
  background-color: rgb(127, 197, 185);
  width: 85%;
  height: 170px;
  border-radius: 12px;
  color: white;
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 20px auto;
}
.head {
  position: absolute;
  left: 10px;
  top: 5px;
  font-size: 22px;
}
.danwei {
  position: absolute;
  right: 10px;
  top: 5px;
  font-size: 14px;
}
.card label {
  font-size: 14px;
}
.weight {
  font-size: 24px;
}
span,
label {
  margin: 0;
  padding: 0;
}
.part {
  color: gray;
}
.part label {
  padding: 20px 0;
}
</style>
