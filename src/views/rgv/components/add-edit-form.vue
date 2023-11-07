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
import { add, update } from '@/api/wcs/rgv'
import { addEditForm } from '@/mixin/add-edit-form'
import { deepClone } from '@/utils'

export default {
  mixins: [addEditForm],
  // 添加字典数据
  // dicts: ['dic'],
  components: {},
  data() {
    return {
      title: 'Rgv',
      formDesc: {
        librariesId: {
          type: 'number',
          label: '缓存库ID',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        rgvType: {
          type: 'number',
          label: '类型：0：入库rgv  1：出库rgv ',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
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
          type: 'number',
          label: '端口号',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        speed: {
          type: 'number',
          label: '速度',
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

