<template>
  <div id="category-wrap">
    <el-button type="danger">添加一级分类</el-button>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="categoryItem">
            <i class="iconfont icon-jiahao"></i>
            <h4>新闻</h4>
            <ul>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">weqwe</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category',
  setup (props) {
  }
}
</script>

<style scoped lang="less">
.categoryItem {
  line-height: 44px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    height: 100%;
    border-left: 1px #000 dotted;
    left: 19px;
  }
  i {
    position: absolute;
    left: 10px;
  }
  h4 {
    padding-left: 40px;
    margin: 0px;
  }
  li {
    position: relative;
    padding-left: 40px;
    margin-left: 20px;
    &:before {
      content: '';
      position: absolute;
      width: 32px;
      border-bottom: 1px #000 dotted;
      left: 0px;
      top: 22px;
    }
  }
}
</style>
