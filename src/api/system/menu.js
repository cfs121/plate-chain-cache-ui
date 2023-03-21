import request from '@/utils/request'

// 查询菜单列表
export function listMenu(query) {
  return request({
    url: '/sys-menu/page',
    method: 'get',
    params: {
      counted: false,
      pageNumber: 1,
      pageSize: 1000,
      Q_EQ_menuName: query.menuName,
      Q_EQ_visible: query.visible
    }
  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: '/sys-menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect() {
  return request({
    url: '/sys-menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/sys-menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/sys-menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/sys-menu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: '/sys-menu/' + menuId,
    method: 'delete'
  })
}
