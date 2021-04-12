<template>
  <div id="layout" :class="[navMenuStatus ? 'close' : 'open']">
    <lay-header></lay-header>
    <lay-main></lay-main>
    <lay-nav></lay-nav>
  </div>
</template>

<script>
import LayHeader from './components/header'
import LayMain from './components/main'
import LayNav from './components/nav'
import { computed } from '@vue/composition-api'

// 这个组件用3.0新特性写法
export default {
  name: 'layout',
  components: {
    LayHeader,
    LayMain,
    LayNav
  },
  // 生命周期全写在里面
  setup (props, { root }) {
    // 3.0的data写法  直接定义变量
    const navMenuStatus = computed(() => root.$store.state.isCollapse)

    return {
      navMenuStatus
    }
  }
}
</script>

<style scoped lang="less">
</style>
