<template>
  <common-card title="累计订单量" :value="orderToday">
    <template>
      <v-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>昨日订单量</span>
      <span class="emphasis">{{orderLastDay}}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins';
import commonDataMixins from '@/mixins/commonDataMixins';
export default {
  name: 'TotalOrders',
  mixins: [commonCardMixins, commonDataMixins],
  methods: {
    getOptions () {
      return this.orderTrend.length > 0 ? {
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false // 默认为 true，表示距离 x 轴两侧有一定距离
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            data: this.orderTrend,
            areaStyle: {
              color: 'purple'
            },
            lineStyle: {
              width: 0
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
      } : null;
    }
  }
}
</script>
