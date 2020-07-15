<template>
  <common-card title="今日交易用户数" value="56,790">
    <template>
      <v-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>退货率</span>
      <span class="emphasis">5.82%</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins';
export default {
  name: 'TodayUsers',
  mixins: [commonCardMixins],
  methods: {
    getOptions () {
      return {
        xAxis: {
          type: 'category',
          show: false,
          data: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        },
        yAxis: {
          show: false
        },
        tooltip: {
          formatter (params) {
            return `${params.name}<br>直接访问：${params.value}`;
          }
        },
        series: [
          {
            type: 'bar',
            data: [234, 435, 290, 403, 340, 240, 432, 179, 502, 450, 502, 320, 128, 308, 340, 202],
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
