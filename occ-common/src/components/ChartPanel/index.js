import React, { Component } from "react";
import Echarts from "echarts";
import mirror, { actions, connect } from "mirrorx";
import model from "./model";
mirror.model(model);

import "./index.less";

// 数据图表
let chartPanelServiceCenter, chartPanelUnusual, chartPanelTendency;
// 服务中心--环形图
let serviceCenterData = {
  dispatching: {
    num: 0
  },
  underway: {
    num: 0
  },
  audit: {
    num: 0
  }
};
let optionServiceCenter = {
  color: ["#9A47FF", "#30C381", "#FAAF1E"],
  backgroundColor: "rgba(0,0,0,0)",
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  // legend: {
  //   orient: "vertical",
  //   x: "left",
  //   data: ["待派工", "进行中", "待审核"]
  // },
  series: [
    {
      name: "数据来源",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: "center"
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "20",
            fontWeight: "bold"
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: serviceCenterData["dispatching"].num, name: "待派工" },
        { value: serviceCenterData["underway"].num, name: "进行中" },
        { value: serviceCenterData["audit"].num, name: "待审核" }
      ]
    }
  ]
};
//异常分布-- 散点图，默认本周，双周，本月
let unusualNavData = [{ tabName: "本月", id: 1 }, { tabName: "上月", id: 2 }];
let unusualData = {
  sum: 896,
  // 默认值
  data: [
    // 数量
    [10.05],
    [15.12],
    [7.05],
    [30]
  ],
  dates: []
};
let optionUnusual = {
  // 显示
  tooltip: {
    showDelay: 0,
    formatter: function(params) {
      if (params.data > 0) {
        let thisIndex = params.dataIndex;
        let thisDate = unusualData.dates[thisIndex];
        return "日期： " + thisDate + "<br/>" + "数量：" + params.data;
      }
      // if (params.value.length > 1) {
      //   let thisIndex = params.dataIndex;
      //   let thisDate = unusualData.dates[thisIndex];
      //   return "日期： " + thisDate + "<br/>" + "数量：" + params.value[1];
      // }
    }
    // axisPointer: {
    //   show: true,
    //   type: "cross",
    //   lineStyle: {
    //     type: "dashed",
    //     width: 1
    //   }
    // }
  },
  grid: {
    left: "20px",
    right: "20px",
    bottom: "5px",
    containLabel: true
  },
  color: ["#f33"],
  xAxis: {
    scale: true,
    // type: "category",
    boundaryGap: false,
    data: [31, 16, 17, 18, 19, 20, 25]
  },
  yAxis: {
    // scale: true
  },
  series: [
    {
      type: "scatter",
      // type: "effectScatter",
      symbolSize: 10,
      data: unusualData["data"]
      // data: [120, 180, 100, 334, 500]
      // data: [["13", 105], ["15", 42]]
    }
    // {
    //   symbolSize: 20,
    //   type: "scatter",
    //   data: [[18, 51], [16, 75], [31, 55]]
    // }
  ]
};
// 增长趋势
let tendencyNavData = [{ tabName: "本月", id: 1 }, { tabName: "上月", id: 2 }];
let tendencyData = {
  sum: 99,
  // 默认值
  dates: []
};
let optionTendency = {
  color: ["#eb0303"],
  // 显示
  // tooltip: {
  //   trigger: "axis"
  // },
  // 显示
  tooltip: {
    // showDelay: 0,
    trigger: "axis",
    formatter: function(params) {
      if (params[0].value > -1) {
        let thisIndex = params[0].dataIndex - 1;
        let thisDate = tendencyData.dates[thisIndex];
        return "日期： " + thisDate + "<br/>" + "数量：" + params[0].value;
      }
    }
    // axisPointer: {
    //   show: true,
    //   type: "cross",
    //   lineStyle: {
    //     type: "dashed",
    //     width: 1
    //   }
    // }
  },
  grid: {
    left: "20px",
    right: "20px",
    bottom: "5px",
    containLabel: true
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [1, 2, 3, 4, 5, 6, 7]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      name: "数量",
      type: "line",
      stack: "总量",
      data: [120, 180, 0, 934, 500]
    }
  ]
};
//请求名称
let getName = "";
//
class Exception extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceCenter: false,
      unusualNavIndex: 1,
      tendencyNavIndex: 1
    };
  }
  // 监听数据
  componentWillReceiveProps(next) {
    let updataTabsGroup = next.workStationTabsGroup;
    let updataChartPanel = next.workStationChartPanel;
    if (getName == "unusualNav" || updataChartPanel["unusualData"]) {
      // 异常分布
      this.getUnusualDataFun(updataChartPanel);
    }
    if (getName == "tendencyNav" || updataChartPanel["tendencyData"]) {
      // 增长趋势
      this.getTendencyDataFun(updataChartPanel);
    }

    // 服务中心--数据
    if (
      updataTabsGroup[CONSTS.ORDER_AWAITING_DISPATCH] ||
      updataTabsGroup[CONSTS.ORDER_PROCESSING] ||
      updataTabsGroup["AWAITING_AUDIT"]
    ) {
      //待派工
      let dispatching = updataTabsGroup[CONSTS.ORDER_AWAITING_DISPATCH];
      //待派工
      let underway = updataTabsGroup[CONSTS.ORDER_PROCESSING];
      //待审核
      let audit = updataTabsGroup["AWAITING_AUDIT"];
      //图
      optionServiceCenter.series[0].data[0].value = dispatching;
      optionServiceCenter.series[0].data[1].value = underway;
      optionServiceCenter.series[0].data[2].value = audit;
      this.chartPanelFun(
        chartPanelServiceCenter,
        "chartPanelServiceCenter",
        optionServiceCenter
      );
      //数据项
      serviceCenterData["dispatching"].num = dispatching;
      serviceCenterData["underway"].num = underway;
      serviceCenterData["audit"].num = audit;
    }
  }
  // 初始化
  componentDidMount() {
    actions.workStationChartPanel.getUnusual(this.state.unusualNavIndex);
    actions.workStationChartPanel.getTendency(this.state.tendencyNavIndex);

    // 初始化-数据图表
    // 服务中心
    this.chartPanelFun(
      chartPanelServiceCenter,
      "chartPanelServiceCenter",
      optionServiceCenter
    );
    // 异常分布
    this.chartPanelFun(chartPanelUnusual, "chartPanelUnusual", optionUnusual);
    // 增长趋势
    this.chartPanelFun(
      chartPanelTendency,
      "chartPanelTendency",
      optionTendency
    );
  }
  // 数据图表构建
  chartPanelFun = (chartName, id, data) => {
    chartName = Echarts.init(document.getElementById(id));
    chartName.setOption(data, true);
  };
  // 异常数据处理
  unusualDataFun = (data, today, index) => {
    let thisIndex = index;
    let paramData = data;
    let dates = ["0"];
    let dataList = [];
    unusualData.dates = [];
    // 1本周，2双周，3本月
    if (thisIndex) {
      paramData.map(value => {
        let obj = value;
        let objArry = [];
        for (let key in obj) {
          // 日期
          let _date = key;
          unusualData.dates.push(_date);
          // 取最后2位
          let objDate = key.substr(key.length - 2);
          let numberDate = Number(objDate);
          let objval = obj[key];
          dates.push(numberDate);
          objArry = [objval];
        }
        if (objArry[0]) {
          dataList.push(objArry[0]);
        } else {
          dataList.push("");
        }
      });
    }

    return { date: dates, dataList: dataList };
  };
  // 异常数据赋值
  getUnusualDataFun = param => {
    let dataList = param.unusualData["data"];
    let today = param.unusualData["today"];
    let index = this.state.unusualNavIndex;
    if (dataList && dataList.length) {
      unusualData["sum"] = param.unusualData["sum"];
      let _data = this.unusualDataFun(dataList, today, index);
      optionUnusual.xAxis.data = _data["date"];
      optionUnusual.series[0].data = _data["dataList"];
      // let _data = this.unusualDataFun(dataList, index);
      // optionUnusual.series[0].data = _data;
      this.chartPanelFun(chartPanelUnusual, "chartPanelUnusual", optionUnusual);
    }
  };
  // 增长趋势数据处理
  tendencyDataFun = (data, today, index) => {
    // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    // data: [120, 180, 0, 934, 500]
    let thisIndex = index;
    let paramData = data;
    let dates = ["0"];
    let dataList = [""];
    let dateStatus = true;
    let thisToday = today.substr(today.length - 2);
    tendencyData.dates = [];
    // 1本周，2双周，3本月
    if (thisIndex == 1) {
      paramData.map(value => {
        let obj = value;
        let objArry = [];
        for (let key in obj) {
          // 日期
          let _date = key;
          tendencyData.dates.push(_date);
          // 取最后2位
          let objDate = key.substr(key.length - 2);
          let numberDate = Number(objDate);
          let objval = obj[key];
          objArry = [numberDate, objval];
        }
        if (objArry[0] > Number(thisToday)) {
          dateStatus = false;
        }
        dates.push(objArry[0]);
        if (dateStatus) {
          dataList.push(objArry[1]);
        }
      });
    } else if (thisIndex == 2) {
      paramData.map(value => {
        let obj = value;
        let objArry = [];
        for (let key in obj) {
          // 日期
          let _date = key;
          tendencyData.dates.push(_date);
          // 取最后2位
          let objDate = key.substr(key.length - 2);
          let numberDate = Number(objDate);
          let objval = obj[key];
          objArry = [numberDate, objval];
        }
        dates.push(objArry[0]);
        if (dateStatus) {
          dataList.push(objArry[1]);
        }
      });
    } else {
      paramData.map(value => {
        let obj = value;
        let objArry = [];
        for (let key in obj) {
          // 日期
          let _date = key;
          tendencyData.dates.push(_date);
          // 取最后2位
          let objDate = key.substr(key.length - 2);
          let numberDate = Number(objDate);
          let objval = obj[key];
          objArry = [numberDate, objval];
        }
        if (objArry[0] > Number(thisToday)) {
          dateStatus = false;
        }
        dates.push(objArry[0]);
        if (dateStatus) {
          dataList.push(objArry[1]);
        }
      });
    }
    return { date: dates, dataList: dataList };
  };
  // 增长趋势数据赋值
  getTendencyDataFun = param => {
    let dataList = param.tendencyData["data"];
    let today = param.tendencyData["today"];
    let index = this.state.tendencyNavIndex;
    if (dataList && dataList.length) {
      let _data = this.tendencyDataFun(dataList, today, index);
      tendencyData["sum"] = param.tendencyData["sum"];
      optionTendency.xAxis.data = _data["date"];
      optionTendency.series[0].data = _data["dataList"];
      this.chartPanelFun(
        chartPanelTendency,
        "chartPanelTendency",
        optionTendency
      );
    }
  };

  // 获取当月天数
  getDays = () => {
    //构造当前日期对象
    var date = new Date();
    //获取年份
    var year = date.getFullYear();
    //获取当前月份
    var mouth = date.getMonth() + 1;
    //定义当月的天数；
    var days;
    //当月份为二月时，根据闰年还是非闰年判断天数
    if (mouth == 2) {
      days = year % 4 == 0 ? 29 : 28;
    } else if (
      mouth == 1 ||
      mouth == 3 ||
      mouth == 5 ||
      mouth == 7 ||
      mouth == 8 ||
      mouth == 10 ||
      mouth == 12
    ) {
      //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
      days = 31;
    } else {
      //其他月份，天数为：30.
      days = 30;
    }
    return days;
  };
  //navOnClick切换的方法
  navBoxChoiced = (id, param) => {
    let navName = param;
    if (navName == "tendencyNav") {
      this.setState({
        tendencyNavIndex: id
      });
      getName = navName;
      actions.workStationChartPanel.getTendency(id);
    } else if (navName == "unusualNav") {
      this.setState({
        unusualNavIndex: id
      });
      getName = navName;
      actions.workStationChartPanel.getUnusual(id);
    }
  };
  // 切换nav渲染方法
  navListRandFun = (data, navName, indexName) => {
    let dataList = data;
    let navList = dataList.map((res, index) => {
      // 遍历标签页，如果标签的id等于tabid，那么该标签就加多一个active的className
      let tabStyle = res.id == indexName ? "nav-btn  nav-active" : "nav-btn";
      return (
        <span
          key={index}
          onClick={this.navBoxChoiced.bind(null, res.id, navName)}
          className={tabStyle}
        >
          {res.tabName}
        </span>
      );
    });
    return navList;
  };
  render() {
    // 异常
    let unusualNavList = this.navListRandFun(
      unusualNavData,
      "unusualNav",
      this.state.unusualNavIndex
    );
    // 趋势
    let tendencyNavList = this.navListRandFun(
      tendencyNavData,
      "tendencyNav",
      this.state.tendencyNavIndex
    );

    let _props = this.props;
    let { title } = this.state;
    // 服务中心数据
    let serviceCenterDispatching = serviceCenterData["dispatching"].num,
      serviceCenterUnderway = serviceCenterData["underway"].num,
      serviceCenterAudit = serviceCenterData["audit"].num;
    // 异常分布数据
    let unusualDataSum = unusualData["sum"];
    let tendencyDataSum = tendencyData["sum"];
    return (
      <div className="chartPanelForm">
        <div className="chartPanelBox  chartPanelServiceCenterBox ">
          <div className="cp-title">{"服务中心"}</div>
          <div className="cp-contentBox ">
            <ul className="ul-b">
              <li className="li-b ">
                <span className="s-icon s-icon01" />
                <span className="s-name">{"待派工"}</span>
                <span className="s-num">{serviceCenterDispatching}</span>
              </li>
              <li className="li-b ">
                <span className="s-icon s-icon02" />
                <span className="s-name">{"进行中"}</span>
                <span className="s-num">{serviceCenterUnderway}</span>
              </li>
              <li className="li-b ">
                <span className="s-icon s-icon03" />
                <span className="s-name">{"待审核"}</span>
                <span className="s-num">{serviceCenterAudit}</span>
              </li>
            </ul>
          </div>
          <div
            className="chartPanelServiceCenter"
            id="chartPanelServiceCenter"
          />
        </div>
        <div className="chartPanelBox  chartPanelUnusualBox">
          <div className="cp-title">{"异常分布"}</div>
          <div className="cp-navBox">{unusualNavList}</div>
          <div className="cp-contentBox">
            <div className="numBox">
              <span className="s-icon" />
              <span className="s-title">{"总量:"}</span>
              <span className="s-num">{unusualDataSum}</span>
            </div>
          </div>
          <div className="chartPanelUnusual" id="chartPanelUnusual" />
        </div>
        <div className="chartPanelBox chartPanelUnusualBox chartPanelTendencyBox ">
          <div className="cp-title">{"增长趋势"}</div>
          <div className="cp-navBox">{tendencyNavList}</div>
          <div className="cp-contentBox">
            <div className="numBox">
              <span className="s-icon" />
              <span className="s-title">{"总量:"}</span>
              <span className="s-num">{tendencyDataSum}</span>
            </div>
          </div>
          <div className="chartPanelTendency" id="chartPanelTendency" />
        </div>
      </div>
    );
  }
}
export default connect(state => {
  return {
    workStationTabsGroup: state.workStationTabsGroup,
    workStationChartPanel: state.workStationChartPanel
  };
})(Exception);
