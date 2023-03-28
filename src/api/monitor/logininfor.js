import request from '@/utils/request'

// 查询登录日志列表
export function list(query) {
  return request({
    url: '/monitor_loginlog/page',
    method: 'get',
    params: {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      Q_EQ_ipAddr: query.ipAddr,
      Q_EQ_userName: query.userName,
      Q_EQ_status: query.status,
      Q_BT_loginTime: query.dataRange
    }
  })
}

// 删除登录日志
export function delLoginLog(ids) {
  return request({
    url: '/monitor_loginlog/',
    method: 'delete',
    data: ids
  })
}

//

// 解锁用户登录状态
export function unlockLoginLog(userName) {
  return request({
    url: '/monitor_loginlog/unlock/' + userName,
    method: 'get'
  })
}

// 清空登录日志
export function cleanLoginLog() {
  return request({
    url: '/monitor_loginlog/clean',
    method: 'delete'
  })
}
