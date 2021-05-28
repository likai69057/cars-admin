<template>
  <div>
    信息详情
  </div>
</template>

<script>
// import { reactive, ref } from '@vue/composition-api'

export default {
  name: 'InfoDetailed',
  setup (props, { root }) {
    // 页面跳转时获取对应传入query参数(json格式)
    const id = root.$route.query.id
    const title = root.$route.query.title
    console.log(id)
    console.log(title)
    return {
      id,
      title
    }
  }
}
</script>

<style scoped>

</style>
