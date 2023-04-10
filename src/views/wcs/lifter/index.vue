<template>
  <div class="app-container">
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

      <template #lifter_status="{ row }">
        <dict-tag :options="dict.type.lifter_status" :value="row.lifter_status"/>
      </template>

      <template #up_down_location="{ row }">
        <dict-tag :options="dict.type.up_down_location" :value="row.up_down_location"/>
      </template>

      <template #operate="{ row }">
        <el-button
          type="text"
          icon="el-icon-edit"
          @click="handleUpdate(row)"
        >
          修改
        </el-button>
        <el-button
          type="text"
          icon="el-icon-delete"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </vxe-grid>

    <add-edit-form
      :visible.sync="addEditFormDialog.open"
      :options="addEditFormDialog.options"
      :type="addEditFormDialog.operationType"
      @success="fetchGridData"
    />

  </div>
</template>

<script>
import {
  listLifter,
  getLifter,
  delLifter
} from '@/api/wcs/lifter'
import { gridTable } from '@/mixin/grid-table'
import AddEditForm from './components/add-edit-form'

export default {
  name: 'Lifter',
  dicts: ['lifter_status', 'up_down_location'],
  components: { AddEditForm },
  mixins: [gridTable],
  data() {
    return {
      fetch: {
        getRowData: getLifter,
        delete: delLifter,
        getList: listLifter,
        id: 'id'
      },
      gridOptions: {
        columns: [
          { type: 'checkbox', title: '', width: 45 },
          {
            field: 'id',
            title: 'ID'
          },
          {
            field: 'lifterCode',
            title: '提升机编号'
          },
          {
            field: 'brand',
            title: '品牌商'
          },
          {
            field: 'lifterStatus',
            title: '提升机状态',
            slots: { default: 'lifter_status' }
          },
          {
            field: 'upDownLocation',
            title: '上下料位置',
            slots: { default: 'up_down_location' }
          },
          {
            field: 'ip',
            title: 'ip地址'
          },
          {
            field: 'port',
            title: '端口号'
          },
          {
            field: 'loadCapacity',
            title: '载重(g)'
          },
          {
            field: 'loadMaxHeight',
            title: '最大运行高度'
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
              field: 'Q_EQ_lifterCode',
              title: '提升机编号',
              itemRender: {
                name: '$input'
              }
            },
            {
              field: 'Q_EQ_brand',
              title: '品牌商',
              span: 8,
              itemRender: {
                name: '$input'
              }
            },
            {
              field: 'Q_EQ_lifterStatus',
              title: '提升机状态',
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
              status: 'primary'
            },
            {
              code: 'update',
              name: '修改',
              icon: 'vxe-icon-edit',
              status: 'success'
            },
            {
              code: 'del',
              name: '删除',
              icon: 'vxe-icon-delete',
              status: 'danger'
            }
          ],
          tools: []
        }
      }
    }
  },
  watch: {},
  async created() {
    this.setFormConfigSelectItemOptions('Q_EQ_lifterStatus', 'sys_normal_disable')
  },
  methods: {
    workFormParams(params) {
      return {
        ...params,
        Q_BT_createdTime: params.Q_BT_createdTime && params.Q_BT_createdTime.join(',')
      }
    },
    handleClickToolbarButton(e) {

    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      this.fetchGridData()
    }
  }
}
</script>
