import request from '@/utils/request'

// 查询字典类型列表
export function listType(query) {
  return request({
    url: '/sys-dict-type/page',
    method: 'get',
    params: {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      Q_EQ_dictName: query.dictName,
      Q_EQ_dictType: query.dictType,
      Q_EQ_status: query.status,
      Q_BT_createdTime: query.dataRange
    }
  })
}

// 查询字典类型详细
export function getType(dictId) {
  return request({
    url: '/sys-dict-type/' + dictId,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/sys-dict-type',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data) {
  return request({
    url: '/sys-dict-type',
    method: 'put',
    data: data
  })
}

// 删除字典类型
export function delType(dictIds) {
  return request({
    url: '/sys-dict-type/',
    method: 'delete',
    data: dictIds
  })
}

// 刷新字典缓存
export function refreshCache() {
  return request({
    url: '/sys-dict-type/refreshCache',
    method: 'delete'
  })
}

// 获取字典选择框列表
export function optionselect() {
  return request({
    url: '/sys-dict-type/option-select',
    method: 'get'
  })
}
