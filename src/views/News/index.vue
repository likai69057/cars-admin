<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="4">
          <el-form-item label="类型:">
            <el-select v-model="categoryValue" placeholder="请选择" style="width: 100px">
              <el-option
                v-for="item in options.categoryOptions"
                :key="item.id"
                :label="item.category_name"
                :value="item.id">
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
                v-model="dataValue"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
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
            <el-select v-model="searchKey" style="  width: 100px">
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
          <el-button type="danger" style="width: 100%" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" class="pull-right" @click="dialogInfo = true">新增</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格数据 -->
    <el-table
      class="table"
      :data="tableData.item"
      border
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="80" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="150" :formatter="toDate"></el-table-column>
      <el-table-column prop="user" label="管理人" width="80"></el-table-column>
      <el-table-column label="操作">
      <!-- 需要注意的一点 表格内部要写html5标签 必须包一层template标签 -->
      <!-- 通过slot-scope可以获取到对应行的数据对象 -->
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button type="success" size="mini" @click="EditDialogInfo(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <el-row class="foot">
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100]"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <dialog-info :dialogInfo="dialogInfo" :category="options.categoryOptions" @close="close"/>
    <!-- 编辑弹窗 -->
    <edit-dialog-info :editDialogInfo="editDialogInfo" :category="options.categoryOptions" :editDialogInfoObj="editDialogInfoObj" @closeEdit="closeEdit"/>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import DialogInfo from './dialog/info'
import EditDialogInfo from './dialog/editInfo'
import { common } from '../../api/common'
import { getInfoList, deleteInfoList } from '../../api/news'
import { timestampToTime } from '../../utils/common'

export default {
  name: 'News',
  components: {
    DialogInfo,
    EditDialogInfo
  },
  setup (props, { root }) {
    const categoryValue = ref('')
    const dataValue = ref('')
    const searchKey = ref('')
    const searchKeyWord = ref('')
    const { getCategory, categoryItem } = common()
    // 总信息条数
    const total = ref(null)
    // 页码和每页条数
    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    })
    // 信息id Number类型
    const deleteInfoId = ref(null)
    // 编辑选中的对应元素对象
    const editDialogInfoObj = ref({})

    // 控制表格数据加载
    const loading = ref(false)
    // 类型数据
    const options = reactive({
      categoryOptions: []
    })
    // 搜索关键字数据
    const searchOptions = reactive([
      { value: 'id', label: 'ID' },
      { value: 'title', label: '标题' }
    ])
    // 表格数据
    const tableData = reactive({
      item: []
    })

    // 关键字搜索
    const search = () => {
      GetInfoList()
    }

    const formatData = () => {
      const requestData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      }
      // 分类id
      if (categoryValue.value) { requestData.categoryId = categoryValue.value }
      // 筛选的时间段
      if (dataValue.value.length > 0) {
        requestData.startTime = dataValue.value[0]
        requestData.endTime = dataValue.value[1]
      }
      // 在选定关键字id的条件下获取输入的搜索字
      if (searchKeyWord.value) {
        requestData[searchKey.value] = searchKeyWord.value
      }
      return requestData
    }

    // 获取信息列表
    const GetInfoList = () => {
      const requestData = formatData()
      loading.value = true
      getInfoList(requestData).then(response => {
        const data = response.data.data
        total.value = data.total
        tableData.item = data.data
        loading.value = false
      }).catch(err => {
        console.log(err)
        loading.value = false
      })
    }

    // 转换时间戳
    const toDate = row => {
      return timestampToTime(row.createDate)
    }
    // 获取的类型为categoryId 转换成category_name
    const toCategory = row => {
      // 后台获取的categoryId和页面存储的categoryId对比  获取name
      const categoryData = options.categoryOptions.filter(item => {
        return item.id === row.categoryId
      })[0]
      return categoryData.category_name
    }
    // 表格编辑方法
    const EditDialogInfo = (id) => {
      editDialogInfo.value = true
      // 点击编辑后获得对应的元素对象
      editDialogInfoObj.value = id
    }
    // 表格删除方法
    const deleteItem = (id) => {
      deleteInfoId.value = [id]
      root.confirm({
        content: '确认删除当前信息？删除后无法恢复！',
        id: deleteInfoId.value,
        func: confirmDelete
      })
    }
    // 批量删除方法
    const deleteAll = () => {
      // 删除之前判断是否有选中 如果没有选中 deleteInfoId.value为null
      if (!deleteInfoId.value) {
        root.$message({
          message: '请选择需要删除的信息!',
          type: 'error'
        })
        return false
      }
      root.confirm({
        content: '确认删除全部信息？删除后无法恢复！',
        func: confirmDelete
      })
    }
    // 删除单行
    const confirmDelete = () => {
      deleteInfoList({ id: deleteInfoId.value }).then(response => {
        // 删除完成调用GetInfoList()
        GetInfoList()
        root.$message({
          message: response.data.message,
          type: 'success'
        })
        // 删除完成后清空存储id的数组deleteInfoId
        deleteInfoId.value = null
      }).catch(err => {
        console.log(err)
        deleteInfoId.value = null
      })
    }
    // 多选框方法拿到多个对应row的id值 便于删除多个
    const handleSelectionChange = (val) => {
      const id = val.map(item => {
        return item.id
      })
      deleteInfoId.value = id
    }

    // 分页的方法
    const handleSizeChange = (val) => {
      page.pageSize = val
      console.log(page.pageSize)
      GetInfoList()
    }
    const handleCurrentChange = (val) => {
      page.pageNumber = val
      console.log(page.pageNumber)
      GetInfoList()
    }

    // 控制新增弹窗的属性
    const dialogInfo = ref(false)
    // 控制编辑弹窗的属性
    const editDialogInfo = ref(false)
    // 接受子传父的值并修改父组件的值 关闭新增弹窗
    const close = (val) => {
      dialogInfo.value = val
    }
    const closeEdit = (val) => {
      editDialogInfo.value = val
    }

    // 页面加载完成后获取一级分类
    onMounted(() => {
      getCategory()
      GetInfoList()
    })
    // 监听传入的category
    watch(() => categoryItem.item, (value) => {
      options.categoryOptions = value
    })

    return {
      // ref
      categoryValue,
      dataValue,
      searchKey,
      searchKeyWord,
      dialogInfo,
      editDialogInfo,
      editDialogInfoObj,
      total,
      page,
      loading,
      deleteInfoId,
      // reactive
      options,
      searchOptions,
      tableData,
      // methods
      handleSizeChange,
      handleCurrentChange,
      close,
      closeEdit,
      deleteItem,
      deleteAll,
      GetInfoList,
      toDate,
      toCategory,
      handleSelectionChange,
      search,
      EditDialogInfo
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
