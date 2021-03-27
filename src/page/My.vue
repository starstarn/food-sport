<template lang="">
  <div>
    <flexbox orient="vertical">
      我的
      <div class="header">
        423
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
  }
};
</script>
<style lang="css">
.header {
  width: 100%;
  height: 200px;
}
</style>
