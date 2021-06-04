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
      <quill-editor v-model="form.content" ref="myQuillEditor" :options="form.editorOption" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="submitLoading" >保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, onMounted, watch, ref } from '@vue/composition-api'
import { common } from '../../api/common'
import { getInfoList, editInfo } from '../../api/news'
import { timestampToTime } from '../../utils/common'

// 富文本编辑器
import { quillEditor } from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'InfoDetailed',
  components: {
    quillEditor
  },
  setup (props, { root, refs, emit }) {
    // 页面跳转时获取对应传入query参数(json格式)
    const id = root.$route.query.id
    const title = root.$route.query.title
    // 控制提交按钮的状态
    const submitLoading = ref(false)
    // 获取分类
    const { getCategory, categoryItem } = common()
    // form表单
    const form = reactive({
      id: '',
      categoryId: '',
      title: '',
      date: '',
      content: '',
      editorOption: {
        placeholder: '编辑文章内容'
      }
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
        form.content = data.content
        form.id = data.id
      }).catch(err => {
        console.log(err)
      })
    }

    // 提交方法
    const onSubmit = () => {
      const requestData = {
        id: form.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content
      }
      if (!form.category) {
        root.$message({
          message: '分类名称不能为空!',
          type: 'error'
        })
        return false
      }
      if (!form.title) {
        root.$message({
          message: '标题不能为空!',
          type: 'error'
        })
        return false
      }
      if (!form.content) {
        root.$message({
          message: '内容不能为空!',
          type: 'error'
        })
        return false
      }
      submitLoading.value = true
      editInfo(requestData).then(response => {
        root.$message({
          message: response.data.message,
          type: 'success'
        })
        submitLoading.value = false
        // 提交完成 获取最新表单
        emit('GetInfoList')
        // 注意 重置表单必须在重置的元素绑定prop属性
        refs.myQuillEditor.resetFields()
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

    return {
      id,
      title,
      submitLoading,
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
