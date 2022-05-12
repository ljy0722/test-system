import request from '../utils/request'
//基础信息
export const exportProblemTemplate = () => {
  return request({
    url: '/statistics/childrenUser/export',
    responseType:"blob",
    method: 'get'
  })
}
