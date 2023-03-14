<template>
  <el-date-picker
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
import timeMixin from '../mixins/timeMixin'

export default {
  name: 'EleFormMonth',
  mixins: [formMixin, timeMixin],
  data() {
    return {
      mockRule: '@date',
      type: ['Date', 'String', 'Number']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        type: 'month',
        placeholder: this.t('ele-form.month')
      }
    }
  }
}
</script>
