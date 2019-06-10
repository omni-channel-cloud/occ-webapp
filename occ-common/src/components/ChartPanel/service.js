import request from "utils/request";

//定义接口地址
const URL = {
  GET_UNUSUAL: `${GROBAL_HTTP_PREFIX}/fuwu-order/service/order/exception-order-statistics`, //异常分布统计
  GET_TENDENCY: `${GROBAL_HTTP_PREFIX}/fuwu-order/service/order/increase-trend-statistics` //增长趋势统计
};

/**
 * 异常分布统计
 * @param {*} params
 */
export const getUnusual = param => {
  return request(URL.GET_UNUSUAL, {
    method: "get",
    param
  });
};

/**
 * 增长趋势统计
 * @param {*} params
 */
export const getTendency = param => {
  return request(URL.GET_TENDENCY, {
    method: "get",
    param
  });
};
