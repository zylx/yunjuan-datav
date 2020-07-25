<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template slot="header">
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">{{searchUsers | format}}</div>
                <v-chart :options="searchUsersOption" />
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">{{searchCount | format}}</div>
                <v-chart :options="searchCountOption" />
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="pagesData">
                <el-table-column prop="rank" label="排名" />
                <el-table-column prop="keyword" label="关键词" />
                <el-table-column prop="count" label="搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
                <el-table-column prop="range" label="占比" />
              </el-table>
              <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" background @current-change="onPageChange" />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template slot="header">
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="categoryType" size="small" @change="onCategoryChange">
                <el-radio-button label="category">品类</el-radio-button>
                <el-radio-button label="commodity">商品</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :options="categoryOption" />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import commonDataMixins from '@/mixins/commonDataMixins'
export default {
  name: 'BottomView',
  mixins: [commonDataMixins],
  data () {
    return {
      categoryType: 'category',
      searchUsers: 0,
      searchCount: 0,
      searchUsersOption: {},
      searchCountOption: {},
      pageSize: 4,
      total: 0,
      pagesData: [],
      tableData: [],
      categoryOption: {},
      categoryColor: ['#8d7fec', '#5085f2', '#f8726b', '#e7e702', '#78f283', '#4bc1fc']
    }
  },
  watch: {
    wordCLoud () {
      if (this.wordCLoud.length > 0) {
        this.total = this.wordCLoud.length;
        const totalData = [];
        this.wordCLoud.forEach((item, index) => {
          totalData.push({
            id: index + 1,
            rank: index + 1,
            keyword: item.word,
            count: item.count,
            users: item.user,
            range: `${(item.user / item.count * 100).toFixed(2)}%`
          });
          this.searchUsers += item.user;
          this.searchCount += item.count;
        });
        this.tableData = totalData.sort((a, b) => {
          return b.count - a.count
        });
        this.paginationRender(1);
        this.searchUsersOption = this.getChartOption('user');
        this.searchCountOption = this.getChartOption('count');
      }
    },
    categoryData () {
      this.getCategoryOption();
    }
  },
  methods: {
    paginationRender (page) {
      const start = (page - 1) * this.pageSize;
      this.pagesData = this.tableData.slice(start, start + this.pageSize);
    },
    getChartOption (key = 'user') {
      const data = [];
      const dataAxis = [];
      this.wordCLoud.forEach((item) => {
        data.push(item[key]);
        dataAxis.push(item.word);
      });
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dataAxis
        },
        yAxis: {
          show: false
        },
        tooltip: {},
        series: [
          {
            type: 'line',
            data,
            areaStyle: {
              color: 'rgba(95, 187, 255, .5)'
            },
            lineStyle: {
              color: 'rgba(95, 187, 255)'
            },
            itemStyle: {
              opacity: 0
            },
            smooth: true
          }
        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    },
    getCategoryOption () {
      let data;
      let dataAxis;
      let total = 0;
      if (this.categoryType === 'category') {
        data = this.categoryData.data1;
        dataAxis = this.categoryData.axisX;
      } else {
        data = this.commodityData.data1;
        dataAxis = this.commodityData.axisX;
      }
      data = data.slice(0, 6);
      dataAxis = dataAxis.slice(0, 6);
      total = data.reduce((prev, curr) => prev + curr, 0);
      const chartData = [];
      data.forEach((item, index) => {
        const percent = `${(item / total * 100).toFixed(2)}%`;
        chartData.push({
          legendname: dataAxis[index],
          value: item,
          percent,
          itemStyle: { color: this.categoryColor[index] },
          name: `${dataAxis[index]} | ${percent}`
        });
      })
      this.categoryOption = {
        title: [
          {
            text: `${this.categoryType === 'category' ? '品类' : '商品'}分布`,
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            top: 20,
            left: 20
          },
          {
            text: '累计订单量',
            subtext: total,
            x: '34.5%',
            y: '42.5%',
            textStyle: {
              fontSize: 14,
              color: '#999'
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333'
            },
            textAlign: 'center'
          }
        ],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return `${params.seriesName}<br>
                    ${params.marker}${params.data.legendname}<br>
                    数量：${params.data.value}<br>
                    占比：${params.data.percent}%`;
          }
        },
        series: [
          {
            name: '品类分布',
            type: 'pie',
            data: chartData,
            clockwise: false,
            label: {
              normal: {
                show: true,
                position: 'outer',
                formatter: function (params) {
                  return params.data.legendname;
                }
              }
            },
            center: ['35%', '50%'],
            radius: ['45%', '60%'],
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true
              }
            }
          }
        ]
      }
    },
    onPageChange (page) {
      this.paginationRender(page);
    },
    onCategoryChange (type) {
      this.categoryType = type;
      this.getCategoryOption();
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom-view {
  display: flex;
  margin-top: 20px;
  .view {
    flex: 1;
    width: 50%;
    box-sizing: border-box;
    &:first-child {
      padding-right: 10px;
    }
    &:last-child {
      padding-left: 10px;
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid #e6e6e6;
      font-size: 14px;
      font-weight: 500;
      .radio-wrapper {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }
    .chart-wrapper {
      display: flex;
      flex-direction: column;
      height: 452px;
      .chart-inner {
        display: flex;
        margin-top: 20px;
        padding: 0 10px;
        .chart {
          flex: 1;
          padding: 0 10px;
          .chart-title {
            font-size: 14px;
            color: #999;
          }
          .chart-data {
            margin: 5px 0 10px 0;
            font-size: 22px;
            color: #333;
            font-weight: 500;
            letter-spacing: 1px;
          }
          .echarts {
            height: 60px;
          }
        }
      }
    }
    .table-wrapper {
      flex: 1;
      margin-top: 20px;
      padding: 0 20px 20px;
      .el-pagination {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        margin-top: 15px;
      }
    }
  }
}
</style>
