<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <div class="head-container">
          <el-input
            v-model="deptName"
            placeholder="请输入部门名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            :data="deptOptions"
            :props="{
              children: 'children',
              label: 'label',
            }"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            ref="tree"
            node-key="id"
            default-expand-all
            highlight-current
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <vxe-grid
          ref="xGrid"
          v-bind="gridOptions"
          :empty-render="{ name: 'NotData' }"
          @toolbar-button-click="handleToolbarButtonClick"
          @toolbar-tool-click="handleToolbarToolClick"
          @form-reset="handleFormReset"
        >
          <template #time="{ data }">
            <el-date-picker
              v-model="data.Q_BT_createdTime"
              type="datetimerange"
              style="width: 100%"
              clearable
              placeholder="请选择保存开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            />
          </template>
          <template #status="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="0"
              :inactive-value="1"
              @change="handleStatusChange(row)"
            ></el-switch>
          </template>

          <template #operate="{ row }">
            <span v-if="row.userId !== 1">
              <el-button
                v-hasPermi="['system:user:edit']"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(row)"
              >
                修改
              </el-button>
              <el-button
                v-hasPermi="['system:user:remove']"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
              <el-button
                type="text"
                icon="el-icon-view"
                @click="handleView(row)"
              >
                详情
              </el-button>
              <el-dropdown
                @command="(command) => handleCommand(command, row)"
                v-hasPermi="['system:user:resetPwd', 'system:user:edit']"
              >
                <el-button type="text" icon="el-icon-d-arrow-right">
                  更多
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    command="handleResetPwd"
                    icon="el-icon-key"
                    v-hasPermi="['system:user:resetPwd']"
                  >重置密码
                  </el-dropdown-item>
                  <el-dropdown-item
                    command="handleAuthRole"
                    icon="el-icon-circle-check"
                    v-hasPermi="['system:user:edit']"
                  >分配角色
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </template>
        </vxe-grid>
      </el-col>
    </el-row>

    <add-edit-form
      :visible.sync="addEditFormDialog.open"
      :options="addEditFormDialog.options"
      :type="addEditFormDialog.operationType"
      :post-options="postOptions"
      :roles-options="rolesOptions"
      @success="fetchGridData"
    />

    <upload-dialog
      :visible.sync="uploadDialog.open"
      @success="fetchGridData"
    />
  </div>
</template>

<script>
import {
  listUser,
  getUser,
  delUser,
  resetUserPwd,
  changeUserStatus,
  deptTreeSelect, getUserInfo
} from '@/api/system/user'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { gridTable } from '@/mixin/grid-table'
import AddEditForm from './components/add-edit-form'
import UploadDialog from './components/upload-dialog'
import { changeRoleStatus } from '@/api/system/role'

