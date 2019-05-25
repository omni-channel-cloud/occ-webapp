import React, { Component } from 'react';

export default function OccExtendsHOC(WrappedComponent) {
  return class OEHOC extends Component {
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