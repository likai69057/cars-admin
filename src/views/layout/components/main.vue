<template>
  <div id="main-wrap">
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped lang="less">
#main-wrap {
  position: fixed;
  left: 250px;
  top: 75px;
  right: 0px;
  bottom: 0px;
  border: 30px solid #f7f7f7;
  border-bottom: none;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-left: 30px;
  padding-top: 30px;
  box-sizing: border-box;
}
</style>
