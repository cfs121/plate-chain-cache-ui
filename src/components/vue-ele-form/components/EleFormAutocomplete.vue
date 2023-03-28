<template>
  <el-autocomplete
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    v-on="onEvents"
  >
    <!-- 作用域插槽 -->
    <template v-if="scopedSlots.default" #default="data">
      <extend-slot :data="data" :render="scopedSlots.default"/>
    </template>

    <!-- 非作用域插槽 -->
    <template v-for="(render, key) of slots" #[key]>
      <extend-slot :key="key" :render="render"/>
    </template>
  </el-autocomplete>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormAutocomplete',
  mixins: [formMixin],
  data() {
    return {
      type: ['String'],
      mockRule: '@string'
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
    },
    slots() {
      return this.desc && this.desc.slots ? this.desc.slots : {}
    }
  }
}
</script>
