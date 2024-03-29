import request from '@/utils/request'

// 查询Ga列表
export function page(params) {
    return request({
        url: '/ga/page',
        method: 'get',
        params: params
    })
}
// 查询Ga详细
export function gaDisplay(gaId,librariesId,time,gas) {
  return request({
    url: '/ga/display' ,
    method: 'get',
    params: {
      gaId: gaId,
      librariesId: librariesId,
      time: time,
      gas: gas
    }
  })
}
export function gaDisplay2(gaId,librariesId,gas) {
  return request({
    url: '/ga/result' ,
    method: 'get',
    params: {
      gaId: gaId,
      librariesId: librariesId,
      gas: gas
    }
  })
}
export function gaDisplay22(gaId,librariesId,gas,n) {
  return request({
    url: '/ga/result' ,
    method: 'get',
    params: {
      gaId: gaId,
      librariesId: librariesId,
      gas: gas,
      n:n
    }
  })
}
export function gaDisplay3(gaId,librariesId,gas) {
  return request({
    url: '/ga/result2' ,
    method: 'get',
    params: {
      gaId: gaId,
      librariesId: librariesId,
      gas: gas
    }
  })
}
// 查询Ga详细
export function get(id) {
    return request({
        url: '/ga/' + id,
        method: 'get'
    })
}

// 新增Ga
export function add(data) {
    return request({
        url: '/ga',
        method: 'post',
        data: data
    })
}

// 修改Ga
export function update(data) {
    return request({
        url: '/ga',
        method: 'put',
        data: data
    })
}

// 删除Ga
export function del(ids) {
    return request({
        url: '/ga',
        method: 'delete',
        data: ids
    })
}

