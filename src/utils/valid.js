export default {
  required: (message) => ({
    required: true,
    message: !message ? '* 必填' : message,
    trigger: 'change'
  }),
  required_trigger: (message, trigger) => ({
    required: true,
    message: message,
    trigger: trigger
  }),
  required_type: (message, type) => ({
    type: type,
    required: true,
    message: message,
    trigger: 'change'
  }),
  numberOrletter: () => ({
    message: '该字段不能有汉字',
    trigger: 'blur',
    pattern: /^[^\u4E00-\u9FA5]+$/
  }),

  numberAndTwo: () => ({
    message: '该字段只能输入两位数字',
    trigger: 'blur',
    pattern: /^[0-9]{2}$/
  }),
  numberOrenglish: () => ({
    message: '该字段只能是数字、字母',
    trigger: 'blur',
    pattern: /^[A-Za-z0-9]+$/
  }),
  numberOrletterLine: () => ({
    message: '该字段只能是数字、字母、下划线',
    trigger: 'blur',
    pattern: /^[A-Za-z0-9._]+$/
  }),
  isNumber: (message) => ({
    message: message || '该字段只能是数字',
    trigger: 'blur',
    pattern: /^[0-9.]+$/
  }),
  isIp: () => ({
    message: '格式错误',
    trigger: 'blur',
    pattern: /^[\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}]+$/
  }),
  mobile: () => ({
    message: '手机号格式错误',
    trigger: 'change',
    pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  }),
  IdCard: () => ({
    message: '身份证格式错误',
    trigger: 'change',
    pattern:
      /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
  })
}
