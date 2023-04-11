<template>
  <div class="grid22">
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
  </div>
</template>

<script>
import { add, update } from '@/api/wcs/grid'
import { addEditForm } from '@/mixin/add-edit-form'
import { deepClone } from '@/utils'

export default {
  mixins: [addEditForm],
  // 添加字典数据
  // dicts: ['dic'],
  components: {},
  data() {
    return {
      title: 'Grid',
      formDesc: {
        x: {
          type: 'input',
          label: '横坐标',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        },
        y: {
          type: 'input',
          label: '纵坐标',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        },
        z: {
          type: 'input',
          label: '层',
          required: true,
          layout: 12,
          attrs: {
            clearable: true
          }
        },
        type: {
          type: 'input',
          label: '网格单元类型：',
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
        1: add,
        2: update
      }
      await apiMap[this.type](this.formData)
      this.fetchSubmitResult()
    }
  }
}
</script>

<style lang="scss" scoped>
.grid22 {
  text-align: center;
}
</style>
