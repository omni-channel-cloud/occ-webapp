import React, { Component } from './node_modules/react';

export default function OccExtendsHOC(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
    }
    // TODO 
    // 模板处理
    // 扩展
    // 按钮权限
    render() {
      return <WrappedComponent {...this.props}/>
    }
  }
}