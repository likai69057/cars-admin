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

// 一级分类修改
export const editCategory = (data) => {
  return serve.request({
    method: 'POST',
    url: '/news/editCategory/',
    data
  })
}

// 新增信息
export const addInfo = (data) => {
  return serve.request({
    method: 'POST',
    url: '/news/add/',
    data
  })
}

// 获取信息列表
export const getInfoList = (data) => {
  return serve.request({
    method: 'POST',
    url: '/news/getList/',
    data
  })
}

// 删除信息列表
export const deleteInfoList = (data) => {
  return serve.request({
    method: 'POST',
    url: '/news/deleteInfo/',
    data
  })
}

// 编辑信息列表
export const editInfo = (data) => {
  return serve.request({
    method: 'POST',
    url: '/news/editInfo/',
    data
  })
}
