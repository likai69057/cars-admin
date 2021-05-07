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
