import React, { Component } from "react";
import mirror, { connect, actions } from "mirrorx";
import { FormControl, Select, Button, Form, Radio } from "tinper-bee";
import { deepClone } from "utils";
// 参照
import { RefTreeWithInput, RefTreeBaseUI } from "ref-tree";
// import "ref-tree/lib/index.css";
import RefTreeTableBaseUI, { RefTreeTableWithInput } from "ref-tree-table";
import "ref-tree-table/lib/index.css";
import { SearchPanelItem, RefMultipleTableWithInput } from "ref-multiple-table";
import "ref-multiple-table/lib/index.css";
import refModelInfo from "./refinfo";
// 数据模型引入
import model from "./model";
mirror.model(model);
import "./index.less";
import { join } from "upath";

// 参照数据莫模型
let refModelDataObj = {
  refVal: {}
};
let refModelData = {};
let refModelType = "";
const refTypeName = {
  RefTreeInput: "RefTreeInput",
  RefTableInput: "RefTableInput"
};
// 默认选择数据
let refMatchDatas = {};
// 树--默认属性
let refTreeValData = {
  checkStrictly: true,
  disabled: false,
  // 树列表显示字段
  // nodeDisplay: record => {
  //   return record.refname;
  // },
  // displayField: record => {
  //   return record.refname;
  // },
  valueField: "refpk", //真是的value值
  filterData: [], //快捷查询数据
  lazyModal: false,
  strictMode: true,
  lang: "zh_CN",
  emptyBut: true,
  showLoading: true,
  treeData: []
  // matchData: [] //默认选中数据，匹配
};
// 表--默认属性
let refTableValData = {
  backdrop: true,
  disabled: false,
  emptyBut: true, //是否显示清空按钮
  strictMode: true,
  miniSearch: true, //查询栏为false自定义条件,为true是mini简单查询
  valueField: "refpk",
  filterData: [{ refpk: "", refname: "" }], //快速查询数据
  columnsData: [],
  //列表数据
  tableData: [],
  // matchData: [], //默认选中数据，匹配
  //快捷查询select数据
  //launchTableHeader重构表头
  /* 自定义条件--搜索自定义*/
  fliterFormInputs: [],
  pageCount: 5, //共多少页
  pageSize: 10,
  currPageIndex: 1, //当前显示页
  showLoading: false //请求中状态true,请求完成为false
};
// 树表--默认属性
let refTreeTableValData = {
  displayField: "{refname}",
  valueField: "refpk", //选中字段key唯一值
  filterData: [{ refpk: "", refname: "" }] //快捷查询select数据
};
//  树表--请求参数
let refTreeTableParams = {
  refTable: {
    pageParams: {
      parentId: "",
      includeSelf: 0,
      recursive: 0,
      size: 10,
      page: 0
    },
    refUrl: {
      treeUrl: "",
      tableUrl: ""
    }
  },
  refTree: {
    pageParams: {
      parentId: "",
      includeSelf: 0,
      recursive: 0
    },
    refUrl: {
      treeUrl: "",
      tableUrl: ""
    }
  }
};
let addTreeStatus = false;
// 树型参照数据处理
const treeDataFc = data => {
  let datalist = data;
  let refData = [];
  let levelData = [];

  datalist.map(value => {
    let objRow = value;
    let pid = value.pid;
    objRow["key"] = value.refpk;
    if (!pid) {
      objRow["children"] = [];
      objRow["areaLevel"] = "1";
      refData.push(objRow);
    } else {
      objRow["findParent"] = true;
      objRow["isLeaf"] = true;
      levelData.push(objRow);
    }
  });
  if (refData.length) {
    // 二级数据处理
    refData.map(value => {
      let id = value.id;
      for (var i = 0; i < levelData.length; i++) {
        let levelDataRow = levelData[i];
        if (levelDataRow["findParent"]) {
          if (id == levelDataRow.pid) {
            levelDataRow["isLeaf"] = true; //没有下级为true
            levelDataRow["areaLevel"] = "2";
            levelDataRow["findParent"] = false;
            levelDataRow["children"] = [];
            value.children["isLeaf"] = false;
            value.children.push(levelDataRow);
          } else {
            // levelDataRow["findParent"] = true;
          }
        }
      }
    });
    // 三级级数据处理
    refData.map(value => {
      let refDataLevel2 = value["children"];
      if (refDataLevel2.length) {
        // 2级循环
        for (var a = 0; a < refDataLevel2.length; a++) {
          let refDataLevel2Row = refDataLevel2[a];
          // 3级循环
          for (var i = 0; i < levelData.length; i++) {
            var levelDataRow = levelData[i];
            if (levelDataRow["findParent"]) {
              if (refDataLevel2Row.id == levelDataRow.pid) {
                levelDataRow["isLeaf"] = true; //没有下级为true
                levelDataRow["areaLevel"] = "3";
                levelDataRow["findParent"] = false;
                levelDataRow["children"] = [];
                refDataLevel2Row["isLeaf"] = false;
                refDataLevel2Row.children.push(levelDataRow);
              } else {
                // levelDataRow["areaLevel"] = "4";
              }
            }
          }
        }
      }
    });
    // 四级级数据处理
    refData.map(value => {
      let refDataLevel2 = value["children"];
      if (refDataLevel2.length) {
        // 2级循环
        for (var c = 0; c < refDataLevel2.length; c++) {
          let refDataLevel3 = refDataLevel2[c].children;
          if (refDataLevel3.length) {
            // 3级循环
            for (var a = 0; a < refDataLevel3.length; a++) {
              let refDataLevel3Row = refDataLevel3[a];
              // 4级循环
              for (var i = 0; i < levelData.length; i++) {
                var levelDataRow = levelData[i];
                if (levelDataRow["findParent"]) {
                  if (refDataLevel3Row.id == levelDataRow.pid) {
                    levelDataRow["isLeaf"] = true; //没有下级为true
                    levelDataRow["areaLevel"] = "4";
                    levelDataRow["findParent"] = false;
                    levelDataRow["children"] = [];
                    refDataLevel3Row["isLeaf"] = false;
                    refDataLevel3Row.children.push(levelDataRow);
                  } else {
                    // levelDataRow["areaLevel"] = "5";
                  }
                }
              }
            }
          }
        }
      }
    });
  } else {
    //查询
    refData = datalist;
  }
  return refData;
};
// 默认值--选中功能
const initialValueFun = data => {
  let matchData = [];
  let objData = JSON.parse(data);
  if (objData["refpk"]) {
    let refpk = objData["refpk"].split(",");
    let refname = objData["refname"].split(",");
    let refcode = [];
    if (objData["refcode"]) {
      refcode = objData["refcode"].split(",");
    }
    for (let i = 0; i < refpk.length; i++) {
      let refObj = {
        refpk: refpk[i],
        refname: refname[i],
        id: refpk[i]
      };
      if (refcode) {
        refObj["refcode"] = refcode[i];
      }
      matchData.push(refObj);
    }
  }

  return matchData;
};
// 树表默认--选中功能
const treetableInitialValueFun = data => {
  let matchData = [];
  let objData = JSON.parse(data);
  if (objData["refpk"]) {
    let refpk = objData["refpk"].split(",");
    let refname = objData["refname"].split(",");
    for (let i = 0; i < refpk.length; i++) {
      let refObj = {
        refpk: refpk[i],
        refname: refname[i],
        id: refpk[i],
        code: refpk[i],
        name: refname[i],
        fullName: refname[i]
      };
      matchData.push(refObj);
    }
  }

  return matchData;
};
// 参照-------------------- end

