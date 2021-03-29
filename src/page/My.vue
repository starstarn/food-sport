<template lang="">
  <div>
    <flexbox orient="vertical">
      <div class="header">
        <!-- 头像 -->
        <img :src="imgUrl" />
        <!--   昵称 -->
        <span class="call">tiamo</span>
        <!-- 修改个人信息按钮 -->
        <button class="xiugai">修改</button>
        <!-- 设置按钮 -->
        <button class="set">设置</button>
      </div>
      <div>
        <group
          title="我的健康资料"
          style="background-color:white; border-radius:15px; padding: 10px 0; width: 330px"
        >
          <cell title="基本信息" style="padding:20px 15px;" is-link>
            <div class="badge-value">
              <span class="vertical-middle">&nbsp;</span>
            </div>
          </cell>
          <cell title="健康报告" is-link>
            <div class="badge-value">
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
    </flexbox>
  </div>
</template>
<script>
import { Group, Cell } from "vux";

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      imgUrl: require("../images/mika.jpg")
    };
  }
};
</script>
<style lang="css">
.header {
  width: 100%;
  height: 180px;
  background-color: rgb(49, 192, 180);
  position: relative;
}
img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px white solid;
  position: absolute;
  top: 70px;
  left: 28px;
}
.call {
  position: absolute;
  top: 80px;
  left: 108px;
}
.xiugai {
  position: absolute;
  top: 90px;
  left: 180px;
}
.set {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
