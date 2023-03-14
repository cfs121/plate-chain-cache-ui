<template>
  <el-select
    v-model="newValue"
    :class="desc.class"
    :style="desc.style"
    class="ele-form-full-line"
    v-bind="attrs"
    :loading="loading"
    :remote-method="changeOptions"
    v-on="onEvents"
  >
    <template v-for="(render, key) of slots" #[key]>
      <extend-slot
        :key="key"
        :data="{
          options: desc.options
        }"
        :render="render"
      />
    </template>
    <el-option
      v-for="option in options"
      :key="option.value"
      :label="option.text"
      :value="option.value"
      v-bind="option.attrs"
    />
  </el-select>
</template>

<script>
import formMixin from '../mixins/formMixin'

export default {
  name: 'EleFormSelect',
  mixins: [formMixin],
  inject: ['EleForm'],
  props: {
    field: String
  },
  data() {
    return {
      loading: false,
      mockRule: 'radio',
      type: ['Boolean', 'Number', 'String', 'Array']
    }
  },
  computed: {
    remoteMethod() {
      return this.attrs['remote-method'] || this.attrs.remoteMethod
    },
    defaultAttrs() {
      return {
        placeholder: this.t('ele-form.select') + this.desc._label
      }
    }
  },
  mounted() {
    if (this.remoteMethod && this.newValue) {
      this.changeOptions(this.newValue)
    }
  },
  methods: {
    changeOptions(q) {
      if (this.remoteMethod) {
        this.loading = true
        this.remoteMethod(q, options => {
          this.loading = false
          this.EleForm.formDescData[this.field].options = options
          this.EleForm.formDescData[this.field].isRestValByOptions = false
          this.EleForm.changeOptions(options, this.field)
        })
      }
    }
  }
}
</script>
