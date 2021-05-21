<template>
  <!-- 新增弹窗 -->
  <el-dialog title="编辑" :visible.sync="dialogInfoFlag" :modal-append-to-body="false" @opened="openDialog" @close="close(dialogInfoFlag)" width="580px">
      <el-form :model="form" ref="addInfoForm">
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
      <el-form-item label="概况:" :label-width="formLabelWidth" prop="content">
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
import { addInfo } from '../../../api/news'
import { reactive, ref, watch } from '@vue/composition-api'

export default {
  name: 'EditDialog',
  props: {
    dialogInfo: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
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
      category: '',
      title: '',
      content: ''
    })

    // 关闭弹窗
    const close = (val) => {
      dialogInfoFlag.value = false
      emit('close', val)
    }
    // 打开弹窗获取一级分类的name
    const openDialog = () => {
      categoryOptions.item = props.category
    }
    // 提交方法
    const submit = () => {
      const requestData = {
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
      addInfo(requestData).then(response => {
        console.log(response)
        root.$message({
          message: response.data.message,
          type: 'success'
        })
        submitLoading.value = false
        // 提交完成 重置表单
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
      refs.addInfoForm.resetFields()
      dialogInfoFlag.value = false
    }

    watch(() => props.dialogInfo, () => {
      dialogInfoFlag.value = props.dialogInfo
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
