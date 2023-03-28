<template>
  <el-checkbox-group
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="onEvents"
  >
    <el-checkbox
      v-for="option of options"
      :key="option.value"
      :label="option.value"
      v-bind="option.attrs"
    >{{ option.text }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import formMixin from '../mixins/formMixin'
import { isUnDef } from '../tools/utils'

export default {
  name: 'EleFormCheckbox',
  mixins: [formMixin],
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      type: 'Array',
      mockRule: 'checkbox',
      newValue: []
    }
  },
  methods: {
    customInit(val) {
      if (isUnDef(val)) {
        val = []
      }
      return val
    }
  }
}
</script>
