import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils";

/**
 *          btnFlag为按钮状态，新增、修改是可编辑，查看详情不可编辑，
 *          新增表格为空
 *          修改需要将行数据带上并显示在卡片页面
 *          查看详情携带行数据但是表格不可编辑
 *          0表示新增、1表示修改，2表示查看详情 3提交
 *async loadList(param, getState) {
 *          rowData为行数据
 */

export default {
  // 确定 Store 中的数据模型作用域
  name: "refComponent",
  initialState: {
    showLoading: false,
    list: [],
    refList: [],
    refSelect: [],
    refTreeList: [],
    refTableList: [],
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    refRenderParam: {},
    total: 0,
    // 翻页size数量最大值为0-5
    dataNum: 1,
    queryParam: {
      pageParams: {
        page: 0,
        size: 10
      }
    }
  },
  reducers: {
    /**
     * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
     * @param {*} state
     * @param {*} data
     */
    updateState(state, data) {
      //更新state
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    /**
     *参照--请求列表----
     * @param {*} param
     * @param {*} getState
     */

    // 参照--请求列表----
    async getRefList(param, getState) {
      // 调用 getList 请求数据
      const _param = param || getState().refComponent.queryRefParam;
      let result = await api.getRefList(_param);
      const res = result.data;
      let _state = {
        showLoading: false,
        queryRefParam: _param //更新搜索条件
      };
      if (res) {
        _state = Object.assign({}, _state, {
          list: res.data, //list数据
          refRenderParam: res.page
        });
      }
      actions.refComponent.updateState(_state);
    },
    // 参照--快捷查询请求----
    async getRefSelect(param, getState) {
      // 调用 getList 请求数据
      const _param = param || getState().refComponent.queryRefParam;
      let result = await api.getRefSelect(_param);
      const res = result.data;
      let _state = {
        showLoading: false,
        queryRefParam: _param //更新搜索条件
      };
      if (res) {
        _state = Object.assign({}, _state, {
          refSelect: res.data //list数据
        });
      }
      actions.refComponent.updateState(_state);
    },

    /**
     * table数据
     * @param {*} param
     * @param {*} getState
     */
    async getReftreetableTableList(param, getState) {
      // 正在加载数据，显示加载 Loading 图标
      actions.refComponent.updateState({
        showLoading: true
      });
      // 调用 getList 请求数据
      const _param = param || getState().refComponent.queryParam;
      let result = await api.getRefTableList(_param);
      const res = result.data;
      let _state = {
        showLoading: false,
        queryParam: _param //更新搜索条件
      };
      if (res) {
        _state = Object.assign({}, _state, {
          refTableList: res.content,
          pageIndex: res.number,
          totalPages: res.totalPages,
          total: res.totalElements,
          pageSize: res.size
        });
      }
      actions.refComponent.updateState(_state);
    },

    /**
     * tree数据
     * @param {*} param
     * @param {*} getState
     */
    async getReftreetableTreeList(param, getState) {
      // 正在加载数据，显示加载 Loading 图标
      actions.refComponent.updateState({
        showLoading: true
      });
      // 调用 getList 请求数据
      const _param = param || getState().refComponent.queryParam;
      let result = await api.getRefTreeList(_param);
      const res = result.data;
      let _state = {
        showLoading: false,
        queryParam: _param //更新搜索条件
      };
      if (res) {
        _state = Object.assign({}, _state, {
          refTreeList: res
        });
      }
      actions.refComponent.updateState(_state);
    }
  }
};
