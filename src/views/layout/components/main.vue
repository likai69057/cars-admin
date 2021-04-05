<template>
  <div id="main-wrap">
    <router-view></router-view>
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
</style>
