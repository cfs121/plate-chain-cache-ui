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
import { add, update } from '@/api/wcs/plateChain'
import { addEditForm } from '@/mixin/add-edit-form'
import { deepClone } from '@/utils'

export default {
  mixins: [addEditForm],
  // 添加字典数据
  // dicts: ['dic'],
  components: {},
  data() {
    return {
      title: 'PlateChain',     
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
        type: {
          type: 'number',
          label: '板链类型：0：货架  1：快速通道',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        location: {
          type: 'number',
          label: '板链位置',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        length: {
          type: 'number',
          label: '板链长度',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        width: {
          type: 'number',
          label: '板链宽度',
          required: true,
          layout: 12,
          attrs: {
            min: 0,
            clearable: true
          }
        },
        speed: {
          type: 'number',
          label: '出入库速度，秒/托',
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

