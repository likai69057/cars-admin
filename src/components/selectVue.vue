<template>
  <el-select v-model="data.selectValue">
    <el-option v-for="item in data.initOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
  </el-select>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
export default {
  name: 'selectVue',
  props: {
    config: {
      type: Array,
      default: () => {}
    }
  },
  setup (props, { root }) {
    const data = reactive({
      initOptions: [],
      // 关键字数组
      options: [
        { value: 'name', label: '姓名' },
        { value: 'phone', label: '手机号' },
        { value: 'email', label: '邮箱' }
      ],
      // 选中的关键字 默认是显示姓名
      selectValue: ''
    })

    // 初始化下拉选项
    const initOption = () => {
      const optionArr = []
      if (props.config.length === 0) {
        return false
      }
      props.config.forEach(item => {
        // filter 返回的是一个新数组
        const arr = data.options.filter(elm => elm.value === item)[0]
        optionArr.push(arr)
      })
      // 初始化赋值
      data.initOptions = optionArr
      // 初始化搜索值
      data.searchValue = optionArr[0].value
    }
    onMounted(() => {
      initOption()
    })

    return {
      data
    }
  }
}
</script>

<style scoped>

</style>
<!--
组件化开发注释：
  组件目录位置：src/components/selectVue.vue
  组件引用方式：import Select from '@/components/selectVue'
  template: <Select :config="data.configOption" />

  参数配置：
    configOption: 关键字类型
-->
