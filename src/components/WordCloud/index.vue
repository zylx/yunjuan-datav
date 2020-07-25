<template>
  <ve-wordcloud :data="chartData" :settings="chartSettings" height="100%" />
</template>

<script>
import commonDataMixins from '@/mixins/commonDataMixins';
export default {
  name: 'WoedCloud',
  mixins: [commonDataMixins],
  data () {
    return {
      chartData: {},
      chartSettings: {
        color: [
          'rgba(97, 216, 0, 0.7)',
          'rgba(204, 178, 26, 0.7)',
          'rgba(245, 166, 35, 0.7)',
          'rgba(156, 13, 113, 0.7)'
        ]
      }
    }
  },
  watch: {
    wordCLoud () {
      this.chartData = this.getChartData();
    }
  },
  methods: {
    getChartData () {
      const wordCloudRows = [];
      if (this.wordCLoud.length > 0) {
        this.wordCLoud.forEach((item) => {
          wordCloudRows.push({
            name: item.word,
            value: item.count
          });
        })
      }
      return {
        columns: ['name', 'value'],
        rows: wordCloudRows
      }
    }
  }
}
</script>
