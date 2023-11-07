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
import { add, update } from '@/api/wcs/libraries'
import { addEditForm } from '@/mixin/add-edit-form'
import { deepClone } from '@/utils'

export default {
  mixins: [addEditForm],
  // 添加字典数据
  // dicts: ['dic'],
  components: {},
  data() {
    return {
      title: 'Libraries',
      formDesc: {
        plateChain: {
          type: 'number',
          label: '板链缓存线数量',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        inlet: {
          type: 'number',
          label: '入库口数量',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        outlet: {
          type: 'number',
          label: '出库口数量',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        inRgv: {
          type: 'number',
          label: '入库rgv数量',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        outRgv: {
          type: 'number',
          label: '出库rgv数量',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
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
        1: add,
        2: update
      }
      await apiMap[this.type](this.formData)
      this.fetchSubmitResult()
    }
  }
}
</script>

