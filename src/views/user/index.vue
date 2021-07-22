<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="2" class="keyWord">关键字:</el-col>
      <el-col :span="3">
        <el-select></el-select>
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
  </div>
</template>

<script>
export default {
  name: 'user'
}
</script>

<style scoped lang="less">
.keyWord{
  height: 40px;
  line-height: 40px;
  font-size: 17px;
}
</style>
