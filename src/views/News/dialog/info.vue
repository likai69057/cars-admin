<template>
  <!-- 新增弹窗 -->
  <el-dialog title="新增" :visible.sync="dialogInfoFlag" :modal-append-to-body="false" @close="close(dialogInfoFlag)" width="580px">
    <el-form :model="form">
      <el-form-item label="类别:" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
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
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="danger" @click="dialogFormVisible = false">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogInfo: {
      type: Boolean,
      default: false
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
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '70px'
    }
  },
  methods: {
    close (val) {
      this.$emit('close', val)
    }
  }
}
</script>

<style scoped>

</style>
