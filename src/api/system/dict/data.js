import request from '@/utils/request'

// 查询字典数据列表
export function listData(query) {
  return request({
    url: '/sys-dict-data/page',
    method: 'get',
    params: {
      pageNumber: query.pageNumber,
      pageSize: query.pageSize,
      Q_LIKE_dictName: query.dictName,
      Q_LIKE_dictType: query.dictType,
      Q_EQ_status: query.status
    }
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/sys-dict-data/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request({
    url: '/sys-dict-data/' + dictType + '/list',
    method: 'get'
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/sys-dict-data',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/sys-dict-data',
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: '/sys-dict-data/' + dictCode,
    method: 'delete'
  })
}
