import { mapState } from "vuex";
import { checkPermi } from "@/utils/permission";
import gridOptions from "@/utils/grid-options";
import { camel2snake } from "@/utils/camel-case";
import { isFunction } from "@/utils/validate";
import { cloneDeep } from "lodash";

const searchButton = {
  span: 24,
  align: "center",
  collapseNode: true,
  itemRender: {
    name: "$buttons",
    children: [
      {
        props: {
          type: "submit",
          content: "app.body.label.search",
          status: "primary",
          icon: "vxe-icon-search",
        },
      },
      {
        props: {
          type: "reset",
          content: "app.body.label.reset",
          icon: "vxe-icon-refresh",
        },
      },
    ],
  },
};

export const gridTable = {
  data() {
    return {
      gridTableData: [],
      exportTotal: 0,
      gridOptions,
      addEditFormDialog: {
        open: false,
        options: {},
        operationType: 1,
      },
    };
  },
  computed: {
    ...mapState([]),
  },
  created() {
    this.initGrid();
  },
  methods: {
    initGrid() {
      this.checkToolbarConfigPermi();
      if (this.gridOptions.proxyConfig.autoLoad !== false) {
        this.gridOptions.proxyConfig.ajax = {
          query: async ({ page, form }) => {

            const params = isFunction(this.workFormParams)
              ? this.workFormParams({
                ...form,
                ...page,
              })
              : form;
            const res = await this.fetch.getList({
              ...params,
              pageNum: page.currentPage,
              pageSize: page.pageSize,
            });

            this.exportTotal = res.body.total;
            this.gridTableData = res.body.content;

            return res.body;
          },
        };
      } else {
        delete this.gridOptions.proxyConfig;
      }

      let items = this.gridOptions?.formConfig?.items;
      if (items.length) {
        const searchBtn = cloneDeep(searchButton);
        if (items.length < 3) {
          searchBtn.span = 8;
          searchBtn.align = "left";
        }

        if (items.length <= 4) {
          searchBtn.collapseNode = false;
        }

        items.map((item, index) => {
          const { name, props } = item.itemRender || {};
          item.folding = index > (items.length <= 3 ? 2 : 3);
          item.span = items.length <= 3 ? 8 : 6;
          switch (name) {
            case "$select":
            case "$input":
              item.itemRender.props = {
                placeholder: `请${name === "$input" ? "输入" : "选择"}${item.title
                  }`,
                clearable:
                  "clearable" in item.itemRender
                    ? item.itemRender.clearable
                    : true,
                ...props,
              };
          }
        });

        this.gridOptions.formConfig.items.push(searchBtn);
      }

      if (!this.gridOptions.noSortable) {
        this.gridOptions.columns = this.gridOptions.columns.map((item) => {
          if (!("sortable" in item)) {
            item.sortable = !["操作", "备注"].includes(item.title);
          }
          return item;
        });
      }
    },
    handleFormReset({ data }) {
      const values = Object.values(data).filter((item) => !!item);
      if (!values.length) {
        return;
      }
      for (const key in data) {
        data[key] = null;
      }
      this.fetchGiridData();
    },
    setFormConfigSelectItemOptions(name, dictName = null) {
      const index = this.gridOptions.formConfig.items.findIndex(
        (item) => item.field === name
      );
      this.gridOptions.formConfig.items[index].itemRender.options =
        this.dict.type[dictName ? dictName : camel2snake(name)];
    },
    setFormConfigSelectItemValue(name, value) {
      const index = this.gridOptions.formConfig.items.findIndex(
        (item) => item.field === name
      );
      this.gridOptions.formConfig.items[index].itemRender.options = value;
    },
    checkToolbarConfigPermi() {
      let { buttons, tools } = this.gridOptions.toolbarConfig;
      const CheckPermi = (arr) =>
        (arr || []).map((item) => {
          if (item.permi) {
            item.visible = checkPermi(item.permi);
          }
          return item;
        });
      // 校验左侧增删改查是否有操作权限
      buttons && (buttons = CheckPermi(buttons));
      // 校验右侧配置的按钮是否有操作权限
      tools && (buttons = CheckPermi(tools));
    },
    async handleToolbarButtonClick({ code, $grid }) {
      const rows = $grid.getCheckboxRecords();
      switch (code) {
        case "add":
          this.handleAdd();
          break;
        case "update":
          if (!rows.length) {
            this.$message({
              message: "请选择要修改的数据",
              type: "warning",
            });
            return;
          }

          if (rows.length > 1) {
            this.$message({
              message: "只能选择一条进行修改",
              type: "warning",
            });
            return;
          }
          this.handleUpdate(rows[0]);
          break;
        case "del":
          if (!rows.length) {
            this.$message({
              message: "请选择要删除的数据",
              type: "warning",
            });
            return;
          }
          await this.$modal.confirm(
            `是否确认删除${rows.length > 1 ? "所选" : "改行"}数据？`
          );
          this.handleDelete($grid.getCheckboxRecords());
          break;
        default:
          this.handleClickToolbarButton &&
            this.handleClickToolbarButton({ code, $grid });
      }
    },
    async handleToolbarToolClick({ tool, code, $grid }) {
      switch (code) {
        case "download":
          const { form, pager } = $grid.getProxyInfo();
          this.handleExport(
            {
              ...form,
              pageNum: pager.currentPage,
              pageSize: this.exportTotal || pager.pageSize,
            },
            tool
          );
          break;
        default:
          this.handleClickToolbarTool &&
            this.handleClickToolbarTool({ code, $grid });
      }
    },
    fetchGiridData() {
      this.$refs.xGrid.commitProxy("query");
    },
    handleAdd() {
      this.addEditFormDialog.operationType = 1;
      this.addEditFormDialog.options = {};
      this.addEditFormDialog.open = true;
      this.addEditFormDialog.view = false;
    },
    getViewFormDesc() {
      return this.gridOptions.columns
        .filter((item) => !["", "操作"].includes(item.title))
        .reduce((pre, curr) => {
          const { slots, ...rest } = curr;
          pre[curr.field] = {
            ...rest,
            type: curr.type || "text",
            label: curr.title,
            layout: 12,
          };

          if (
            curr.slots &&
            !curr.slots.default.toUpperCase().includes("TIME") &&
            Array.isArray(this.dict.type[curr.slots.default])
          ) {
            pre[curr.field].options = this.dict.type[curr.slots.default].map(
              (item) => ({
                text: item.label,
                value: Number(item.value),
              })
            );
          }
          return pre;
        }, {});
    },
    async handleUpdate(row, type = 2) {
      const { body } = await this.fetch.getRowData(row[this.fetch.id]);
      this.addEditFormDialog.options = body;
      if (type === 3) {
        this.addEditFormDialog.options.viewFormDesc = this.getViewFormDesc();
      }
      this.addEditFormDialog.operationType = type;
      this.addEditFormDialog.open = true;
    },
    async handleView(row) {
      this.handleUpdate(row, 3);
    },
    async handleDelete(row) {
      const ids = Array.isArray(row)
        ? row.map((item) => item[this.fetch.id])
        : row[this.fetch.id];
      await this.fetch.delete(ids);
      this.$refs.xGrid.remove(row);
      this.$modal.msgSuccess("删除成功");
    },
    // 获取字典的键值对
    getStatusMap(type) {
      return this.dict.type[type].reduce((prev, next) => {
        prev[next.value] = next.label;
        return prev;
      }, {});
    },
    handleExport(params, tool) {
      this.download(
        tool.url,
        params,
        `${tool.url.split("/")[1]}_${new Date().getTime()}.xlsx`
      );
    },
  },
};
