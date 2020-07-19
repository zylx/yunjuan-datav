<template>
  <div class="sales-view">
    <el-card shadow="hover">
      <template slot="header">
        <div class="menu-wrapper">
          <el-menu class="menu-left" mode="horizontal" :default-active="activeIndex" @select="onMenuSelect">
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="tabPositon" size="small">
              <el-radio-button label="today">今日</el-radio-button>
              <el-radio-button label="thisWeek">本周</el-radio-button>
              <el-radio-button label="thisMonth">本月</el-radio-button>
              <el-radio-button label="thisYear">今年</el-radio-button>
            </el-radio-group>
            <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" unlink-panels :picker-options="pickerOptions" />
          </div>
        </div>
      </template>
      <template>
        <div class="chart-wrapper">
          <v-chart :options="chartOption" />
          <div class="sales-view-list">
            <label class="list-title">排行榜</label>
            <ul class="list-wrapper">
              <li class="list-item" v-for="item in rankData" :key="item.no">
                <span :class="['item-no', item.no <= 3 ? 'top-no' : '']">{{ item.no }}</span>
                <span class="item-name">{{ item.name }}</span>
                <span class="item-sales">{{ item.sales }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SalesView',
  data () {
    return {
      activeIndex: '1',
      tabPositon: 'today',
      date: null,
      pickerOptions: {
        // disabledDate (time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [
          this.getDateRange('最近一周', 3600 * 1000 * 24 * 7),
          this.getDateRange('最近一个月', 3600 * 1000 * 24 * 30),
          this.getDateRange('最近三个月', 3600 * 1000 * 24 * 90),
          this.getDateRange('最近半年', 3600 * 1000 * 24 * 183),
          this.getDateRange('最近一年', 3600 * 1000 * 24 * 366)
        ]
      },
      rankData: [
        {
          no: 1,
          name: '肯德基',
          sales: '23,321'
        },
        {
          no: 2,
          name: '麦当劳',
          sales: '23,321'
        },
        {
          no: 3,
          name: '海底捞',
          sales: '23,321'
        },
        {
          no: 4,
          name: '肯德基',
          sales: '23,321'
        },
        {
          no: 5,
          name: '肯德基',
          sales: '23,321'
        },
        {
          no: 6,
          name: '肯德基',
          sales: '23,321'
        },
        {
          no: 7,
          name: '肯德基',
          sales: '23,321'
        }
      ],
      chartOption: {}
    }
  },
  mounted () {
    this.chartOption = this.getOptions();
  },
  methods: {
    onMenuSelect (index) {
      console.log('onMemuSelect -> index', index)
    },
    getDateRange (title, date) {
      return {
        text: title,
        onClick (picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(end.getTime() - (date || 0));
          picker.$emit('pick', [start, end], true) // 设置为 true，选中 快捷项 后日期面板不隐藏
        }
      }
    },
    getOptions () {
      return {
        title: {
          text: '年度销售额',
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          top: 10,
          left: 15
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#ececec'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '35%',
            data: [200, 250, 300, 350, 250, 200, 250, 300, 350, 200, 250, 280],
            itemStyle: {
              color: '#3398DB'
            }
          }
        ],
        grid: {
          top: 60,
          left: 50,
          right: 50,
          bottom: 40
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sales-view {
  margin-top: 20px;
  .menu-wrapper {
    position: relative;
    display: flex;
    .menu-left {
      width: 100%;
      padding-left: 20px;
      .el-menu-item {
        height: 50px;
        line-height: 50px;
        margin: 0 20px;
      }
    }
    .menu-right {
      position: absolute;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 50px;
      right: 20px;
      .el-radio-group {
        margin-right: 20px;
      }
    }
  }

  .chart-wrapper {
    display: flex;
    height: 270px;
    .echarts {
      flex: 0 0 70%;
      width: 70%;
      height: 100%;
    }
    .sales-view-list {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .list-title {
        font-size: 14px;
        color: #666;
        font-weight: 600;
      }
      .list-wrapper {
        padding-left: 0;
        .list-item {
          display: flex;
          height: 22px;
          line-height: 22px;
          padding: 6px 10px 6px 0;
          list-style: none;
          font-size: 14px;
          .item-no {
            display: inline-block;
            width: 20px;
            color: #333;
            text-align: center;
            &.top-no {
              border-radius: 50%;
              color: #fff;
              background-color: #ff5722;
            }
          }
          .item-name {
            margin-left: 15px;
          }
          .item-sales {
            display: flex;
            flex: 1;
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>
