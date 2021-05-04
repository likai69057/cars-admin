<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="4">
          <el-form-item label="类型:">
            <el-select v-model="value" placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="日期:">
            <div class="block">
              <el-date-picker
                style="width: 350px;"
                type="datetimerange"
                v-model="value2"
                align="right"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="关键字:">
            <el-select v-model="searchKey" style="width: 100px">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-input v-model="searchKeyWord" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" class="pull-right">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格数据 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="category" label="类型" width="180"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="user" label="管理员"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'

export default {
  name: 'News',
  setup (props) {
    // 类型
    const options = reactive([{
      value: '1',
      label: '国外信息'
    }, {
      value: '2',
      label: '国内信息'
    }, {
      value: '3',
      label: '行业信息'
    }])
    // 搜索关键字
    const searchOptions = reactive([
      { value: 'id', label: 'ID' },
      { value: 'title', label: '标题' }
    ])
    const value = ref('')
    const value2 = ref('')
    const searchKey = ref('')
    const searchKeyWord = ref('')
    // 表格数据
    const tableData = reactive([
      {
        title: '2016-05-02',
        category: '王小虎',
        date: '上海市普陀区金沙江路 1518 弄',
        user: '用户'
      },
      {
        title: '2016-05-02',
        category: '王小虎',
        date: '上海市普陀区金沙江路 1518 弄',
        user: '用户'
      },
      {
        title: '2016-05-02',
        category: '王小虎',
        date: '上海市普陀区金沙江路 1518 弄',
        user: '用户'
      },
      {
        title: '2016-05-02',
        category: '王小虎',
        date: '上海市普陀区金沙江路 1518 弄',
        user: '用户'
      }
    ])

    return {
      options,
      value,
      value2,
      searchKey,
      searchOptions,
      searchKeyWord,
      tableData
    }
  }
}
</script>

<style scoped lang="less">
</style>
