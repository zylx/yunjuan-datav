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
                <div class="chart-data">93,634</div>
                <v-chart :options="searchUsersOption" />
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">198,782</div>
                <v-chart :options="searchNumberOption" />
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" width="180" />
                <el-table-column prop="keyword" label="关键词" width="200" />
                <el-table-column prop="count" label="搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
              </el-table>
              <el-pagination layout="prev, pager, next" :total="100" :page-size="4" background @current-change="onPageChange" />
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
              <el-radio-group v-model="radioSelect" size="small">
                <el-radio-button label="category">品类</el-radio-button>
                <el-radio-button label="commodity">商品</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <v-chart :options="categoryOption" />
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomView',
  data () {
    return {
      radioSelect: 'category',
      searchUsersOption: {},
      searchNumberOption: {},
      tableData: [
        { id: 1, rank: 1, keyword: '北京', count: 100, users: 90, range: '90%' },
        { id: 2, rank: 2, keyword: '上海', count: 100, users: 90, range: '90%' },
        { id: 3, rank: 3, keyword: '广州', count: 100, users: 90, range: '90%' },
        { id: 4, rank: 4, keyword: '深圳', count: 100, users: 90, range: '90%' }
      ],
      categoryOption: {}
    }
  },
  mounted () {
    this.searchUsersOption = this.getSearchOption();
    this.searchNumberOption = this.getSearchOption();
  },
  methods: {
    getSearchOption () {
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            data: [100, 200, 150, 210, 160, 120, 50, 200, 130],
            areaStyle: {
              color: 'rgba(95,187,255,.5)'
            },
            lineStyle: {
              color: 'rgba(95,187,255)'
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
    onPageChange (page) {
      console.log('onPageChange -> page', page)
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
