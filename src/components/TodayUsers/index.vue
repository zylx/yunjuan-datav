<template>
  <common-card title="今日交易用户数" :value="orderUser">
    <template>
      <v-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>退货率</span>
      <span class="emphasis">{{returnRate}}</span>
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
          type: 'category',
          show: false,
          data: this.orderUserTrendAxis
        },
        yAxis: {
          show: false
        },
        tooltip: {
          formatter (params) {
            return `${params.name}<br>${params.marker}用户交易量：${params.value}`;
          }
        },
        series: [
          {
            type: 'bar',
            data: this.orderUserTrend,
            barWidth: '60%',
            itemStyle: {
              color: '#3398DB'
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
