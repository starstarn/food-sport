<template lang="">
  <div>
    <x-header style="background-color:green; color:white;"></x-header>
    <x-progress :percent=80></x-progress>
    <flexbox orient="vertical">
      <h3>你的体重管理目标是？</h3>
      1 2 3
      <button></button>
      <button></button>
      <button></button>
    </flexbox>
    <x-button
      text="下一步"
      link="/finish"
      type="primary"
      style="border-radius:99px; position:fixed; width:300px; left:10%; bottom:80px;"
    ></x-button>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
h3 {
  margin-top: 15px;
}
</style>
