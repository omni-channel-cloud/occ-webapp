import request from "utils/request";
import { deepClone } from "utils";
import qs from "qs";

//定义接口地址
const URL = {
  REF_PORTAL_SEARCH: `${GROBAL_REF_URL}/commonRefsearch`, //参照-查询列表
  REF_PORTAL_SEARCH_SELECT: `${GROBAL_REF_URL}/filterRefJSON` //参照-快速查询
};

/**
 * 参照列表获取
 * @param {*} params
 */
export const getRefList = param => {
  let newParam = Object.assign({}, param);
  let headers = { "Content-type": "application/x-www-form-urlencoded" };
  return request(URL.REF_PORTAL_SEARCH, {
    method: "post",
    data: qs.stringify(newParam.pageParams),
    headers
  });
};
/**
 * 参照--快捷查询select
 * @param {*} params
 */
export const getRefSelect = param => {
  let newParam = Object.assign({}, param);
  let headers = { "Content-type": "application/x-www-form-urlencoded" };
  return request(URL.REF_PORTAL_SEARCH_SELECT, {
    method: "post",
    data: qs.stringify(newParam.pageParams),
    headers
  });
};

/**
 * table获取参照列表
 * @param {*} params
 */
export const getRefTableList = param => {
  let newParam = Object.assign({}, param),
    pageParams = deepClone(newParam.pageParams);
  let URL = newParam.refUrl.tableUrl;
  delete newParam.pageParams;
  return request(URL, {
    method: "get",
    data: newParam,
    param: pageParams
  });
};

/**
 * tree获取参照列表
 * @param {*} params
 */
export const getRefTreeList = param => {
  let newParam = Object.assign({}, param),
    pageParams = deepClone(newParam.pageParams);
  let URL = newParam.refUrl.treeUrl;
  delete newParam.pageParams;
  return request(URL, {
    method: "get",
    data: newParam,
    param: pageParams
  });
};
