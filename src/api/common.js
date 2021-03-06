// 针对一些公用封装接口的方法
import { getFirstCategory, getCategoryAll } from './news'
import { reactive } from '@vue/composition-api'

export const common = () => {
  const categoryItem = reactive({
    item: []
  })
  // 获取一级分类
  const getCategory = () => {
    getFirstCategory().then(response => {
      categoryItem.item = response.data.data.data
    }).catch(err => {
      console.log(err)
    })
  }
  // 获取所有分类
  const getAllCategory = () => {
    getCategoryAll().then(response => {
      categoryItem.item = response.data.data
    }).catch(err => {
      console.log(err)
    })
  }

  return {
    getCategory,
    getAllCategory,
    categoryItem
  }
}
