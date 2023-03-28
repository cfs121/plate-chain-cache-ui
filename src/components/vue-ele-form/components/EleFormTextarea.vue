<template>
  <el-input
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    type="textarea"
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
  name: 'EleFormTextarea',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@cparagraph',
      type: ['String', 'Number']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        autosize: { minRows: 6 },
        placeholder: this.t('ele-form.input') + this.desc._label
      }
    }
  }
}
</script>
