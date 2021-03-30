<template lang="">
  <div>
    <group>
      <x-switch
        v-model="showDialogStyle"
        title="自定义"
        inline-desc="$t('custom dialog style')"
      ></x-switch>
    </group>
    <li @click="showDialogStyle">1111</li>

    <div v-transfer-dom>
      <x-dialog
        v-model="showDialogStyle"
        hide-on-blur
        :dialog-style="{
          'max-width': '100%',
          width: '100%',
          height: '50%',
          'background-color': 'transparent'
        }"
      >
        <p
          style="color:#fff;text-align:center;"
          @click="showDialogStyle = false"
        >
          <span style="font-size:30px;">HELLO WORLD</span>
          <br />
          <br />
          <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
        </p>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import {
  XDialog,
  XButton,
  Group,
  XSwitch,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    XButton,
    Group,
    XSwitch
  },
  methods: {
    doShowToast() {
      this.$vux.toast.show({
        text: "toast"
      });
    }
  },
  data() {
    return {
      showDialogStyle: false
    };
  }
};
</script>
<style lang=""></style>
