<template>
  <ve-wordcloud :data="chartData" :settings="chartSettings" height="100%" />
</template>

<script>
export default {
  name: 'WoedCloud',
  data () {
    return {
      chartData: {},
      chartSettings: {}
    }
  },
  mounted () {
    this.chartData = this.getChartData();
    this.chartSettings = { color: ['rgba(97, 216, 0, 0.7)', 'rgba(204, 178, 26, 0.7)', 'rgba(245, 166, 35, 0.7)', 'rgba(156, 13, 113, 0.7)'] };
  },
  methods: {
    getChartData () {
      return {
        columns: ['name', 'value'],
        rows: [
          {
            name: '云卷花生',
            value: 100
          },
          {
            name: '云卷芝麻',
            value: 60
          },
          {
            name: '云卷碎米花',
            value: 82
          },
          {
            name: '云卷红豆',
            value: 36
          },
          {
            name: '云卷绿豆',
            value: 54
          },
          {
            name: '云卷花瓣',
            value: 118
          }
        ]
      }
    }
  }
}
</script>
