<template>
  <div id="category-wrap">
    <el-button type="danger">添加一级分类</el-button>
    <hr style="margin: 30px -30px"/>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="categoryItem">
            <i class="iconfont icon-jiahao"></i>
            <h4>
              新闻
              <div class="button-group">
                <el-button type="danger" size="mini" round>编辑</el-button>
                <el-button type="success" size="mini" round>添加子集</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
            <i class="iconfont icon-jiahao"></i>
            <h4>
              新闻
              <div class="button-group">
                <el-button type="danger" size="mini" round>编辑</el-button>
                <el-button type="success" size="mini" round>添加子集</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类名称</h4>
          <el-form class="form-wrap" :label-position="labelPosition" label-width="120px">
            <el-form-item label="一级分类名称:">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'

export default {
  name: 'category',
  setup (props) {
    const labelPosition = ref('right')
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: ''
    })

    return {
      formLabelAlign,
      labelPosition
    }
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
    border-left: 1px #000 dotted;
    left: 19px;
    top: 27px;
    bottom: 21px;
  }
  i {
    position: absolute;
    left: 12px;
    font-size: 14px;
    z-index: 2;
    cursor: pointer;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    margin: 0px;
    font-size: 15px;
  }
  li {
    position: relative;
    padding-left: 40px;
    margin-left: 20px;
    font-size: 15px;
    &:before {
      content: '';
      position: absolute;
      width: 32px;
      border-bottom: 1px #000 dotted;
      left: 0px;
      top: 22px;
    }
  }
  li, h4 {
    cursor: pointer;
    transition: all .5s ease 0s;
    &:hover {
      background-color: #e9e9e9;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
  button {
    font-size: 12px;
  }
  display: none;
}
.menu-title{
  line-height: 44px;
  background-color: #e9e9e9;
  padding-left: 22px;
  margin: 0px;
  font-size: 15px;
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
</style>
