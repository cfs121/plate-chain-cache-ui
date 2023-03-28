// 下划线 → 小驼峰 将 snake_case 转为 snakeCase
export function snake2camel(name) {
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}

// 小驼峰 → 下划线 将 snakeCase 转为 snake_case
export function camel2snake(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}
