/**
 * 数据模型类
 */

import { actions } from "mirrorx";
import * as api from "./service";

export default {
    // 确定 Store 中的数据模型作用域
    name: "OccExtendHOC",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        text: '',
        tempQueryParam: {
            appcode: ''
        }
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        /**
         * 按钮测试数据
         * @param {*} param
         * @param {*} getState
         */
        async loadTemplate(params, getState) {
            let result = await api.loadTemplate(params);
            return result;
        },
        async loadButAuth(params, getState) {
            let result = await api.loadButAuth(params);
            return result;
        }
    }
};
