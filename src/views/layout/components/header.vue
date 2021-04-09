<template>
  <div id="header-wrap">
    <i class="iconfont icon-caidan"></i>
    <i class="iconfont icon-guanji pull-right"></i>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped lang="less">
#header-wrap {
  position: fixed;
  top: 0px;
  right: 0px;
  left: 250px;
  height: 75px;
  line-height: 75px;
  background-color: #fff;
  box-shadow: 0 3px 16px 0px rgba(0, 0, 0, .1);
  z-index: 1;
  .icon-caidan{
    padding: 0 32px;
    font-size: 25px;
    cursor: pointer;
  }
  .icon-guanji{
    padding: 0 32px;
    font-size: 24px;
  }
}
</style>
