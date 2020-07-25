function formatter (number) {
  return String(number).replace(/\B(?=(\d{3})+$)/g, ',');
}

function moneyFormater (obj, key) {
  return obj && obj[key] ? `￥ ${formatter(obj[key])}` : '￥ 0.00';
}

function wrapperArray (obj, key) {
  return obj && obj[key] ? obj[key] : [];
}

function wrapperObject (obj, key) {
  if (obj && key.indexOf('.') >= 0) {
    const keyArr = key.split('.');
    if (obj[keyArr[0]]) {
      keyArr.forEach((k) => {
        obj = obj[k];
      });
    }
    return obj;
  } else {
    return obj && obj[key] ? obj[key] : {};
  }
}

function wrapperNumber (obj, key) {
  return obj && obj[key] ? obj[key] : 0;
}

function wrapperPercentage (obj, key) {
  return obj && obj[key] ? `${obj[key]}%` : '0';
}

export default {
  inject: ['getMapData', 'getReportData', 'getWordCloud'],
  computed: {
    reportData () {
      return this.getReportData();
    },
    salesToday () { // 累计销售额
      return moneyFormater(this.reportData, 'salesToday');
    },
    salesGrowthLastDay () { // 累计销售额 - 日同比
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay');
    },
    salesGrowthLastMonth () { // 累计销售额 - 月同比
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth');
    },
    salesLastDay () { // 昨日销售额
      return moneyFormater(this.reportData, 'salesLastDay');
    },
    orderToday () { // 累计订单量
      return formatter(wrapperNumber(this.reportData, 'orderToday'));
    },
    orderLastDay () { // 昨日订单量
      return formatter(wrapperNumber(this.reportData, 'orderLastDay'));
    },
    orderTrend () { // 订单量趋势
      return wrapperArray(this.reportData, 'orderTrend');
    },
    orderUser () { // 今日交易用户数
      return formatter(wrapperNumber(this.reportData, 'orderUser'));
    },
    orderUserTrend () { // 今日交易用户数趋势
      return wrapperArray(this.reportData, 'orderUserTrend');
    },
    orderUserTrendAxis () { // 今日交易用户数趋势对应时间
      return wrapperArray(this.reportData, 'orderUserTrendAxis');
    },
    returnRate () { // 退货率
      return wrapperPercentage(this.reportData, 'returnRate');
    },
    userToday () { // 累计用户数
      return formatter(wrapperNumber(this.reportData, 'userToday'));
    },
    userTodayNumber () { // 累计用户数
      return wrapperNumber(this.reportData, 'userToday');
    },
    userLastMonth () { // 上月累计用户数
      return wrapperNumber(this.reportData, 'userLastMonth');
    },
    userGrowthLastDay () { // 累计用户数 - 日同比
      return wrapperPercentage(this.reportData, 'userGrowthLastDay');
    },
    userGrowthLastMonth () { // 累计用户数 - 月同比
      return wrapperPercentage(this.reportData, 'userGrowthLastMonth');
    },
    orderFullYear () { // 年度销售额
      return wrapperArray(this.reportData, 'orderFullYear');
    },
    orderFullYearAxis () { // 年度销售额 - X 轴数据
      return wrapperArray(this.reportData, 'orderFullYearAxis');
    },
    orderRank () { // 订单排行
      return wrapperArray(this.reportData, 'orderRank');
    },
    userFullYear () { // 年度用户访问量
      return wrapperArray(this.reportData, 'userFullYear');
    },
    userFullYearAxis () { // 年度用户访问量 - X 轴数据
      return wrapperArray(this.reportData, 'userFullYearAxis');
    },
    userRank () { // 用户访问量排行
      return wrapperArray(this.reportData, 'userRank');
    },
    wordCLoud () { // 关键词搜索
      return this.getWordCloud();
    },
    categoryData () { // 品类
      return wrapperObject(this.reportData, 'category.data1');
    },
    commodityData () { // 商品
      return wrapperObject(this.reportData, 'category.data2');
    },
    mapData () {
      return this.getMapData();
    }
  },
  filters: {
    format (number) {
      return formatter(number);
    }
  }
};
