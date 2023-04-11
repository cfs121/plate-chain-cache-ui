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
import { addAgv, updateAgv } from '@/api/wcs/agv'
import { addEditForm } from '@/mixin/add-edit-form'
import { deepClone } from '@/utils'

export default {
  mixins: [addEditForm],
  dicts: ['agv_type', 'control_type'],
  components: {},
  data() {
    return {
      title: 'AGV',
      formDesc: {
        agvCode: {
          type: 'input',
          label: 'AGV编号',
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
          label: 'AGV类型',
          layout: 12,
          required: true,
          options: () => {
            return this.dict.type.agv_type.map((item) => ({
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
          label: '控制类型',
          layout: 12,
          required: true,
          options: () => {
            return this.dict.type.control_type.map((item) => ({
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
        loadCapacity: {
          type: 'input',
          label: '载重(g)',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        },
        maxDeviation: {
          type: 'input',
          label: '最大定位误差(毫米)',
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
        1: addAgv,
        2: updateAgv
      }
      await apiMap[this.type](this.formData)
      this.fetchSubmitResult()
    }
  }
}
</script>
