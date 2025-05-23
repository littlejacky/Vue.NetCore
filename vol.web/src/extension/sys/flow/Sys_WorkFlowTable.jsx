import gridBody from '@/components/basic/ViewGrid/ViewGridAudit.vue';
import girdHeader from './Sys_WorkFlowTableGirdHeader'
let extension = {
  components: {
    //查询界面扩展组件
    gridHeader:girdHeader,

    gridBody: gridBody,
    gridFooter: '',
    //新建、编辑弹出框扩展组件
    modelHeader: '',
    modelBody: '',
    modelFooter: ''
  },
  tableAction: '', //指定某张表的权限(这里填写表名,默认不用填写)
  buttons: { view: [], box: [], detail: [] }, //扩展的按钮
  methods: {
    //下面这些方法可以保留也可以删除
    onInit() {
      //不显示自带的查看流程按钮
      this.showTableAudit=false;
      //表格上添加自定义按钮
      this.columns.push({
        title: '操作',
        field: '操作',
        width: 120,
        align: 'center',
        render: (h, { row, column, index }) => {
          return (
            <div>
              <el-button
                onClick={($e) => {
                  this.$refs.gridBody.open([row], true);
                }}
                type="primary"
                plain
                size="small"
                style="height:26px; padding: 10px !important;"
              >
                审核
              </el-button>
              <el-button
                onClick={($e) => {
                  this.$tabs.open({
                    text: row.WorkTableName || row.WorkName,
                    path: '/' + row.WorkTable,
                    query: { id: row.WorkTableKey, viewflow: 1 }
                  });
                }}
                type="default"
                plain
                size="small"
                style="height:26px; padding: 10px !important;"
              >
                查看
              </el-button>
            </div>
          );
        }
      });
    },
    onInited() {
      this.searchFormOptions.length=0;
      this.singleSearch = null;
      this.showCustom=false;
      const btn= this.buttons.find(x=>{return x.name=='高级查询'});
      if (btn) {
        btn.hidden=true;
      }
      //框架初始化配置后
      //如果要配置明细表,在此方法操作
      //this.detailOptions.columns.forEach(column=>{ });
      this.height=this.height-35;

      this.AuditStatus=0;
    },
    searchBefore(param) {
      // param.wheres.push({
      //   name:"AuditStatus",
      //   value:this.AuditStatus,
      //   displayType:"selectList"
      // })
      param.value=this.AuditStatus;
      //界面查询前,可以给param.wheres添加查询参数
      //返回false，则不会执行查询
      return true;
    },
    searchAfter(result) {
      //查询后，result返回的查询数据,可以在显示到表格前处理表格的值
      return true;
    },
    addBefore(formData) {
      //新建保存前formData为对象，包括明细表，可以给给表单设置值，自己输出看formData的值
      return true;
    },
    updateBefore(formData) {
      //编辑保存前formData为对象，包括明细表、删除行的Id
      return true;
    },
    rowClick({ row, column, event }) {
      //查询界面点击行事件
      // this.$refs.table.$refs.table.toggleRowSelection(row); //单击行时选中当前行;
    },
    modelOpenAfter(row) {
      //点击编辑、新建按钮弹出框后，可以在此处写逻辑，如，从后台获取数据
      //(1)判断是编辑还是新建操作： this.currentAction=='Add';
      //(2)给弹出框设置默认值
      //(3)this.editFormFields.字段='xxx';
      //如果需要给下拉框设置默认值，请遍历this.editFormOptions找到字段配置对应data属性的key值
      //看不懂就把输出看：console.log(this.editFormOptions)
    }
  }
};
export default extension;
