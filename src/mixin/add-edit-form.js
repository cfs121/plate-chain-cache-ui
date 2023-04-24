import { cloneDeep } from 'lodash'
import valid from '@/utils/valid'
export const addEditForm = {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
      default: 1,
    },
    options: { type: Object, default: () => ({}) },
  },
  computed: {
    getTitle() {
      return this.type ? this.titleMap[this.type] + this.title : '详情'
    },
    getAddOrEdit() {
      return [1, 2].includes(this.type)
    },
    getIsUpdate() {
      return this.type === 2
    },
    getIsView() {
      return this.type === 3
    },
    getIsAdd() {
      return this.type === 1
    },
  },
  watch: {
    visible(val) {
      this.dialogFormVisible = val
    },
  },
  data() {
    return {
      dialogFormVisible: this.visible,
      copyFormDesc: {},
      formData: {},
      order: [],
      titleMap: {
        1: '添加',
        2: '修改',
        3: '查看',
      },
    }
  },
  methods: {
    ...valid,
    async fetchSubmitResult() {
      this.$modal.msgSuccess(`${this.titleMap[this.type]}成功`)
      this.handleClosed()
      this.$emit('success')
    },
    handleClosed() {
      this.$emit('update:visible', false)
      this.formData = {}
      this.formDesc = cloneDeep(this.copyFormDesc || {})
      this.order = []
    },
    setTimeRange(start, end) {
      return this.type === 3
        ? `从${start}，至${end}`
        : [new Date(start), new Date(end)]
    },
    async initViewData() {
      for (const key in this.options.viewFormDesc) {
        if (this.formDesc[key]) {
          delete this.options.viewFormDesc[key]
        }
      }
      this.formDesc = { ...this.formDesc, ...this.options.viewFormDesc }
      for (const key in this.formDesc) {
        const { labelWidth, layoutMax, layout, type, ...rest } =
          this.formDesc[key]
        this.formDesc[key] = {
          ...this.formDesc[key],
          type: ['json-editor', 'gallery', 'select'].includes(type)
            ? type
            : 'text',
          required: false,
          attrs: {
            ...rest.attrs,
            clearable: false,
            disabled: true,
          },
          layout: labelWidth === '0' || layoutMax ? 24 : 12,
        }
      }
      const noOrder = []
      const order = []
      Object.entries(this.formDesc).map((item) => {
        item[1].order
          ? order.push({ ...item[1], field: item[0] })
          : noOrder.push(item[0])
      })
      const arrField = order
        .sort((a, b) => a.order - b.order)
        .map((item) => item.field)
      this.order = [...noOrder, ...arrField]
    },
    async initFormDesc() {
      if (!Object.keys(this.copyFormDesc).length && this.formDesc) {
        for (const key in this.formDesc) {
          const item = this.formDesc[key]
          item.attrs = {
            ...(item.attrs || {}),
            clearable:
              'clearable' in (item?.attrs || {})
                ? item?.attrs?.clearable
                : true,
          }
          this.$set(this.formDesc[key], 'attrs', item.attrs)
        }
        this.copyFormDesc = cloneDeep(this.formDesc || {})
      } else {
        this.formDesc = cloneDeep(this.copyFormDesc || {})
      }

      const isView = this.type === 3

      if (isView) {
        await this.initViewData()
      }

      if (this.gridOptions) {
        if ('columns' in this.gridOptions) {
          const index = this.gridOptions.columns.findIndex(
            (item) => item.type === 'checkbox'
          )
          const indexOption = this.gridOptions.columns[index]
          if (indexOption) {
            indexOption.visible = !isView
            this.gridOptions.columns.splice(index, 1, indexOption)
          }
        }

        this.gridOptions.editConfig.enabled = [1, 2].includes(this.type)
        this.gridOptions.toolbarConfig.buttons.map((item) => {
          item.visible = !isView
        })
      }

      this.formData = { ...(this.formResetData || {}), ...this.formData }
      Object.entries(this.formDesc).map((item) => {
        if ('default' in item[1] && !(item[0] in this.formData)) {
          this.$set(this.formData, item[0], item[1].default)
        }
      })

      Object.keys(this.formDesc).forEach((item) => {
        if (!(item in this.formData)) {
          this.$set(this.formData, item, '')
        }
      })
    },
  },
}
