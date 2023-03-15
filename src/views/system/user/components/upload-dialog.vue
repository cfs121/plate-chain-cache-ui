<template>
  <ele-form-dialog
    v-model="formData"
    label-position="left"
    :form-desc="formDesc"
    :visible.sync="dialogFormVisible"
    title="用户导入"
    width="400px"
    :is-show-submit-btn="getAddOrEdit"
    :is-show-cancel-btn="getAddOrEdit"
    :form-attrs="{ labelSuffix: ':', size: getIsView ? 'mini_mini' : '' }"
    :is-responsive="false"
    :request-fn="handleSubmit"
    @closed="handleClosed"
    @open="handleOpen"
  >
    <template #slot="{ formData, formDesc }">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="headers"
        :action="url + '?updateSupport=' + updateSupport"
        :disabled="isUploading"
        :on-progress="handleProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
          <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="updateSupport" />
            是否更新已经存在的用户数据
          </div>
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            @click="importTemplate"
            >下载模板
          </el-link>
        </div>
      </el-upload>
    </template>
  </ele-form-dialog>
</template>

<script>
import { addEditForm } from "@/mixin/add-edit-form";
import { getToken } from "@/utils/auth";

export default {
  mixins: [addEditForm],
  data() {
    return {
      isUploading: false,
      updateSupport: 0,
      headers: { Authorization: "Bearer " + getToken() },
      url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      formDesc: {
        slot: {
          label: "",
        },
      },
    };
  },
  methods: {
    async handleOpen() {
      this.initFormDesc();
    },
    async handleSubmit() {
      this.$refs.upload.submit();
    },
    handleProgress() {
      this.isUploading = true;
    },
    importTemplate() {
      this.download(
        "system/user/importTemplate",
        {},
        `user_template_${new Date().getTime()}.xlsx`
      );
    },
    handleFileSuccess(response) {
      this.isUploading = false;
      this.handleClosed();
      this.$refs.upload.clearFiles();
      this.$alert(
        `<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>${response.msg}</div>`,
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      this.$emit("success");
    },
  },
};
</script>