export default {
  name: 'User',
  dicts: ['sys_normal_disable'],
  components: { AddEditForm, UploadDialog },
  mixins: [gridTable],
  data() {
    return {
      deptId: '',
      deptOptions: [],
      rolesOptions: [],
      deptName: null,
      uploadDialog: {
        open: false
      },
      postOptions: [],
      fetch: {
        getRowData: getUser,
        delete: delUser,
        getList: listUser,
        id: 'id'
      },
      gridOptions: {
        columns: [
          { type: 'checkbox', title: '', width: 45 },
          {
            field: 'id',
            title: '用户编号'
          },
          {
            field: 'userName',
            title: '用户名称'
          },
          {
            field: 'nickName',
            title: '用户昵称'
          },
          {
            field: 'deptName',
            title: '部门'
          },
          {
            field: 'phoneNumber',
            title: '手机号码'
          },
          {
            field: 'status',
            title: '状态',
            slots: { default: 'status' }
          },
          {
            field: 'createdTime',
            title: '创建时间'
          },
          {
            title: '操作',
            minWidth: 290,
            slots: { default: 'operate' },
            fixed: 'right'
          }
        ],
        formConfig: {
          titleWidth: 100,
          titleAlign: 'right',
          items: [
            {
              field: 'Q_EQ_userName',
              title: '用户名称',
              itemRender: {
                name: '$input'
              }
            },
            {
              field: 'Q_EQ_phoneNumber',
              title: '手机号码',
              itemRender: {
                name: '$input'
              }
            },
            {
              field: 'Q_EQ_status',
              title: '状态',
              itemRender: {
                name: '$select',
                options: []
              }
            },
            {
              field: 'from_time',
              title: '创建时间',
              folding: true,
              slots: { default: 'time' },
              resetValue: []
            }
          ]
        },
        toolbarConfig: {
          buttons: [
            {
              code: 'add',
              name: '新增',
              icon: 'vxe-icon-add',
              status: 'primary',
              permi: ['system:user:add']
            },
            {
              code: 'update',
              name: '修改',
              icon: 'vxe-icon-edit',
              status: 'success',
              permi: ['system:user:edit']
            },
            {
              code: 'del',
              name: '删除',
              icon: 'vxe-icon-delete',
              status: 'danger',
              permi: ['system:user:remove']
            },
            {
              code: 'imp',
              name: '导入',
              icon: 'vxe-icon-upload',
              status: 'info',
              permi: ['system:user:import']
            }
          ],
          tools: [
            {
              code: 'download',
              circle: true,
              icon: 'vxe-icon-download',
              url: 'system/user/export',
              permi: ['system:user:export']
            }
          ]
        }
      }
    }
  },
  watch: {
    deptName(val) {
      this.$refs.tree.filter(val)
    }
  },
  async created() {
    const res = await deptTreeSelect()
    this.deptOptions = res.body
    this.setFormConfigSelectItemOptions('Q_EQ_status', 'sys_normal_disable')
  },
  methods: {
    async handleAdd(type = 1) {
      this.addEditFormDialog.options = {}
      const { body: { posts, roles } } = await getUserInfo()
      this.postOptions = posts.map((item) => ({
        text: item.postName,
        value: item.id,
        disabled: item.status === '1'
      }))
      this.rolesOptions = roles
        .map((item) => ({
          text: item.roleName,
          value: item.id,
          disabled: item.status === '1'
        }))
      this.addEditFormDialog.operationType = type
      this.addEditFormDialog.open = true
      this.addEditFormDialog.view = false
    },
    async handleUpdate(row, type = 2) {
      const { body } = await this.fetch.getRowData(row[this.fetch.id])
      this.addEditFormDialog.options = body

      if (type === 3) {
        this.addEditFormDialog.options.viewFormDesc = this.getViewFormDesc()

      }

      const {
        body: {
          posts, postIds, roleIds, roles
        }
      } = await getUserInfo(body.id)
      this.addEditFormDialog.options.postIds = postIds
      this.addEditFormDialog.options.roleIds = roleIds
      this.postOptions = posts.map((item) => ({
        text: item.postName,
        value: item.id,
        disabled: item.status === '1'
      }))
      this.rolesOptions = roles
        .map((item) => ({
          text: item.roleName,
          value: item.id,
          disabled: item.status === '1'
        }))
      this.addEditFormDialog.operationType = type
      this.addEditFormDialog.open = true
    },

    workFormParams(params) {
      return {
        ...params,
        Q_EQ_deptId: this.deptId,
        Q_BT_createdTime: params.Q_BT_createdTime && params.Q_BT_createdTime.join(',')
      }
    },
    handleClickToolbarButton(e) {
      if (e.code === 'imp') {
        this.uploadDialog.open = true
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      this.deptId = data.id
      this.fetchGridData()
    },
    async handleStatusChange(row) {
      let text = row.status === 0 ? '启用' : '停用'
      const { id, status } = row
      this.$modal.confirm(`确认要${text}${row.userName}用户吗？`).then(function() {
        return changeUserStatus({ id, status })
      }).then(() => {
        this.$modal.msgSuccess(text + '成功')
      }).catch(function() {
        row.status = row.status ^ 1
      })
    },
    handleCommand(command, row) {
      switch (command) {
        case 'handleResetPwd':
          this.handleResetPwd(row)
          break
        case 'handleAuthRole':
          this.handleAuthRole(row)
          break
        default:
          break
      }
    },
    async handleResetPwd(row) {
      await this.$prompt(
        `请输入${row.userName}的新密码`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          inputPattern: /^.{5,20}$/,
          inputErrorMessage: '用户密码长度必须介于 5 和 20 之间'
        }
      ).then(({ value }) => {
        resetUserPwd(row.id, value)
        this.$modal.msgSuccess(`修改成功，新密码是：${value}`)
      }).catch(() => {
        this.$modal.msgWarning('已取消修改')
      })
    },
    handleAuthRole(row) {
      this.$router.push(`/system/user-auth/role/${row.id}`)
    }
  }
}
</script>
