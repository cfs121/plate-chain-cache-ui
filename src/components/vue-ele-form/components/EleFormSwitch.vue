<template>
  <el-switch
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="onEvents"
  />
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormSwitch',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@boolean'
    }
  }
}
</script>
