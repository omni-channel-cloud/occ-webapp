import React, { Component } from 'react';
import {actions} from "mirrorx";
import {deepClone} from "utils";

export default function OccExtendsHOC(WrappedComponent) {
  return class OEHOC extends Component {
    constructor(props) {
      super(props)
      this.state = {
        appcode: window.location.hash.slice(2)
      }
    }
    // TODO 
    // 模板处理
    getTemplate() {
      let param = deepClone(this.props.tempQueryParam);
      actions.OccExtendHOC.loadTemplate(this.props.tempQueryParam);
    }
    // 扩展
    getExtends() {

    }
    // 按钮权限
    getButtonAuth() {
      let param = deepClone(this.props.tempQueryParam);
      actions.OccExtendHOC.loadButAuth(this.props.tempQueryParam);
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}