export default {
  border: 'full',
  showHeaderOverflow: true,
  showOverflow: true,
  keepSource: true,
  stripe: true,
  syncResize: true,
  autoResize: true,
  keepSource: true,
  round: true,
  id: 'demo',
  rowId: 'id',
  align: 'center',
  rowConfig: {
    isHover: true,
    isCurrent: true
  },
  resizableConfig: {
    minWidth: 85
  },
  columnConfig: {
    resizable: true,
    isCurrent: true,
    isHover: true,
    minWidth: '80px'
  },
  customConfig: {
    storage: true
  },
  printConfig: {
    columns: []
  },
  sortConfig: {
    trigger: 'cell',
    remote: false
  },
  filterConfig: {
    remote: true
  },
  pagerConfig: {
    border: true,
    background: true,
    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
    layouts: [
      'PrevJump',
      'PrevPage',
      'JumpNumber',
      'NextPage',
      'NextJump',
      'Sizes',
      'FullJump',
      'Total'
    ]
  },
  formConfig: {
    titleWidth: 100,
    titleAlign: 'right',
    collapseStatus: true,
    titleOverflow: '',
    items: []
  },
  toolbarConfig: {
    size: 'mini',
    refresh: true,
    print: true,
    zoom: true,
    custom: true,
    buttons: [],
    tools: []
  },
  proxyConfig: {
    seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
    sort: false, // 启用排序代理，当点击排序时会自动触发 query 行为
    filter: false, // 启用筛选代理，当点击筛选时会自动触发 query 行为
    form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
    props: {
      result: 'content', // 配置响应结果列表字段
      total: 'total', // 配置响应结果总页数字段
      message: 'msg'
    }
  },
  columns: [],
  checkboxConfig: {
    labelField: '',
    reserve: true,
    highlight: true,
    range: true
  },
  editConfig: {
    mode: 'row',
    showStatus: true,
    showUpdateStatus: true,
    showInsertStatus: true,
    showAsterisk: true
  }
}
