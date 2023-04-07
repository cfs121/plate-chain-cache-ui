import request from '@/utils/request'

// 查询操作日志列表
export function list(query) {
  return request({
    url: '/monitor_operlog/page',
    method: 'get',
    params: {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      Q_LIKE_operName: query.operName,
      Q_LIKE_title: query.title,
      Q_EQ_businessType: query.businessType,
      Q_EQ_status: query.status,
      Q_BT_operTime: query.dataRange
    }
  })
}

// 删除操作日志
export function delOperlog(ids) {
  return request({
    url: '/monitor_operlog/' ,
    method: 'delete',
    data:ids
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/monitor_operlog/clean',
    method: 'delete'
  })
}
