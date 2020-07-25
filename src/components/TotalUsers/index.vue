<template>
  <common-card title="累计用户数" :value="userToday">
    <template>
      <v-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis">{{userGrowthLastDay}}</span>
        <div class="increase"></div>
        <span class="month">月同比</span>
        <span class="emphasis">{{userGrowthLastMonth}}</span>
        <div class="decrease"></div>
      </div>
    </template>
  </common-card>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins';
import commonDataMixins from '@/mixins/commonDataMixins';
export default {
  name: 'TodayUsers',
  mixins: [commonCardMixins, commonDataMixins],
  methods: {
    getOptions () {
      return {
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        series: [
          {
            name: '今日平台用户',
            type: 'bar',
            stack: 'total',
            data: [this.userTodayNumber],
            barWidth: '15%',
            itemStyle: {
              color: '#45c946'
            }
          },
          {
            name: '上月平台用户',
            type: 'bar',
            stack: 'total',
            data: [this.userLastMonth],
            itemStyle: {
              color: '#eee'
            }
          },
          {
            type: 'custom',
            stack: 'total',
            data: [this.userTodayNumber],
            renderItem: (params, api) => {
              const value = api.value(0); // 取出当前 dataItem 中第一个维度的数值
              const endPoint = api.coord([value, 0])
              return {
                type: 'group',
                position: endPoint,
                children: [
                  {
                    type: 'path',
                    shape: {
                      d: 'M1024 255.996 511.971 767.909 0 258.996 1024 255.996z',
                      x: -5,
                      y: -20,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                      // 'center'：保持原来的 PathData 的长宽比，居于矩形中，尽可能撑大但不会超出矩形。
                      // 'cover'：PathData 拉伸为矩形的长宽比，完全填满矩形，不会超出矩形。
                    },
                    style: {
                      fill: '#45c946'
                    }
                  },
                  {
                    type: 'path',
                    shape: {
                      d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                      x: -5,
                      y: 10,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#45c946'
                    }
                  }
                ]

              }
            }
          }
        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.total-users-footer {
  display: flex;
  align-items: center;
  .month {
    margin-left: 20px;
  }
}
</style>
