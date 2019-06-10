import { actions } from "mirrorx";
import * as api from "./service";
import { processData, processFuwuData, deepClone } from "utils";

export default {
  name: "workStationChartPanel",
  initialState: {
    showLoading: false,
    unusualData: {},
    tendencyData: {}
  },
  reducers: {
    /**
     * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
     * @param {*} state
     * @param {*} data
     */
    updateState(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    /**
     * 加载列表数据
     * @param {*} param
     * @param {*} getState
     */
    async getUnusual(param, getState) {
      // actions.workStationChartPanel.updateState({ showLoading: true });
      let _param = { flag: param };
      const { result } = processFuwuData(await api.getUnusual(_param));
      const { data: res } = result;
      let _state = {
        getUnusualParam: _param
      };
      if (res) {
        _state = Object.assign({}, _state, { unusualData: res });
      }
      actions.workStationChartPanel.updateState(_state);
    },

    /**
     * 加载列表数据
     * @param {*} param
     * @param {*} getState
     */

    async getTendency(param, getState) {
      // actions.workStationChartPanel.updateState({ showLoading: true });
      let _param = { flag: param };
      const { result } = processFuwuData(await api.getTendency(_param));
      const { data: res } = result;
      let _state = {
        // showLoading: false
        getTendencyParam: _param
      };
      if (res) {
        _state = Object.assign({}, _state, { tendencyData: res });
      }
      actions.workStationChartPanel.updateState(_state);
    }
  }
};
