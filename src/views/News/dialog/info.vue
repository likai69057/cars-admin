<template>
  <!-- 新增弹窗 -->
  <el-dialog title="新增" :visible.sync="dialogInfoFlag" :modal-append-to-body="false" @opened="openDialog" @close="close(dialogInfoFlag)" width="580px">
    <el-form :model="form">
      <el-form-item label="类别:" :label-width="formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option
            v-for="item in categoryOptions"
            :key="item.id"
            :label="item.category_name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题:" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况:" :label-width="formLabelWidth">
        <el-input v-model="form.name" type="textarea" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="danger" @click="dialogFormVisible = false">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { addInfo } from '../../../api/news'

export default {
  name: 'Dialog',
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
  // 监听父传子的值
  watch: {
    dialogInfo: {
      handler (newValue, oldValue) {
        this.dialogInfoFlag = newValue
      }
    }
  },
  data () {
    return {
      // 由于父传子的props无法修改 定义个属性控制是否关闭弹窗
      dialogInfoFlag: false,
      dialogFormVisible: true,
      form: {
        name: '',
        category: ''
      },
      formLabelWidth: '70px',
      categoryOptions: []
    }
  },
  methods: {
    // 关闭弹窗
    close (val) {
      this.$emit('close', val)
    },
    // 打开弹窗获取一级分类的name
    openDialog () {
      console.log(this.category)
      this.categoryOptions = this.category
    }
  }
}
</script>

<style scoped>

</style>
