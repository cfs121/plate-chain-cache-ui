<template>
  <el-rate
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    style="margin-top: 10px"
    v-bind="attrs"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'
export default {
  name: 'EleFormRate',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@integer(0,5)',
      type: 'Number'
    }
  },
  watch: {
    attrs: {
      handler(attrs) {
        const { min = 0, max = 5 } = attrs
        this.mockRule = `@integer(${min}, ${max})`
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