class RefComponent extends Component {
  // 参照方法------------start
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      condition: "",
      num: 0
    };
  }
  // 触发渲染
  randomFun = param => {
    this.setState({ rand: Math.random() });
  };

  // 监听数据
  componentWillReceiveProps(next) {
    // console.log(next);
    // 参照---数据获取--
    const { RefTreeInput, RefTableInput } = refTypeName;
    if (next.list && next.list.length) {
      //树-参照赋值
      if (refModelType == RefTreeInput) {
        // console.log(refModelType, "树");
        let refData = treeDataFc(next.list);
        // 参照数据
        refTreeValData.treeData = refData;
        // 翻页数据
        refTreeValData.showLoading = false;
      }
      //表-参照赋值
      if (refModelType == RefTableInput) {
        // console.log(refModelType, "表");
        let datalist = next.list;
        let refData = [];
        datalist.map((value, index) => {
          let objRow = value;
          objRow["key"] = value.refpk;
          refData.push(objRow);
        });
        refTableValData.tableData = refData;
        // 翻页数据
        refTableValData.pageCount = next.refRenderParam.pageCount; //共多少页
        refTableValData.currPageIndex = next.refRenderParam.currPageIndex + 1; //当前显示页
        refTableValData.pageSize = next.refRenderParam.pageSize;
        refTableValData.showLoading = false;
      }
    }

    // 参照ref-快捷查询
    if (next.refSelect && next.refSelect.length) {
      //树-参照赋值
      if (refModelType == RefTreeInput) {
        let datalist = next.refSelect;
        let refData = [];
        datalist.map((value, index) => {
          let objRow = value;
          objRow["key"] = value.refpk;
          refData.push(objRow);
        });
        // 参照数据
        refTreeValData.filterData = datalist;
      }
      // 表-参照赋值
      if (refModelType == RefTableInput) {
        // console.log("refModelType", 333);
        let datalist = next.refSelect;
        let refData = [];
        datalist.map((value, index) => {
          let objRow = value;
          objRow["key"] = value.refpk;
          refData.push(objRow);
        });
        // 参照数据
        refTableValData.filterData = refData;
      }
    }

    /********************************************** */
    // 参照---table
    if (next.refTableList && next.refTableList.length) {
      let datalist = next.refTableList;
      let refData = [];
      datalist.map((value, indnx) => {
        let objRow = value;
        objRow["key"] = value.id;
        objRow["refpk"] = value.id;
        objRow["refname"] = value.name;
        objRow["rownum_"] = indnx;
        refData.push(objRow);
      });
      // // 参照数据
      this.treetableTableData = refData;
      this.treetablePage = {
        pageCount: next.totalPages, //总页数
        pageSize: next.pageSize, //每页数据数
        totalElements: next.total,
        currPageIndex: next.pageIndex //当前页
      };
    }
    // 参照---tree
    if (next.refTreeList && next.refTreeList.length) {
      let datalist = next.refTreeList;
      // // 参照数据
      this.treetableDataFc(datalist, addTreeStatus);
    }
  }
  componentDidMount() {
    // this方法输出--start
    const { clearMatchData } = this.props;
    if (clearMatchData) {
      clearMatchData(this);
    }
    // this方法输出--end
    /**树表--数据--start ***************/
    this.treetableTreeData = [
      // {
      //   code: "org1",
      //   children: [
      //     {
      //       code: "bj",
      //       entityType: "mainEntity",
      //       name: "北京总部-简",
      //       pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
      //       refcode: "bj",
      //       refpk: "5305416e-e7b4-4051-90bd-12d12942295b",
      //       id: "5305416e-e7b4-4051-90bd-12d12942295b",
      //       isLeaf: "true",
      //       refname: "北京总部-简"
      //     },
    ];
    this.treetableTableData = [
      // {
      //   rownum_: 1,
      //   code: "00122222222",
      //   name: "人员12222222",
      //   mobile: "15011430230",
      //   refcode: "001",
      //   refpk: "cc791b77-bd18-49ab-b3ec-ee83cd40012a",
      //   id: "cc791b77-bd18-49ab-b3ec-ee83cd40012a",
      //   refname: "人员1",
      //   email: "11@11.com",
      //   key: "cc791b77-bd18-49ab-b3ec-ee83cd40012a"
      // }
    ];
    this.treetablePage = {
      pageCount: "", //总页数
      pageSize: "", //每页数据数
      totalElements: "",
      currPageIndex: 0
    };
    /**树表--数据--ene ***************/
  }
  // --查询参数
  queryRefParam = {
    content: null,
    isNotLeafParam: "",
    pk_val: "",
    filterPks: "",
    refModelUrl: "",
    pk_org: "",
    transmitParam: "",
    refName: "",
    refCode: "",
    refModelClassName: "",
    refModelHandlerClass: "",
    // cfgParam: {"ctx":"/uitemplate_web"},
    // 查询参数
    clientParam: "",
    // clientParam: { EQ_isEnable: "1" },
    "refClientPageInfo.pageSize": "-1",
    "refClientPageInfo.currPageIndex": 0
  };

  // 清除默认选项
  clearMatchData = param => {
    if (param) {
      refMatchDatas = {};
      this.setState({ rand: Math.random() });
    }
  };

  //tree树参照--start---------------------------------------------------
  //保存参照
  reftreeOnSave = (refName, fieldName, item) => {
    // console.log("save", fieldName, item);
    if (this.props.refTreeOnClickSave) {
      this.props.refTreeOnClickSave(refName, fieldName, item);
      // console.log(refTableOnClickSave);
    } else {
      // console.log("refTableOnClickSave没有");
    }
    // 选中默认值
    // refTreeValData["matchData"] = item;
    let objName = refName + fieldName;
    // 选中默认值
    refMatchDatas[objName] = item;
    // 清空数据
    // refTreeValData.treeData = [];
    // this.randomFun(true);
  };
  //取消参照
  reftreeOnCancel = () => {
    // 清空数据
    // refTreeValData.treeData = [];
    // this.randomFun(true);
    // console.log("onCancel");
  };
  // 参照复杂搜索点击事件
  reftreeSearchFilterInfo = value => {
    console.log("复杂搜索", value);
  };
  // 简单查询方法  miniSearchFunc 参照查询回调函数
  reftreeMiniSearchFunc = value => {
    refModelType = refTypeName.RefTreeInput;
    let queryParam = Object.assign({}, this.queryRefParam, {
      content: encodeURI(value)
    });
    let temp = { pageParams: queryParam };
    actions.refComponent.getRefList(temp);
  };
  // 参照输入框----onClick事件
  reftreeCanClickGoOn = (refName, fieldName, data) => {
    // 禁止使用
    let propsDisable = this.props.disable;
    if (propsDisable == "disable") {
      return false;
    }
    //
    let objName = refName + fieldName;
    let matchList = refMatchDatas[objName];
    let initialValue = this.props.initialValue;
    if (initialValue && matchList) {
      // console.log(matchList, "ttt");
    } else if (initialValue) {
      let matchInitData = initialValueFun(initialValue);
      // 选中默认值
      refMatchDatas[objName] = matchInitData;
      // console.log(matchInitData, "aaa");
    } else {
      // console.log(matchList, "kkk");
    }
    // 回调函数refTreeOnClick
    if (this.props.refTreeOnClick) {
      this.props.refTreeOnClick();
      // console.log(onclickfun);
    } else {
      // console.log("refTreeOnClick没有");
    }

    //清空参照数据
    refTreeValData.treeData = [];
    //
    refModelType = refTypeName.RefTreeInput;
    // let clientParam = this.props.clientParam;
    let queryParam = Object.assign({}, this.queryRefParam, {
      // clientParam: clientParam
    });
    let temp = { pageParams: queryParam };
    actions.refComponent.getRefList(temp);
    return true;
  };
  // 参照--输入框值监测
  reftreeOnRefChange = value => {
    // console.log(value, "输入框值监测");
  };
  // 参照--输入框检测--快捷查询
  reftreeFilterUrlFunc = value => {
    refModelType = refTypeName.RefTreeInput;
    let queryParam = Object.assign({}, this.queryRefParam, {
      content: encodeURI(value)
    });
    let temp = { pageParams: queryParam };
    actions.refComponent.getRefSelect(temp);
  };
  // 参照查询回调函数---数据查询方法
  getRefTreeData = value => {
    refModelType = refTypeName.RefTreeInput;
    console.log("数据查询方法:", value);
    let queryParam = Object.assign({}, this.queryRefParam, {
      content: encodeURI(value)
    });
    let temp = { pageParams: queryParam };
    actions.refComponent.getRefList(temp);
    return refTreeValData.treeData;
  };
  //tree树参照--end---------------------------------------------------
  /***************************************************************************************** */
  //table表参照--start---------------------------------------------------
  //保存参照
  reftableOnSave = (refName, fieldName, item) => {
    // console.log("save", refName, fieldName, item);
    // refTableOnClickSave
    if (this.props.refTableOnClickSave) {
      this.props.refTableOnClickSave(refName, fieldName, item);
      // console.log(refTableOnClickSave);
    } else {
      // console.log("refTableOnClickSave没有");
    }
    let objName = refName + fieldName;
    // 选中默认值
    refMatchDatas[objName] = item;
    // 清空数据
    // refTableValData.tableData = [];
    // this.randomFun(true);
  };

  //取消参照
  reftableOnCancel = () => {
    // 清空数据
    // refTableValData.tableData = [];
    // this.randomFun(true);
    // console.log("onCancel");
  };
  // 参照复杂搜索点击事件
  reftableSearchFilterInfo = value => {
    console.log("复杂搜索", value);
  };
  // 简单查询方法  miniSearchFunc 参照查询回调函数
  reftableMiniSearchFunc = value => {
    let queryParam = Object.assign({}, this.queryRefParam, {
      content: encodeURI(value),
      "refClientPageInfo.pageSize": "10",
      "refClientPageInfo.currPageIndex": "0"
    });
    let temp = { pageParams: queryParam };
    actions.refComponent.getRefList(temp);
  };
  // 自定义查询和列表-ref表头
  reftableLaunchTableHeader = () => {
    let data = refModelData.colData || {
      strFieldCode: ["refcode", "refname"],
      strFieldName: ["编码A", "名称A"]
    };
    let { multiple } = refModelData;
    let keyList = data.strFieldCode || [];
    let titleList = data.strFieldName || [];
    refTableValData["fliterFormInputs"] = [];
    let colunmsList = keyList.map((item, index) => {
      refTableValData["fliterFormInputs"].push(
        // miniSearch查询栏为false自定义条件--搜索自定义
        <SearchPanelItem key={item} name={item} text={titleList[index]}>
          <FormControl />
        </SearchPanelItem>
      );
      return {
        key: item,
        dataIndex: item,
        title: titleList[index]
      };
    });
    if (colunmsList.length === 0) {
      colunmsList = [
        { title: "未传递表头数据", dataIndex: "nodata", key: "nodata" }
      ];
    }
    if (!multiple) {
      // multiple为false单选按钮
      //单选时用对号符号标记当前行选中
      colunmsList.unshift({
        title: " ",
        dataIndex: "a",
        key: "a",
        width: 45,
        render(text, record, index) {
          let valueField = record["refpk"];
          // <div
          //   className={`ref-multiple-table-radio ${
          //     record._checked ? "ref-multiple-table-radio-on" : ""
          //   }`}
          // />
          return (
            <Radio.RadioGroup
              name={valueField}
              selectedValue={record._checked ? valueField : null}
            >
              <Radio value={valueField} />
            </Radio.RadioGroup>
          );
        }
      });
    }
    refTableValData["columnsData"] = colunmsList;
  };
  // 参照输入框----onClick事件
  reftableCanClickGoOn = (refName, fieldName, data) => {
    // 禁止使用
    let propsDisable = this.props.disable;
    if (propsDisable == "disable") {
      return false;
    }
    //
    let objName = refName + fieldName;
    let matchList = refMatchDatas[objName];
    let initialValue = this.props.initialValue;
    if (initialValue && matchList) {
      // console.log(matchList, "ttt");
    } else if (initialValue) {
      let matchInitData = initialValueFun(initialValue);
      // 选中默认值
      refMatchDatas[objName] = matchInitData;
      this.setState({ rand: Math.random() });
      // console.log(matchInitData, "aaa");
    } else {
      // console.log(matchList, "kkk");
    }
    // 回调函数refTableOnClick
    if (this.props.refTableOnClick) {
      this.props.refTableOnClick();
      // console.log(onclickfun);
    } else {
      // console.log("refTableOnClick没有");
    }
    //清空参照数据
    refTableValData.tableData = [];
    refTableValData.pageCount = 0; //共多少页
    refTableValData.currPageIndex = 1; //当前显示页
    refTableValData.pageSize = 10;
    //
    refModelType = refTypeName.RefTableInput;
    let queryParam = Object.assign({}, this.queryRefParam, {
      "refClientPageInfo.pageSize": "10",
      "refClientPageInfo.currPageIndex": "0"
    });
    let temp = { pageParams: queryParam };
    actions.refComponent.getRefList(temp);

    return true;
  };
  // 参照--输入框值监测
  reftableOnRefChange = value => {
    // console.log(value, "输入框值监测");
  };
  // 参照--输入框检测--快捷查询
  reftableFilterUrlFunc = value => {
    refModelType = refTypeName.RefTableInput;
    // 参照数据初始值
    refTableValData.filterData = [];
    this.setState({ rand: Math.random() });
    let queryParam = Object.assign({}, this.queryRefParam, {
      content: encodeURI(value),
      "refClientPageInfo.pageSize": 10,
      "refClientPageInfo.currPageIndex": 0
    });
    let temp = { pageParams: queryParam };
    actions.refComponent.getRefSelect(temp);
  };
  //参照输入框
  reftableCanInputGoOn = () => {
    // return  true可以输入，false不可输入
    return true; // 点击是否可以输入
  };
  /** start:分页 */
  /**
   * 跳转到制定页数的操作
   * @param {number} index 跳转页数
   */
  reftableHandlePagination = index => {
    refModelType = refTypeName.RefTableInput;
    let queryParam = Object.assign({}, this.queryRefParam, {
      "refClientPageInfo.pageSize": refTableValData.pageSize,
      "refClientPageInfo.currPageIndex": index - 1
    });
    let temp = { pageParams: queryParam };
    actions.refComponent.getRefList(temp);
    // 回车跳页
  };
  /**
   * 选择每页数据个数
   */
  reftableDataNumSelect = (index, pageSize) => {
    refModelType = refTypeName.RefTableInput;
    let queryParam = Object.assign({}, this.queryRefParam, {
      "refClientPageInfo.pageSize": pageSize,
      "refClientPageInfo.currPageIndex": 0
    });
    let temp = { pageParams: queryParam };
    refTableValData.pageSize = pageSize;
    actions.refComponent.getRefList(temp);
  };
  //table表参照--end---------------------------------------------------
  /***************************************************************************************** */
  //treetable树表参照--start---------------------------------------------------

  // 树型参照数据处理
  treetableDataFc = (data, addTreeStatus) => {
    var addTree = addTreeStatus;
    let datalist = data;
    let refData = [];
    datalist.map(value => {
      let objRow = value;
      let pid = value.parentId;
      let areaLevel = value.areaLevel;
      objRow["pid"] = value.parentId;
      objRow["refpk"] = value.id;
      objRow["refcode"] = value.code;
      objRow["refname"] = value.name;
      objRow["key"] = value.id;
      objRow["isLeaf"] = false;
      objRow["children"] = [];
      if (areaLevel == 4) {
        objRow["isLeaf"] = true;
      }
      refData.push(objRow);
    });
    // console.log(addTree, "addTree");
    if (addTree) {
      let oldData = this.treetableTreeData;
      let areaLevel = refData[0].areaLevel;
      let newDataPid = refData[0].pid;
      oldData.map(value => {
        let level2, level3, level4, level5;
        level2 = value["children"];
        // 二级菜单
        if (areaLevel == 2) {
          let valueId = value.id;
          if (newDataPid == valueId) {
            value["children"] = refData;
            return;
          }
        }
        // 三级菜单
        if (areaLevel == 3) {
          if (level2.length) {
            level2.map(val2 => {
              let valueId = val2.id;
              if (newDataPid == valueId) {
                val2["children"] = refData;
                return;
              }
            });
          }
        }
        // 四级菜单
        if (areaLevel == 4) {
          if (level2.length) {
            level2.map(val => {
              let children3 = val["children"];
              if (children3.length) {
                children3.map(val3 => {
                  let valueId = val3.id;
                  if (newDataPid == valueId) {
                    val3["children"] = refData;
                    return;
                  }
                });
              }
            });
          }
        }
      });
    } else {
      // // 首次赋值
      this.treetableTreeData = refData;
    }
  };

  // 左树click
  treetableOnTreeChange = record => {
    addTreeStatus = true;
    let treeObj = record[0];
    let areaLevel = treeObj.areaLevel;
    let condition;
    // console.log(record, "级");
    if (areaLevel != 4) {
      // 树查询
      let tempTree = refTreeTableParams.refTree;
      tempTree.pageParams["parentId"] = treeObj.id;
      actions.refComponent.getReftreetableTreeList(tempTree);
      // 表查询
      let tempTable = refTreeTableParams.refTable;
      tempTable.pageParams["parentId"] = treeObj.id;
      tempTable.pageParams["page"] = 0;
      actions.refComponent.getReftreetableTableList(tempTable);
      //
      if (treeObj.id) {
        condition = {
          refpk: treeObj.refpk,
          isLeaf: treeObj.isLeaf
        };
        this.setState({
          condition
        });
      }
    } else {
      // console.log(areaLevel, "末级");
    }
    // console.log(treeObj.id, "左树click");
  };

  // 树查询
  treetableOnTreeSearch = value => {
    console.log(value, "树查询");
  };
  // 分页下拉或者跳转的回调
  treetableLoadTableData = param => {
    let tempTable = refTreeTableParams.refTable;
    this.treetablePage.currPageIndex = param[`refClientPageInfo.currPageIndex`];
    tempTable.pageParams["page"] = param[`refClientPageInfo.currPageIndex`];
    if (this.state.condition) {
      tempTable.pageParams["parentId"] = this.state.condition.refpk;
    }
    actions.refComponent.getReftreetableTableList(tempTable);
  };
  // 列表查询
  treetableOnTableSearch = value => {
    console.log("onTableSearch", value);
  };
  // 点击事件
  treetableCanClickGoOn = (refName, fieldName, data) => {
    // 禁止使用
    let propsDisable = this.props.disable;
    if (propsDisable == "disable") {
      return false;
    }
    //
    // console.log("canClickGoOn");
    let objName = refName + fieldName;
    let matchList = refMatchDatas[objName];
    let initialValue = this.props.initialValue;
    if (initialValue && matchList) {
      let initialValueObj = JSON.parse(initialValue);
      if (!matchList.length && initialValueObj["refpk"]) {
        let matchInitData = treetableInitialValueFun(initialValue);
        // 选中默认值
        refMatchDatas[objName] = matchInitData;
      }
      // if (initialValueObj["refpk"]) {
      //   // 编辑
      //   console.log(initialValue, "initialValue111");
      // } else {
      //   // 新
      //   console.log(initialValue, "initialValue000");
      // }
      // 选中默认值
      // this.setState({ rand: Math.random() });
    } else if (initialValue) {
      let matchInitData = treetableInitialValueFun(initialValue);
      // 选中默认值
      refMatchDatas[objName] = matchInitData;
      // this.setState({ rand: Math.random() });
    } else {
      // console.log(initialValue, "kkk");
    }
    // 清空参照数据
    addTreeStatus = false;
    this.treetableTableData = [];
    this.treetablePage = {};
    this.treetableTreeData = [];
    // 表查询
    let tempTable = refTreeTableParams.refTable;
    tempTable.pageParams["parentId"] = "";
    tempTable.pageParams["page"] = 0;
    actions.refComponent.getReftreetableTableList(tempTable);
    // 树查询
    let tempTree = refTreeTableParams.refTree;
    tempTree.pageParams["parentId"] = "";
    // this.setState({ rand: Math.random() });
    // 清除翻页id
    this.setState({ condition: "" });
    actions.refComponent.getReftreetableTreeList(tempTree);
    return true;
  };
  //input输入
  treetableCanInputGoOn = value => {
    // return true可输入，false不可输入
    return false;
  };
  // 参照--输入框检测--快捷查询
  treetableFilterUrlFunc = value => {
    // propsRefVal.filterData = [
    //   { refpk: "11", refname: "qq" },
    //   { refpk: "22", refname: "ww" }
    // ];
    // this.setState({ rand: Math.random() });
    // let queryParam = Object.assign({}, queryRefParam, {content: encodeURI(value)});
    // let temp = {pageParams: queryParam};
    // actions.classGroup.getRefSelect(temp);
  };
  // 参照确定按钮
  treetableOnSave = (refName, fieldName, item) => {
    if (this.props.refTreeTableOnClickSave) {
      this.props.refTreeTableOnClickSave(refName, fieldName, item);
    } else {
      // console.log("refTreeTableOnClickSave没有");
    }
    let objName = refName + fieldName;
    // 选中默认值
    refMatchDatas[objName] = item;
    // 清空数据
    // this.treetableTableData = [];
    // this.randomFun(true);
  };
  // 参照取消按钮
  treetableOnCancel = () => {
    // 清空数据
    // this.treetableTableData = [];
    // this.randomFun(true);
    // console.log("onCancel-0");
  };
  //treetable树表参照--end---------------------------------------------------
  /***************************************************************************************** */

  render() {
    let { condition } = this.state;
    let _props = this.props;
    let queryRefParam = this.queryRefParam;
    const { multiple, matchData, refName, fieldName, clientParam } = _props;
    const { getFieldProps, getFieldError } = _props.form;
    // 参照对象
    refModelDataObj[refName] = deepClone(refModelInfo[refName]);
    // 当前参照
    refModelData = refModelDataObj[refName];
    // 接口参数
    queryRefParam["refModelUrl"] = refModelData["refModelUrl"];
    // 查询参数
    queryRefParam["clientParam"] = clientParam || refModelData["clientParam"];
    // 显示字段设置，可设置
    refModelData["displayField"] =
      _props.displayField || refModelData.displayField;
    //输入框默认显示placeholder值,可设置
    refModelData["placeholder"] =
      _props.placeholder || refModelData.placeholder;
    //单选false,多选true,可设置
    refModelData["multiple"] = _props.multiple || refModelData.multiple;
    // console.log(_props, 999);

    ////标题，可设置
    refModelData["title"] = _props.title || refModelData.title;
    const { refType } = refModelData;
    // 判断渲染参照类型
    if (refType == "RefTreeInput") {
      // 树型参照-----------------------------------
      let objName = refName + fieldName;
      let thisMatchData = _props.refMatchData || refMatchDatas[objName];
      if (_props.refMatchData) {
        refMatchDatas[objName] = _props.refMatchData;
      }

      // console.log("树");
      return (
        <RefTreeWithInput
          {...refTreeValData}
          {...refModelData}
          matchData={thisMatchData}
          onSave={
            _props.onSave ||
            this.reftreeOnSave.bind(null, _props.refName, _props.fieldName)
          }
          canClickGoOn={this.reftreeCanClickGoOn.bind(
            null,
            _props.refName,
            _props.fieldName
          )}
          onCancel={this.reftreeOnCancel}
          getRefTreeData={this.getRefTreeData}
          filterUrlFunc={this.reftreeFilterUrlFunc}
          {...getFieldProps(_props.fieldName, {
            initialValue: _props.initialValue || '{"refname":"","refpk":""}',
            rules: _props.rules || [
              {
                message: "提示：不能为空！",
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }
            ]
          })}
        />
      );
    } else if (refType == "RefTableInput") {
      // 表参照-----------------------------------
      let objName = refName + fieldName;
      let thisMatchData = _props.refMatchData || refMatchDatas[objName];
      if (_props.refMatchData) {
        refMatchDatas[objName] = _props.refMatchData;
      }
      //-ref表头,可设置
      refModelData["colData"] = _props.colData || refModelData.colData;
      this.reftableLaunchTableHeader();
      // console.log("表");
      return (
        <RefMultipleTableWithInput
          {...refTableValData}
          {...refModelData}
          matchData={thisMatchData}
          onSave={
            _props.onSave ||
            this.reftableOnSave.bind(null, _props.refName, _props.fieldName)
          }
          canClickGoOn={this.reftableCanClickGoOn.bind(
            null,
            _props.refName,
            _props.fieldName
          )}
          onCancel={this.reftableOnCancel}
          searchFilterInfo={this.reftableSearchFilterInfo}
          miniSearchFunc={this.reftableMiniSearchFunc}
          onChange={this.reftableOnRefChange}
          canInputGoOn={this.reftableCanInputGoOn}
          handlePagination={this.reftableHandlePagination}
          dataNumSelect={this.reftableDataNumSelect}
          filterUrlFunc={this.reftableFilterUrlFunc}
          {...getFieldProps(_props.fieldName, {
            initialValue: _props.initialValue || '{"refname":"","refpk":""}',
            rules: _props.rules || [
              {
                message: "提示：不能为空！",
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }
            ]
          })}
        />
      );
    } else if (refType == "RefTreeTableInput") {
      // 树表参照-----------------------------------
      let objName = refName + fieldName;
      let thisMatchData = _props.refMatchData || refMatchDatas[objName];
      if (_props.refMatchData) {
        refMatchDatas[objName] = _props.refMatchData;
      }
      // console.log("树表");
      refTreeTableParams.refTable["refUrl"] = refModelData.refUrl;
      refTreeTableParams.refTree["refUrl"] = refModelData.refUrl;
      return (
        <RefTreeTableWithInput
          {...refTreeTableValData}
          {...refModelData}
          matchData={thisMatchData}
          onSave={
            _props.onSave ||
            this.treetableOnSave.bind(null, _props.refName, _props.fieldName)
          }
          canClickGoOn={this.treetableCanClickGoOn.bind(
            null,
            _props.refName,
            _props.fieldName
          )}
          onCancel={this.treetableOnCancel}
          treeData={this.treetableTreeData}
          tableData={this.treetableTableData}
          page={this.treetablePage}
          onTreeChange={this.treetableOnTreeChange}
          onTreeSearch={this.treetableOnTreeSearch}
          canInputGoOn={this.treetableCanInputGoOn}
          condition={condition}
          loadTableData={this.treetableLoadTableData}
          onTableSearch={this.treetableOnTableSearch}
          filterUrlFunc={this.treetableFilterUrlFunc}
          {...getFieldProps(_props.fieldName, {
            initialValue: _props.initialValue || '{"refname":"","refpk":""}',
            rules: _props.rules || [
              {
                message: "提示：不能为空！",
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }
            ]
          })}
        />
      );
    } else {
      // console.log(refType, "else");
      return (
        <RefTreeWithInput
          {...refTreeVal}
          {...refModelData}
          onSave={_props.onSave || this.onSave.bind(null, _props.fieldName)}
          onCancel={this.onCancel}
          getRefTreeData={this.getRefTreeData}
          canClickGoOn={this.canClickGoOn}
          filterUrlFunc={this.filterUrlFunc}
          {...getFieldProps(_props.fieldName, {
            initialValue: _props.initialValue || '{"refname":"","refpk":""}',
            rules: _props.rules || [
              {
                message: "提示：不能为空！",
                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
              }
            ]
          })}
        />
      );
    }
  }
}

export default connect(
  state => state.refComponent,
  null
)(RefComponent);
