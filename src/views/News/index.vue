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
        <el-col :span="3">
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
        <el-col :span="3">
          <el-button type="danger" class="pull-right">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格数据 -->
    <el-table class="table" :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="category" label="类型" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理人" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <el-row class="foot">
      <el-col :span="12">
        <el-button size="medium">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100]"
          :total="1000">
        </el-pagination>
      </el-col>
    </el-row>
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
        title: '按商品房pose爱福家频道搜积分【破三等奖地方上大分是的佛教是对方是否',
        category: '王小虎',
        date: '2016-05-02',
        user: '用户'
      },
      {
        title: '上大分kgPDFPDF截个屏【刀具柜东方国际PDF感觉【片尾曲儿千瓦时卡萨形成自行车在周星驰',
        category: '王小虎',
        date: '2016-05-02',
        user: '用户'
      },
      {
        title: '是搭配购机票无二的会计法v 我乳房top苏东坡【 骗【哦女警嘘【破解',
        category: '王小虎',
        date: '2016-05-02',
        user: '用户'
      },
      {
        title: '儿破【跑快点发票搜地方小棕瓶零库存【平走出跑到上大分',
        category: '王小虎',
        date: '2016-05-02',
        user: '用户'
      }
    ])

    const handleEdit = (index, row) => {
      console.log(index, row)
    }

    //
    const handleSizeChange = (val) => {
      console.log(`每页 ${val} 条`)
    }
    const handleCurrentChange = (val) => {
      console.log(`当前页: ${val}`)
    }
    return {
      options,
      value,
      value2,
      searchKey,
      searchOptions,
      searchKeyWord,
      tableData,
      handleEdit,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped lang="less">
.table {
  margin-top: 10px;
}
.foot {
  margin-top: 36px;
}
</style>
