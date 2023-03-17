import request from '@/utils/request'

// 登录方法
export function login(username, password, code, deviceId) {
  return request({
    url: '/login/username',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      isToken: false
    },
    method: 'post',
    params: {
      username: username,
      password: password,
      code: code,
      deviceId: deviceId
    }
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register', headers: {
      isToken: false
    }, method: 'post', data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: 'sys-user/login-info', method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout', method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captcha-image', headers: {
      isToken: false
    }, method: 'get', timeout: 20000
  })
}
