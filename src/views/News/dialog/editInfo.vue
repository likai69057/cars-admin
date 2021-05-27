<template>
  <!-- 新增弹窗 -->
  <el-dialog title="编辑" :visible.sync="dialogInfoFlag" :modal-append-to-body="false" @open="openDialog" @close="close(dialogInfoFlag)" width="580px">
      <el-form :model="form" ref="editInfoForm">
      <el-form-item label="类别:" :label-width="formLabelWidth" prop="category">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option
            v-for="item in categoryOptions.item"
            :key="item.id"
            :label="item.category_name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="内容:" :label-width="formLabelWidth" prop="content">
        <el-input v-model="form.content" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="danger" :loading="submitLoading" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editInfo } from '../../../api/news'
import { reactive, ref, watch } from '@vue/composition-api'

export default {
  name: 'Dialog',
  props: {
    editDialogInfo: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    editDialogInfoObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props, { root, emit, refs }) {
    // 由于父传子的props无法修改 定义个属性控制是否关闭弹窗
    const dialogInfoFlag = ref(false)
    const formLabelWidth = ref('70px')
    const submitLoading = ref(false)

    const categoryOptions = reactive({
      item: []
    })
    const form = reactive({
      id: '',
      category: '',
      title: '',
      content: ''
    })

    // 关闭弹窗
    const close = (val) => {
      dialogInfoFlag.value = false
      emit('closeEdit', val)
    }
    // 打开弹窗获取编辑对象和分类列表
    const openDialog = () => {
      categoryOptions.item = props.category
      // 将父组件传给子组件的编辑对象的categoryId与category的id(categoryId)对比 获取categoryName
      const categoryData = props.category.filter(item => {
        return item.id === props.editDialogInfoObj.categoryId
      })
      console.log(props.editDialogInfoObj)
      form.category = categoryData[0].category_name
      form.title = props.editDialogInfoObj.title
      form.content = props.editDialogInfoObj.content
      form.id = props.editDialogInfoObj.id
    }

    // 提交方法
    const submit = () => {
      const requestData = {
        id: form.id,
        categoryId: form.category,
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
        console.log(response)
        root.$message({
          message: response.data.message,
          type: 'success'
        })
        submitLoading.value = false
        // 提交完成 获取最新表单
        emit('GetInfoList')
        // 注意 重置表单必须在重置的元素绑定prop属性
        refs.addInfoForm.resetFields()
        // 重置完表单之后关闭弹窗
        dialogInfoFlag.value = false
      }).catch(err => {
        console.log(err)
      })
    }
    // 取消
    const cancel = () => {
      refs.editInfoForm.resetFields()
      dialogInfoFlag.value = false
    }

    watch(() => props.editDialogInfo, () => {
      dialogInfoFlag.value = props.editDialogInfo
    })

    return {
      // ref
      dialogInfoFlag,
      formLabelWidth,
      submitLoading,
      // reactive
      categoryOptions,
      form,
      // methods
      close,
      openDialog,
      submit,
      cancel
    }
  }
}
</script>

<style scoped>

</style>
