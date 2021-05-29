<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="信息分类:">
      <el-select v-model="form.categoryId" placeholder="请选择活动区域">
        <el-option :label="item.category_name" v-for="item in category.item" :key="item.id" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题:">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图:">
      缩略图
    </el-form-item>
    <el-form-item label="发布日期:">
      <el-date-picker v-model="form.date" type="date" disabled placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="详细内容:">
      详细内容
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, onMounted, watch } from '@vue/composition-api'
import { common } from '../../api/common'
import { getInfoList } from '../../api/news'
import { timestampToTime } from '../../utils/common'

export default {
  name: 'InfoDetailed',
  setup (props, { root }) {
    // 页面跳转时获取对应传入query参数(json格式)
    const id = root.$route.query.id
    const title = root.$route.query.title
    // 获取分类
    const { getCategory, categoryItem } = common()
    // form表单
    const form = reactive({
      categoryId: '',
      title: '',
      date: ''
    })
    // 接受接口传来的分类列表
    const category = reactive({
      item: []
    })

    const getInfo = () => {
      const request = {
        pageNumber: 1,
        pageSize: 1,
        id: id
      }
      getInfoList(request).then(response => {
        // 获取点击对应的编辑对象之后 将对象数据显示在页面对应的输入框
        const data = (response.data.data.data)[0]
        form.categoryId = data.categoryId
        form.title = data.title
        form.date = timestampToTime(data.createDate)
      }).catch(err => {
        console.log(err)
      })
    }

    // 页面刷新获取全部分类
    onMounted(() => {
      getCategory()
      getInfo()
    })

    // 监听传入的category
    watch(() => categoryItem.item, (value) => {
      category.item = value
    })

    // 提交方法
    const onSubmit = () => {
      console.log('submit!')
    }

    return {
      id,
      title,
      // reactive
      category,
      form,
      // methods
      getInfo,
      onSubmit
    }
  }
}
</script>

<style scoped>

</style>
