import request from '@/utils/request'
import { parseStrEmpty } from '@/utils/ruoyi'

// 查询用户列表
export function listUser(params) {
  return request({
    url: '/sys-user/page',
    method: 'get',
    params
  })
}

// 获取用户详情
export function getUserInfo(userId) {
  return request({
    url: '/sys-user/info',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: '/sys-user/' + parseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/sys-user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/sys-user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(ids) {
  return request({
    url: '/sys-user/',
    method: 'delete',
    data: ids
  })
}

// 用户密码重置
export function resetUserPwd(id, password) {
  return request({
    url: '/sys-user/password',
    method: 'put',
    data: {
      id,
      password
    }
  })
}

// 用户状态修改
export function changeUserStatus(data) {
  return request({
    url: '/sys-user/status',
    method: 'put',
    data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/user/profile/password',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/user/profile/avatar',
    method: 'put',
    data: data
  })
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: '/sys-user-role/' + userId,
    method: 'get'
  })
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/sys-user-role',
    method: 'put',
    params: data
  })
}

// 查询部门下拉树结构
export function deptTreeSelect() {
  return request({
    url: '/sys-dept/tree',
    method: 'get'
  })
}

// 查询状态正常的部门下拉树结构
export function normalDeptTreeSelect() {
  return request({
    url: '/sys-dept/tree-normal',
    method: 'get'
  })
}
