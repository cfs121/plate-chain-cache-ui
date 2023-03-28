<template>
  <el-input
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    v-bind="attrs"
    v-on="desc.on"
    @input="handleChange"
  >
    <template v-for="(render, key) of slots" #[key]>
      <extend-slot :key="key" :render="render"/>
    </template>
  </el-input>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormInput',
  mixins: [formMixin],
  data() {
    return {
      mockRule: '@string',
      type: ['String', 'Number']
    }
  },
  computed: {
    defaultAttrs() {
      return {
        placeholder: this.t('ele-form.input') + this.desc._label
      }
    }
  },
  methods: {
    handleChange(val) {
      if (this.attrs.type === 'number') {
        val = Number(val)
      }
      this.$emit('input', val)
    }
  }
}
</script>
