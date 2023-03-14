<template>
  <vxe-modal
    v-model="visible"
    :width="width"
    :z-index="2000"
    class="dialog"
    show-zoom
    resize
    transfer
    destroy-on-close
    remember
    v-bind="dialogAttrs"
    @close="handleClose"
    @show="handleShow"
  >
    <!-- title 插槽 -->
    <template #title>
      <slot name="title">
        <i :class="getIcon" />
        {{ title }}
      </slot>
    </template>
    <template #corner>
      <span v-if="type === 3" name="corner" class="corner">
        <!-- <i class="vxe-icon-download" @click="handleDownLoad"></i> -->
        <i class="vxe-icon-print" @click="handlePrint" />
      </span>
    </template>
    <div id="container" slot="default" :class="{ view: type === 3 }">
      <ele-form
        ref="ele-form"
        :form-desc="formDesc"
        :form-data="formData"
        :is-show-back-btn="isShowBackBtn"
        :is-show-cancel-btn="isShowCancelBtn"
        :visible="visible"
        v-bind="$attrs"
        @input="$emit('input', $event)"
        @cancel="handleCancel"
        v-on="$listeners"
      >
        <!-- 默认插槽 -->
        <template #default>
          <slot />
        </template>

        <!-- 作用域插槽 -->
        <template
          v-for="(formItem, field) of formDesc"
          #[field]="{ formData, props }"
        >
          <slot
            :data="formData[field]"
            :desc="formItem"
            :field="field"
            :formData="formData"
            :name="field"
            :props="props"
            :disabled="formItem._disabled"
            :type="formItem._type"
            :options="formItem._options"
          >
            <component
              :is="formItem._type"
              :ref="field"
              :disabled="formItem._disabled"
              :desc="formItem"
              :form-data="formData"
              :options="formItem._options"
              :readonly="props.readonly"
              :field="field"
              :value="getValue(field)"
              @input="setValue(field, $event)"
            />
          </slot>
        </template>

        <!-- 按钮插槽 -->
        <template #form-btn="{ btns }">
          <div class="footer__btn">
            <slot :btns="btns" name="form-btn">
              <el-button
                v-for="(btn, index) of getBtns(btns)"
                :key="index"
                v-bind="btn.attrs"
                @click="btn.click"
              >
                {{ btn.text }}
              </el-button>
            </slot>
          </div>
        </template>
      </ele-form>
    </div>

    <!-- footer插槽 -->
    <template #footer>
      <slot name="footer" />
    </template>
  </vxe-modal>
</template>

<script>
  const cloneDeep = require('clone')
  import VXETable from 'vxe-table'
  import html2canvas from 'html2canvas'
  import '@/utils/table2excel'
  import $ from 'jquery'

  export default {
    name: 'EleFormDialog',
    inheritAttrs: false,
    model: {
      prop: 'formData',
      event: 'input',
    },
    props: {
      type: {
        type: Number,
        default: 1,
      },
      // 表单数据
      formData: {
        type: Object,
        required: true,
      },
      // 弹窗是否显示
      visible: {
        type: Boolean,
        default: false,
      },
      // 弹框标题
      title: String,
      // 弹窗标题
      width: {
        type: String,
        default: '50%',
      },
      // 弹窗其它属性
      dialogAttrs: Object,
      // 是否显示返回按钮, 这里是 false
      isShowBackBtn: {
        type: Boolean,
        default: false,
      },
      // 是否显示取消按钮, 这里是 true
      isShowCancelBtn: {
        type: Boolean,
        default: true,
      },
      // 表单项
      formDesc: {
        type: Object,
        required: true,
      },
      // ... 其它属性同 vue-ele-form 组件
    },
    data() {
      return {
        initVal: {},
      }
    },
    computed: {
      getIcon() {
        const iconMap = {
          1: 'vxe-icon-square-plus',
          2: 'vxe-icon-edit',
          3: 'el-icon-view',
        }

        return iconMap[this.type]
      },
    },
    watch: {
      // 当关闭时, 清空数据
      visible(val) {
        if (!val) {
          this.$emit('input', cloneDeep(this.initVal))
        } else {
          this.$nextTick(() => {
            this.$refs['ele-form'].$refs.form.clearValidate()
            this.$nextTick(() => {
              this.initVal = cloneDeep(this.formData)
            })
          })
        }
      },
    },
    created() {},
    methods: {
      handleCancel() {
        this.$emit('cancel')
        this.$emit('closed')
      },
      handleDownLoad() {
        $('#container').table2excel({
          name: 'display',
          filename: 'vin_data',
          exclude_img: true,
          exclude_links: true,
          exclude_inputs: true,
        })
      },
      async handlePrint() {
        this.$modal.loading('请稍候...')
        const html = document.getElementById('container')
        const canvas = await html2canvas(html, {
          allowTaint: true,
          useCORS: true,
          scale: 1,
          height: html.scrollHeight,
          windowHeight: html.scrollHeight + 500,
        })
        VXETable.print({
          sheetName: `${this.title}`,
          style: `img {width: 100%;}`,
          content: `<img src="${canvas.toDataURL('image/png')}">`,
        })
        this.$modal.closeLoading()
      },
      handleClose() {
        this.$emit('closed')
      },
      handleShow() {
        this.$emit('open')
      },
      getValue(val) {
        if (this.$refs['ele-form']) {
          return this.$refs['ele-form'].getValue(val)
        }
      },
      setValue(field, $event) {
        this.$nextTick(() => {
          this.$refs['ele-form'].setValue(field, $event)
        })
      },
      getBtns(btns) {
        return btns
          .map((item) => {
            item.click.bind(this.$refs.form)
            return item
          })
          .reverse()
      },
    },
  }
</script>

<style lang="scss">
  .vxe-modal {
    &--content {
      padding: 0 !important;
      white-space: inherit !important;
    }
    &--box {
      transform: scale(1, 1);
    }
  }

  .dialog {
    overflow: hidden;
    border-radius: 5px;
    backdrop-filter: blur(3px);
    .el-col-22 {
      width: 100%;
    }
  }

  #container {
    width: 100%;
    max-height: 90vh;
    padding: 10px 15px 35px;
    overflow: scroll !important;
  }

  .footer__btn {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: end;
    padding: 7px 20px;
    background: #fff;
    border-top: 1px solid #eee;
  }
</style>

<style lang="scss" scoped>
  .corner i {
    padding-right: 10px;
    display: inline-block;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
    &:last-child {
      padding-right: 0;
    }
  }
</style>
