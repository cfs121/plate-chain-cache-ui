<template>
  <ele-form-dialog
    v-model="formData"
    :type="type"
    label-position="left"
    :form-desc="formDesc"
    :rules="rules"
    :visible.sync="dialogFormVisible"
    :title="getTitle"
    width="820px"
    :is-show-submit-btn="getAddOrEdit"
    :is-show-cancel-btn="getAddOrEdit"
    :form-attrs="{ labelSuffix: ':', size: getIsView ? 'mini_mini' : '' }"
    :is-responsive="false"
    :request-fn="handleSubmit"
    @closed="handleClosed"
    @open="handleOpen"
  >
    <template #deptId="{ formData, formDesc }">
      <treeselect
        v-model="formData.deptId"
        :options="deptOptions"
        :show-count="true"
        :disabled="getIsView"
        placeholder="请选择归属部门"
      />
    </template>
  </ele-form-dialog>
</template>

<script>
import { addUser, updateUser, deptTreeSelect } from "@/api/system/user";
import { addEditForm } from "@/mixin/add-edit-form";
import Treeselect from "@riophae/vue-treeselect";

export default {
  mixins: [addEditForm],
  dicts: ["sys_user_sex", "sys_normal_disable"],
  components: {
    Treeselect,
  },
  data() {
    return {
      title: "用户",
      postOptions: [],
      roleOptions: [],
      deptOptions: [],
      formDesc: {
        nickName: {
          type: "input",
          label: "用户昵称",
          required: true,
          layout: 12,
        },
        deptId: {
          type: "input",
          label: "归属部门",
          layout: 12,
          required: true,
        },
        phoneNumber: {
          type: "input",
          label: "手机号码",
          layout: 12,
          required: true,
          attrs: {
            maxlength: 11,
          },
        },
        email: {
          type: "input",
          label: "邮箱",
          layout: 12,
          required: true,
          attrs: {
            maxlength: 50,
          },
        },
        userName: {
          type: "input",
          label: "用户名称",
          layout: 12,
          required: true,
          attrs: {
            maxlength: 50,
          },
          vif: (data) => data.userId == undefined,
        },
        password: {
          type: "input",
          label: "用户密码",
          layout: 12,
          required: true,
          attrs: {
            maxlength: 20,
            type: "password",
            showPassword: true,
          },
          vif: (data) => data.userId == undefined,
        },
        sex: {
          layout: 12,
          type: "select",
          label: "用户性别",
          required: true,
          options: () => {
            return this.dict.type.sys_user_sex.map((item) => ({
              text: item.label,
              value: Number(item.value),
            }));
          },
        },
        status: {
          layout: 12,
          type: "radio",
          label: "状态",
          required: true,
          options: () => {
            return this.dict.type.sys_normal_disable.map((item) => ({
              text: item.label,
              value: Number(item.value),
            }));
          },
        },
        postIds: {
          layout: 12,
          type: "select",
          label: "岗位",
          required: true,
          options: () => {
            return this.postOptions.map((item) => ({
              text: item.postName,
              value: Number(item.postId),
              disabled: item.status == 1,
            }));
          },
        },
        roleIds: {
          layout: 12,
          type: "select",
          label: "角色",
          required: true,
          options: () => {
            return this.roleOptions.map((item) => ({
              text: item.roleName,
              value: Number(item.roleId),
            }));
          },
        },
        remark: {
          type: "textarea",
          label: "备注",
        },
      },
      rules: {
        userName: [
          {
            min: 2,
            max: 20,
            message: "用户名称长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async handleOpen() {
      this.formData = this.options;
      this.initFormDesc();

      const { body } = await deptTreeSelect();
      this.deptOptions = body;

      if (this.getIsAdd) {
        const { body } = await this.getConfigKey("sys.user.initPassword");
        this.formData.password = body;
      }
    },
    async handleSubmit() {
      const apiMap = {
        1: addUser,
        2: updateUser,
      };
      await apiMap[this.type](this.formData);
      this.fetchSubmitResult();
    },
  },
};
</script>
