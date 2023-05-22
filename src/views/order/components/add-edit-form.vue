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
import { add, update } from '@/api/wcs/order'
import { addEditForm } from '@/mixin/add-edit-form'
import { deepClone } from '@/utils'

export default {
  mixins: [addEditForm],
  // 添加字典数据
  // dicts: ['dic'],
  components: {},
  data() {
    return {
      title: 'Order',     
      formDesc: {
        goodsId: {
          type: 'number',
          label: '货物ID',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        inletId: {
          type: 'number',
          label: '入库口ID',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        outletId: {
          type: 'number',
          label: '出库口ID',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        number: {
          type: 'number',
          label: '货物数量',
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

