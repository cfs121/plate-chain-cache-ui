import request from '@/utils/request'

// 查询参数列表
export function listConfig(query) {
  return request({
    url: '/sys-config/page',
    method: 'get',
    params: {
      Q_EQ_configName: query.configName,
      Q_EQ_configKey: query.configKey,
      Q_EQ_configType: query.configType,
      Q_BT_createdTime: query.dataRange
    }
  })
}

// 查询参数详细
export function getConfig(id) {
  return request({
    url: '/sys-config/' + id,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey) {
  return request({
    url: '/sys-config/value/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/sys-config',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(data) {
  return request({
    url: '/sys-config',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(id) {
  return request({
    url: '/sys-config/' + id,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete'
  })
}
