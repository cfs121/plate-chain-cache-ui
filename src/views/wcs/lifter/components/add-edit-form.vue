<template>
  <ele-form-dialog
    v-model="formData"
    :type="type"
    label-position="left"
    :form-desc="formDesc"
    :rules="rules"
    :visible.sync="dialogFormVisible"
    :title="getTitle"
    width="820px"
    :is-show-submit-btn="getAddOrEdit"
    :is-show-cancel-btn="getAddOrEdit"
    :form-attrs="{ labelSuffix: ':', size: getIsView ? 'mini_mini' : '' }"
    :is-responsive="false"
    :request-fn="handleSubmit"
    @closed="handleClosed"
    @open="handleOpen"
  >
  </ele-form-dialog>
</template>

<script>
import { addLifter, updateLifter } from '@/api/wcs/lifter'
import { addEditForm } from '@/mixin/add-edit-form'
import { deepClone } from '@/utils'

export default {
  mixins: [addEditForm],
  dicts: ['lifter_status', 'up_down_location'],
  components: {},
  data() {
    return {
      title: 'Lifter',
      formDesc: {
        agvCode: {
          type: 'input',
          label: '提升机编号',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        },
        brand: {
          type: 'input',
          label: '品牌商',
          layout: 12,
          required: true,
          attrs: {
            clearable: true
          }

        },
        agvType: {
          type: 'select',
          label: '提升机状态',
          layout: 12,
          required: true,
          options: () => {
            return this.dict.type.lifter_status.map((item) => ({
              text: item.label,
              value: Number(item.value)
            }))
          },
          attrs: {
            clearable: true
          }
        },
        controlType: {
          type: 'select',
          label: '上下料位置',
          layout: 12,
          required: true,
          options: () => {
            return this.dict.type.up_down_location.map((item) => ({
              text: item.label,
              value: Number(item.value)
            }))
          },
          attrs: {
            clearable: true
          }
        },
        ip: {
          type: 'input',
          label: 'ip地址',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        },
        port: {
          type: 'input',
          label: '端口号',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        },
        lifterMaxHeight: {
          type: 'input',
          label: '最大运行高度',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        },
        loadCapacity: {
          type: 'input',
          label: '载重(g)',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        }
      },
      rules: {}
    }
  },
  methods: {
    async handleOpen() {
      this.formData = deepClone(this.options)
      this.initFormDesc()
    },
    async handleSubmit() {
      const apiMap = {
        1: addLifter,
        2: updateLifter
      }
      await apiMap[this.type](this.formData)
      this.fetchSubmitResult()
    }
  }
}
</script>

