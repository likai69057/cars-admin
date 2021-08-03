<template>
  <el-table
    ref="multipleTable"
    border
    :data="data.tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="data.tableConfig.selection" type="selection" width="55" />
    <template v-for="item in data.tableConfig.tHead">
      <!--  插槽  -->
      <el-table-column :key="item.field" :prop="item.field" :width="item.width" :label="item.label" v-if="item.columnType === 'slot'">
        <template>
          <slot></slot>
        </template>
      </el-table-column>
      <!--  文本数据渲染  -->
      <el-table-column :key="item.field" :prop="item.field" :width="item.width" :label="item.label" v-else />
    </template>
  </el-table>
</template>

<script>
import { reactive, onBeforeMount } from '@vue/composition-api'

export default {
  name: 'tableVue',
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, { root, refs }) {
    const data = reactive({
      tableConfig: {
        // 是否显示复选框
        selection: true,
        // 记录复选框状态
        recordCheckBox: true,
        tHead: []
      },
      tableData: [
        {
          email: '2016-05-03',
          name: '王小虎',
          phone: '158348138',
          address: '广东省珠海市金湾区',
          role: '超管'
        },
        {
          email: '2016-05-03',
          name: '王小虎',
          phone: '158348138',
          address: '广东省珠海市金湾区',
          role: '超管'
        },
        {
          email: '2016-05-03',
          name: '王小虎',
          phone: '158348138',
          address: '广东省珠海市金湾区',
          role: '超管'
        },
        {
          email: '2016-05-03',
          name: '王小虎',
          phone: '158348138',
          address: '广东省珠海市金湾区',
          role: '超管'
        }
      ],
      multipleSelection: []
    })

    const handleSelectionChange = () => {

    }

    // 用于一次性初始化遍历传入的所有参数 防止多次渲染
    const initTableConfig = () => {
      const configData = props.config
      for (const key in configData) {
        if (data.tableConfig[key]) {
          data.tableConfig[key] = configData[key]
        }
      }
    }

    onBeforeMount(() => {
      initTableConfig()
    })

    return {
      data,
      // methods
      handleSelectionChange
    }
  }
}
</script>

<style scoped>

</style>
