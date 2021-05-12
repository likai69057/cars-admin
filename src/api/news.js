// 信息模块接口
import serve from '@/utils/request'

// 一级分类添加
export const addFirstCategory = (data) => {
  return serve.request({
    method: 'POST',
    url: '/news/addFirstCategory/',
    data
  })
}

// 获取一级分类
export const getFirstCategory = () => {
  return serve.request({
    method: 'POST',
    url: '/news/getCategory/'
  })
}

// 一级分类删除
export const deleteCategory = (data) => {
  return serve.request({
    method: 'POST',
    url: '/news/deleteCategory/',
    data
  })
}
