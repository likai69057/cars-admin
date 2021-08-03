<template>
  <div>
    <!-- 顶部搜索框 -->
    <el-row :gutter="5" class="heardSearch">
      <el-col :span="2" class="keyWord">关键字:</el-col>
      <el-col :span="3">
        <!--  封装的选项卡  -->
        <Select :config="data.configOption" />
      </el-col>
      <el-col :span="5">
        <el-input></el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="danger">搜索</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <table-vue :config="data.configTable">
      <template>
        <slot></slot>
      </template>
    </table-vue>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import Select from '@/components/selectVue'
import TableVue from '@/components/tableVue'

export default {
  name: 'user',
  components: {
    Select,
    TableVue
  },
  setup (props, { root }) {
    const data = reactive({
      configOption: ['name', 'phone', 'email'],
      // table配置
      configTable: {
        // 控制复选框显示
        selection: true,
        // 记录复选框状态
        recordCheckBox: true,
        // table主体
        tHead: [
          { label: '邮箱', field: 'email', width: 180 },
          { label: '姓名', field: 'name', width: 100 },
          { label: '手机号', field: 'phone', width: 150 },
          { label: '地区', field: 'address' },
          { label: '角色', field: 'role', width: 100 },
          { label: '禁用状态', field: 'status', width: 80, columnType: 'slot', slotName: 'status' }
        ]
      }
    })

    return {
      data
    }
  }
}
</script>

<style scoped lang="less">
.keyWord {
  height: 40px;
  line-height: 40px;
  font-size: 17px;
}
.heardSearch {
  margin-bottom: 20px;
}
</style>
