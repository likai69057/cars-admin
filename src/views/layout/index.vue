<template>
  <div id="layout">
    <lay-header></lay-header>
    <lay-main></lay-main>
    <lay-nav></lay-nav>
  </div>
</template>

<script>
import LayHeader from './components/header'
import LayMain from './components/main'
import LayNav from './components/nav'

// 这个组件用3.0新特性写法
export default {
  name: 'layout',
  components: {
    LayHeader,
    LayMain,
    LayNav
  },
  // 生命周期全写在里面
  setup () {

  }
}
</script>

<style scoped lang="less">
</style>
