<template>
  <el-radio-group
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="onEvents"
  >
    <el-radio-button
      v-for="option of options"
      :key="option.value"
      :label="option.value"
      v-bind="option.attrs"
    >{{ option.text }}</el-radio-button>
  </el-radio-group>
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormRadioButton',
  mixins: [formMixin],
  data() {
    return {
      mockRule: 'radio',
      type: ['String', 'Number', 'Boolean'],
      newValue: this.value || null
    }
  }
}
</script>
