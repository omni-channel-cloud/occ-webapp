let RefModelInfo = {
  /**案例 start **********************************************************************************************/
  // 树参照
  refTreeVal1: {
    //参照类型
    refType: "RefTreeInput",
    title: "问题分类a", //标题，可设置
    // 参照数据参数
    refModelUrl: "/fuwu-base/problem-category-ref/",
    clientParam: "", // 查询参数，可设置
    multiple: false, //单选false,多选true,可设置
    placeholder: "请选择", //placeholder值，可设置
    displayField: "{refname}", //显示内容的键,可设置
    defaultExpandAll: true //展开所有节点 true 展开，false 不展开
  },
  // 表参照
  refTableVal1: {
    // 参照类型
    refType: "RefTableInput",
    title: "表参照-组员",
    backdrop: true,
    disabled: false,
    multiple: true, //select选项列
    // 参照数据参数
    refModelUrl: "/occ-base/person-ref/",
    // 查询参数
    clientParam: '{"EQ_isEnable":"1","EQ_dr":"0" }',
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码B", "名称B"]
    },
    //输入框默认显示placeholder值
    placeholder: "请选择"
  },
  /**案例 end **********************************************************************************************/
  //地区，省市区
  addressRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "地区",
    backdrop: true,
    disabled: false,
    multiple: false, //true多选,false单选
    // 参照数据参数
    refModelUrl: "/occ-base/administrative-division-ref/",
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  // 省
  provinceRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "地区",
    backdrop: true,
    disabled: false,
    multiple: false, //true多选,false单选\
    clientParam: '{"EQ_areaLevel":"1"}',
    // 参照数据参数
    refModelUrl: "/occ-base/administrative-division-ref/",
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  // 市
  cityRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "地区",
    backdrop: true,
    disabled: false,
    multiple: false, //true多选,false单选
    // 参照数据参数
    refModelUrl: "/occ-base/administrative-division-ref/",
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  // 区
  areaRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "地区",
    backdrop: true,
    disabled: false,
    multiple: false, //true多选,false单选
    // 参照数据参数
    refModelUrl: "/occ-base/administrative-division-ref/",
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  // 街道
  streetRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "地区",
    backdrop: true,
    disabled: false,
    multiple: false, //true多选,false单选
    // 参照数据参数
    refModelUrl: "/occ-base/administrative-division-ref/",
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  // 问题分类
  problemCategoryRef: {
    //参照类型
    refType: "RefTreeInput",
    title: "问题分类",
    // 参照数据参数
    refModelUrl: "/fuwu-base/problem-category-ref/",
    clientParam: "", // 查询参数，可设置
    multiple: false, //单选false,多选true,可设置
    placeholder: "请选择", //placeholder值，可设置
    displayField: "{refname}", //显示内容的键,可设置
    defaultExpandAll: true //展开所有节点 true 展开，false 不展开
  },
  //服务类型
  serviceTypeRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "服务类型",
    backdrop: true,
    disabled: false,
    multiple: false, //select选项列
    // 参照数据参数
    refModelUrl: "/fuwu-base/service-type-ref/",
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  //基础枚举
  archivesEnumRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "基础枚举",
    backdrop: true,
    disabled: false,
    multiple: true, //select选项列
    // 参照数据参数
    refModelUrl: "/fuwu-base/archives-enum-value-ref/",
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  // 任务项参照
  taskItemRef: {
    // 参照类型
    refType: "RefTableInput",
    title: " 任务项参照",
    backdrop: true,
    disabled: false,
    multiple: true, //select选项列
    // 参照数据参数
    refModelUrl: "/fuwu-base/task-item-ref/",
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  // 任务项参照 单选
  taskItemRefRadio: {
    // 参照类型
    refType: "RefTableInput",
    title: " 任务项参照",
    backdrop: true,
    disabled: false,
    multiple: false, //select选项列
    // 参照数据参数
    refModelUrl: "/fuwu-base/task-item-ref/",
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  //服务种类
  serviceCategoryRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "服务种类",
    backdrop: true,
    disabled: false,
    multiple: false, //select选项列
    // 参照数据参数
    refModelUrl: "/fuwu-base/service-category-ref/",
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    //输入框默认显示placeholder值
    placeholder: "请选择",
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    }
  },
  // 组织
  organization: {
    //参照类型
    refType: "RefTreeInput",
    title: "组织",
    // 参照数据参数
    refModelUrl: "/occ-base/organization-ref/",
    // 查询参数
    clientParam: '{"EQ_isEnable":"1","EQ_dr":"0" }',
    searchable: true,
    multiple: false, //多选为true
    // 默认值
    initCustomedValue: "",
    //输入框默认显示placeholder值
    placeholder: "请选择",
    defaultExpandAll: true //展开所有节点 true 展开，false 不展开
  },
  // 人员
  personRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "人员",
    backdrop: true,
    disabled: false,
    multiple: true, //select选项列
    // 参照数据参数
    refModelUrl: "/occ-base/person-ref/",
    // 查询参数
    clientParam: '{"EQ_isEnable":"1","EQ_dr":"0" }',
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    },
    //输入框默认显示placeholder值
    placeholder: "请选择"
  },
  // 人员-radio单选
  personRefRadio: {
    // 参照类型
    refType: "RefTableInput",
    title: "人员",
    backdrop: true,
    disabled: false,
    multiple: false, //select选项列
    // 参照数据参数
    refModelUrl: "/occ-base/person-ref/",
    // 查询参数
    clientParam: '{"EQ_isEnable":"1","EQ_dr":"0" }',
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    },
    //输入框默认显示placeholder值
    placeholder: "请选择"
  },
  // 客户-radio单选
  customerRefRadio: {
    // 参照类型
    refType: "RefTableInput",
    title: "客户",
    backdrop: true,
    disabled: false,
    multiple: false, //select选项列
    // 参照数据参数
    refModelUrl: "/fuwu-base/customer-ref/",
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    },
    //输入框默认显示placeholder值
    placeholder: "请选择"
  },
  // 班组-radio单选
  workerGroupRefRadio: {
    // 参照类型
    refType: "RefTableInput",
    title: "班组",
    backdrop: true,
    disabled: false,
    multiple: false, //select选项列
    // 参照数据参数
    refModelUrl: "/fuwu-base/worker-group-ref/",
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    },
    //输入框默认显示placeholder值
    placeholder: "请选择"
  },
  // 商品
  goodsRef: {
    // 参照类型
    refType: "RefTableInput",
    title: "商品",
    backdrop: true,
    disabled: false,
    multiple: false, //select选项列
    // 参照数据参数
    refModelUrl: "/occ-base/base/goods-ref/",
    // 查询参数
    clientParam: "",
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    colData: {
      strFieldCode: ["refcode", "refname", "basicUnitName", "goodsCategoryName", "specification", "model"],
      strFieldName: ["编码", "名称", "单位", "商品分类", "规格", "型号"]
    },
    //输入框默认显示placeholder值
    placeholder: "请选择"
  },
  // 行政区域-树表参照
  areaRefTreeTable: {
    title: "行政区域",
    refType: "RefTreeTableInput",
    // refType:"BaseUI"没有输入框，"WithInput"有input输入框
    multiple: true, //是否多选
    // searchable: false, //是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示
    // 表格表头
    columnsData: [
      { key: "code", dataIndex: "code", title: "编码" },
      { key: "name", dataIndex: "name", title: "名称" }
    ],
    // 请求接口
    refUrl: {
      treeUrl: "/occ-base/base/administrative-divisions/find-sub-node",
      tableUrl: "/occ-base/base/administrative-divisions/find-sub-node-page"
    },
    buttons: {
      okText: "确认", //确认按钮
      cancelText: "取消" //取消按钮
      // clearText: "清空已选" //清空已
    },
    //输入框默认显示placeholder值
    placeholder: "请选择"
    // showModal: false,//参照是否展示
  },
  // 解决方案-radio单选
  solutionRefRadio: {
    // 参照类型
    refType: "RefTableInput",
    title: "解决方案",
    backdrop: true,
    disabled: false,
    multiple: false, //select选项列
    // 参照数据参数
    refModelUrl: "/fuwu-base/solution-ref/",
    // 查询参数
    clientParam: '{"EQ_isEnable":"1","EQ_dr":"0" }',
    // multiple: false,//radio单选
    miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
    displayField: "{refname}", //显示内容的键,可设置
    colData: {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码", "名称"]
    },
    //输入框默认显示placeholder值
    placeholder: "请选择"
  },
};

export default RefModelInfo;
