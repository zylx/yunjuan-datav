<template>
  <ve-liquidfill :data="chartData" :settings="chartSettings" height="100%" />
</template>

<script>
import commonDataMixins from '@/mixins/commonDataMixins';
export default {
  name: 'LiquidFill',
  mixins: [commonDataMixins],
  data () {
    return {
      chartData: {},
      chartSettings: {}
    }
  },
  watch: {
    userGrowthLastMonth () {
      this.chartData = this.getChartData();
      this.chartSettings = this.getChartSettings();
    }
  },
  methods: {
    getChartData () {
      return {
        columns: ['title', 'percent'],
        rows: [{
          title: 'rate',
          percent: parseFloat(this.userGrowthLastMonth) / 100
        }]
      }
    },
    getChartSettings () {
      return {
        seriesMap: {
          rate: {
            radius: '80%',
            label: {
              normal: {
                formatter: (param) => {
                  return `${(param.value * 100).toFixed(2)}%`;
                },
                textStyle: {
                  fontSize: 36,
                  color: '#999',
                  fontWeight: 'normal'
                },
                position: ['50%', '50%'],
                insideColor: '#fff'
              }
            },
            tooltip: {
              formatter: (param) => {
                return `${param.marker}月同比增长：${(param.value * 100).toFixed(2)}%`;
              },
              position: 'inside'
            },
            outline: {
              itemStyle: {
                borderColor: '#aaa4a4',
                borderWidth: 1,
                color: 'none',
                shadowBlur: 0,
                shadowColor: '#fff'
              },
              borderDistance: 0
            },
            backgroundStyle: '#fff',
            itemStyle: {
              shadowBlur: 0,
              shadowColor: '#fff'
            },
            amplitude: 8,
            color: [this.getColor(this.chartData.rows[0].percent)]
          }
        }
      }
    },
    getColor (value) {
      return value > 0 && value <= 0.5 ? 'rgba(97, 216, 0, 0.7)'
        : value > 0.5 && value <= 0.8 ? 'rgba(204, 178, 26, 0.7)'
          : value > 0.8 ? 'rgba(241, 47, 28, 0.7)' : '#c7c7cb';
    }
  }
}
</script>
