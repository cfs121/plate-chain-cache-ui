<template>
  <el-input
    v-model="newValue"
    :class="desc.class"
    :show-password="true"
    :style="desc.style"
    v-bind="attrs"
    v-on="onEvents"
  >
    <!-- 组件内部插槽 -->
    <template v-for="(render, key) of slots" #[key]>
      <extend-slot :key="key" :render="render"/>
    </template>
  </el-input>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormPassword',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@id',
      type: ['Number', 'String']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        fetchSuggestions(s, cb) {
          const res = []
          cb(res)
        },
        placeholder: this.t('ele-form.input') + this.desc._label
      }
    }
  }
}
</script>
