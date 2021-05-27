<template>
  <div id="category">
    <el-button type="danger" @click="ShowFirst">添加一级分类</el-button>
    <hr style="margin: 30px -30px"/>
    <div>
      <el-row :gutter="30">
        <el-col :span="10">
          <div class="categoryItem">
            <div class="category-wrap" v-for="item in category.item" :key="item.id">
              <i class="iconfont icon-jiahao"></i>
              <h4>
                {{ item.category_name }}
                <div class="button-group">
                  <el-button type="danger" size="mini" round @click="editFirstCategoryBtn({ data: item })">编辑</el-button>
                  <el-button type="success" size="mini" round @click="handleAddChildren({ data: item })">添加子集</el-button>
                  <el-button size="mini" round @click="deleteFirstCategory(item.id)">删除</el-button>
                </div>
              </h4>
              <ul v-if="item.children">
                <li v-for="childrenItem in item.children" :key="childrenItem.id">
                  {{ childrenItem.category_name }}
                  <div class="button-group">
                    <el-button
                      type="danger"
                      size="mini"
                      round
                      @click="editSecCategoryBtn({ data: childrenItem, parent: item })"
                    >
                      编辑
                    </el-button>
                    <el-button size="mini" round @click="deleteSecCategory(childrenItem.id)">删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
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
import { reactive, ref, onMounted, watch } from '@vue/composition-api'
import { addFirstCategory, deleteCategory, editCategory, addChildrenCategory } from '@/api/news'
import { common } from '../../api/common'

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
    // 由于提交按钮在添加一级分类、编辑、添加二级分类都是同一个 为了区分
    const submitType = ref('')
    // 一二级分类输入框的绑定数据
    const form = reactive({
      categoryName: '',
      secCategoryName: ''
    })
    // vue3.0写法的reactive中最好存储jason格式的对象 不建议直接写数组
    const category = reactive({
      // 所有category对象的数组
      item: [],
      // 编辑选中的当前对象
      current: []
    })

    // 获取一级分类
    const { getAllCategory, categoryItem } = common()

    // 控制添加一级分类的显示
    const ShowFirst = () => {
      categoryChildrenShow.value = false
      categoryFirstForbidden.value = false
      categoryButtonForbidden.value = false

      submitType.value = 'firstCategoryAdd'
    }

    // 提交按钮的方法
    const submit = () => {
      buttonLoading.value = true
      // 提交之前先判断一下提交的类型是什么 添加一级、添加二级、编辑
      if (submitType.value === 'firstCategoryAdd') {
        addFirst()
      }
      if (submitType.value === 'firstCategoryEdit') {
        // 完成编辑之后的替换
        editFirstCategory()
      }
      if (submitType.value === 'secCategoryAdd') {
        // 完成编辑之后的替换
        AddChildrenCategory()
      }
      if (submitType.value === 'secCategoryEdit') {
        // 完成编辑之后的替换
        editSecCategory()
      }
    }

    // 添加一级分类
    const addFirst = () => {
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
        buttonLoading.value = false
      }
    }

    // 删除一级分类
    const deleteFirstCategory = (categoryId) => {
      root.confirm({
        content: '确认删除当前信息？删除后无法恢复！',
        func: () => {
          deleteCategory({ categoryId: categoryId }).then(response => {
            const index = category.item.findIndex(item => {
              return item.id === categoryId
            })
            category.item.splice(index, 1)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }

    // 编辑一级分类按钮方法
    const editFirstCategoryBtn = (params) => {
      console.log(params)
      submitType.value = 'firstCategoryEdit'
      // 1.点击编辑按钮 右侧的一级分类显示方法先调用
      categoryChildrenShow.value = false
      categoryFirstForbidden.value = false
      categoryButtonForbidden.value = false
      // 2.输入框获取到一级分类并显示
      form.categoryName = params.data.category_name
      // 3.把点击的item传入category的current数组
      category.current = params.data
    }

    // 编辑一级分类完成替换
    const editFirstCategory = () => {
      if (form.categoryName === '') {
        root.$message({
          message: '分类名称不能为空！',
          type: 'warning'
        })
        buttonLoading.value = false
        return false
      }
      const requestData = {
        id: category.current.id,
        categoryName: form.categoryName
      }
      editCategory(requestData).then(response => {
        const data = response.data
        root.$message({
          message: data.message,
          type: 'success'
        })
        category.item.forEach(item => {
          if (item.id === category.current.id) {
            item.category_name = form.categoryName
          }
        })
        // 清空输入框的内容和loading状态以及直接存储的current
        form.categoryName = ''
        buttonLoading.value = false
        category.current = []
      }).catch(err => {
        // 清空输入框的内容和loading状态以及直接存储的current
        form.categoryName = ''
        buttonLoading.value = false
        category.current = []
        console.log(err)
      })
    }

    // 添加子集按钮
    const handleAddChildren = (params) => {
      // 二级输入框禁用取消
      categorySecForbidden.value = false
      // 一级输入框保持禁用
      categoryFirstForbidden.value = true
      // 提交按钮的开启
      categoryButtonForbidden.value = false
      // 一级分类输入框显示对应的categoryName
      category.current = params.data
      form.categoryName = params.data.category_name
      // 防止在点击添加一级分类后再点击添加子集不显示一级分类
      categoryChildrenShow.value = true

      // 点击添加子集 submit的提交状态变成添加子集
      submitType.value = 'secCategoryAdd'
    }

    // 添加子集后完成提交并显示
    const AddChildrenCategory = () => {
      if (!form.secCategoryName) {
        root.$message({
          message: '子集分类名称不能为空！',
          type: 'error'
        })
        return false
      }
      const requestData = {
        parentId: category.current.id,
        categoryName: form.secCategoryName
      }
      addChildrenCategory(requestData).then(response => {
        const data = response.data
        root.$message({
          message: data.message,
          type: 'success'
        })
        // 清空输入框的内容和loading状态以及直接存储的current
        form.secCategoryName = ''
        buttonLoading.value = false
        // 完成之后重新获取全部分类
        getAllCategory()
      }).catch(err => {
        console.log(err)
        buttonLoading.value = false
      })
    }

    // 删除子集按钮方法
    const deleteSecCategory = (categoryId) => {
      console.log(categoryId)
      root.confirm({
        content: '确认删除当前信息？删除后无法恢复！',
        func: () => {
          deleteCategory({ categoryId: categoryId }).then(response => {
            getAllCategory()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }

    // 编辑子集按钮
    const editSecCategoryBtn = (params) => {
      // 点击编辑 提交状态修改成子集编辑
      submitType.value = 'secCategoryEdit'
      console.log(params.parent)
      // 点击后 一级分类名称输入框显示但禁用
      categoryFirstShow.value = true
      categoryFirstForbidden.value = true
      form.categoryName = params.parent.category_name
      // 二级输入框显示并且取消禁用
      categoryChildrenShow.value = true
      categorySecForbidden.value = false
      form.secCategoryName = params.data.category_name
      // 提交按钮取消禁用状态
      categoryButtonForbidden.value = false
      // 3.把点击的childrenItem传入category的current数组 为了在提交是获取到点击的对象
      category.current = params.data
    }

    // 编辑二级分类完成替换
    const editSecCategory = () => {
      if (form.secCategoryName === '') {
        root.$message({
          message: '分类名称不能为空！',
          type: 'warning'
        })
        buttonLoading.value = false
        return false
      }
      const requestData = {
        id: category.current.id,
        categoryName: form.secCategoryName
      }
      editCategory(requestData).then(response => {
        const data = response.data
        root.$message({
          message: data.message,
          type: 'success'
        })
        // 清空输入框的内容和loading状态以及直接存储的current
        form.secCategoryName = ''
        form.categoryName = ''
        buttonLoading.value = false
        category.current = []

        // 输入框和提交按钮恢复禁用状态
        categoryFirstForbidden.value = true
        categorySecForbidden.value = true
        categoryButtonForbidden.value = true

        getAllCategory()
      }).catch(err => {
        // 清空输入框的内容和loading状态以及直接存储的current
        form.categoryName = ''
        buttonLoading.value = false
        category.current = []
        console.log(err)
      })
    }

    // 监听传入的category
    watch(() => categoryItem.item, (value) => {
      category.item = value
    })
    // 获取一级分类之后 在页面加载完成之后直接调用
    onMounted(() => {
      getAllCategory()
    })

    return {
      // ref
      categoryFirstShow,
      categoryChildrenShow,
      buttonLoading,
      categoryFirstForbidden,
      categorySecForbidden,
      categoryButtonForbidden,
      submitType,
      // reactive
      form,
      category,
      // method
      submit,
      ShowFirst,
      deleteFirstCategory,
      editFirstCategoryBtn,
      addFirst,
      handleAddChildren,
      AddChildrenCategory,
      deleteSecCategory,
      editSecCategoryBtn,
      editSecCategory
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
    font-weight: bold;
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
