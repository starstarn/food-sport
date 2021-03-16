<template lang="">
  <div>
    <x-header style="background-color:green; color:white;"></x-header>
    <x-progress percent="100"></x-progress>
    <flexbox orient="vertical">
      <h4>填写完毕</h4>
    </flexbox>
    <x-button
      text="进入"
      link="/home"
      type="primary"
      style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
    ></x-button>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
