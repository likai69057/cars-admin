<template>
  <div id="category">
    <el-button type="danger" @click="ShowFirst">添加一级分类</el-button>
    <hr style="margin: 30px -30px"/>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="categoryItem">
            <div class="category-wrap" v-for="item in category.item" :key="item.id">
              <i class="iconfont icon-jiahao"></i>
              <h4>
                {{ item.category_name }}
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>添加子集</el-button>
                  <el-button size="mini" round @click="deleteFirstCategory(item.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="childrenItem in item.children" :key="childrenItem.id">{{ childrenItem.category_name }}</li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类名称</h4>
          <el-form class="form-wrap" label-position='right' label-width="120px" ref="categoryForm">
            <el-form-item label="一级分类名称:" v-if="categoryFirstShow">
              <el-input v-model="form.categoryName" :disabled="categoryFirstForbidden"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称:" v-if="categoryChildrenShow">
              <el-input v-model="form.secCategoryName" :disabled="categorySecForbidden"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submit"
                :loading="buttonLoading"
                :disabled="categoryButtonForbidden"
              >
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import { addFirstCategory, getFirstCategory, deleteCategory } from '@/api/news'
export default {
  name: 'category',
  setup (props, { root, refs }) {
    // 控制一级分类的显示与隐藏
    const categoryFirstShow = ref(true)
    // 控制一级分类输入框的禁用状态
    const categoryFirstForbidden = ref(true)
    // 控制二级分类的显示与隐藏
    const categoryChildrenShow = ref(true)
    // 控制二级分类输入框的禁用状态
    const categorySecForbidden = ref(true)
    // 控制提交按钮的禁用状态
    const categoryButtonForbidden = ref(true)
    // 控制提交按钮的loading状态
    const buttonLoading = ref(false)
    // 一二级分类输入框的绑定数据
    const form = reactive({
      categoryName: '',
      secCategoryName: ''
    })
    // vue3.0写法的reactive中最好存储jason格式的对象 不建议直接写数组
    const category = reactive({
      item: []
    })

    // 控制添加一级分类的显示
    const ShowFirst = () => {
      categoryFirstShow.value = true
      categoryChildrenShow.value = false
      categoryFirstForbidden.value = false
      categoryButtonForbidden.value = false
    }

    // 添加一级分类的提交
    const submit = () => {
      buttonLoading.value = true
      if (form.categoryName) {
        addFirstCategory({ categoryName: form.categoryName }).then(response => {
          const data = response.data
          // 添加一级分类之后 在页面直接获取一级分类
          category.item.push(response.data.data)
          buttonLoading.value = false
          form.categoryName = ''
          form.secCategoryName = ''
          root.$message({
            message: data.message,
            type: 'success'
          })
        }).catch(error => {
          console.log(error)
          buttonLoading.value = false
        })
      } else {
        root.$message({
          message: '分类名称不能为空！',
          type: 'error'
        })
      }
    }

    // 删除一级分类
    const deleteFirstCategory = (categoryId) => {
      deleteCategory({ categoryId: categoryId }).then(response => {
        const data = response.data
        console.log(category.item)
        category.item.filter(item => {
          return item.id !== categoryId
        })
        console.log(category.item)
        root.$message({
          message: data.message,
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    }

    // 获取一级分类
    const getCategory = () => {
      getFirstCategory().then(response => {
        const data = response.data.data.data
        category.item = data
      }).catch(error => {
        console.log(error)
      })
    }

    // 获取一级分类之后 在页面加载完成之后直接调用
    onMounted(() => {
      getCategory()
    })

    return {
      // ref
      categoryFirstShow,
      categoryChildrenShow,
      buttonLoading,
      categoryFirstForbidden,
      categorySecForbidden,
      categoryButtonForbidden,
      // reactive
      form,
      category,
      // method
      submit,
      ShowFirst,
      deleteFirstCategory
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
    z-index: 2;
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
  transition: all .5s ease 0s;
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
