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
	  
      <!-- 字典绑定 -->
      <!--<template #dict_type="{ row }">
        <dict-tag :options="dict.type.dict_type" :value="row.dict_type"/>
      </template>-->

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
  page,
  get,
  del
} from '@/api/wcs/order'
import { gridTable } from '@/mixin/grid-table'
import AddEditForm from './components/add-edit-form'

export default {
  name: 'Order',
  // 添加字典绑定
  // dicts: ['dict_type'],
  components: { AddEditForm },
  mixins: [gridTable],
  data() {
    return {
      fetch: {
        getRowData: get,
        delete: del,
        getList: page,
        id: 'id'
      },
      gridOptions: {
        columns: [
          { type: 'checkbox', title: '', width: 45 },
          // 添加字典绑定
          /**{
            field: 'dictType',
            title: '字典类型',
            slots: { default: 'dictType' }
          },*/
          {
            field: 'id',
            title: '订单ID'
          },
          {
            field: 'goodsId',
            title: '货物ID'
          },
          {
            field: 'inletId',
            title: '入库口ID'
          },
          {
            field: 'outletId',
            title: '出库口ID'
          },
          {
            field: 'number',
            title: '货物数量'
          },
          {
            field: 'createdBy',
            title: '创建人'
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
              field: 'Q_EQ_id',
              title: '主键',
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
    // 下拉框值绑定
    // this.setFormConfigSelectItemOptions('Q_EQ_status')
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

