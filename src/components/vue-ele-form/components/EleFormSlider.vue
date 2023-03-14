<template>
  <el-slider
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="desc.on"
    @input="handleChange"
  />
</template>

<script>
import { isUnDef } from '../tools/utils'
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormSlider',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@integer(0, 100)',
      type: 'Number'
    }
  },
  watch: {
    attrs: {
      handler(attrs) {
        const { min = 0, max = 100 } = attrs
        this.mockRule = `@integer(${min}, ${max})`
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleChange(val) {
      if (val === 1 && isUnDef(this.value)) return
      this.$emit('input', val)
    }
  }
}
</script>
