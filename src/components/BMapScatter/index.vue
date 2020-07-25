<template>
  <ve-bmap :title="title" :tooltip="tooltip" :settings="chartSettings" :series="chartSeries" height="100%" />
</template>

<script>
import commonDataMixins from '@/mixins/commonDataMixins';
export default {
  name: 'BMap',
  mixins: [commonDataMixins],
  data () {
    return {
      key: 'dPmcgWMkLAITfZxax3N8uOTZrYkW4uij',
      center: [104.114129, 37.550339],
      title: {
        text: '云卷食品全国销量数据展示',
        subtext: '销售趋势统计',
        sublink: '',
        top: 30,
        left: 'center'
      },
      chartSettings: {},
      tooltip: {},
      chartSeries: [],
      mapStyle: {
        styleJson: [{
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        }, {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            color: '#f3f3f3'
          }
        }, {
          featureType: 'railway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        }, {
          featureType: 'highway',
          elementType: 'all',
          stylers: {
            color: '#fdfdfd'
          }
        }, {
          featureType: 'highway',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        }, {
          featureType: 'arterial',
          elementType: 'geometry',
          stylers: {
            color: '#fefefe'
          }
        }, {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#fefefe'
          }
        }, {
          featureType: 'poi',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        }, {
          featureType: 'green',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        }, {
          featureType: 'subway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        }, {
          featureType: 'manmade',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        }, {
          featureType: 'local',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        }, {
          featureType: 'arterial',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        }, {
          featureType: 'boundary',
          elementType: 'all',
          stylers: {
            color: '#fefefe'
          }
        }, {
          featureType: 'building',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        }, {
          featureType: 'label',
          elementType: 'labels.text.fill',
          stylers: {
            color: '#999999'
          }
        }]
      }
    }
  },
  mounted () {
    this.chartSettings = this.getChartSettings(this.key, this.center);
  },
  watch: {
    mapData () {
      this.chartSeries = this.getChartSeries();
      this.chartSeries = this.getChartSeries();
    }
  },
  methods: {
    convertData (data) {
      const res = [];
      const geoCoordMap = this.mapData.geo;
      data.forEach((item) => {
        const { name, value } = item;
        const geoCoord = geoCoordMap[name];
        if (geoCoord) {
          res.push({
            name,
            value: [...geoCoord, value]
          });
        }
      })
      return res;
    },
    getChartSettings (key, center) {
      return {
        bmap: {
          key,
          center,
          zoom: 5,
          roam: false,
          mapStyle: this.mapStyle
        }
      }
    },
    getChartSeries () {
      const valueData = this.mapData.data;
      return [{
        name: '销售额',
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: this.convertData(valueData),
        encode: {
          value: 2
        },
        itemStyle: {
          color: 'purple'
        },
        symbelSize: function (val) {
          return val[2] / 10;
        },
        label: {
          show: false,
          position: 'right',
          formatter: function (v) {
            return `${v.data.name} - ${v.data.value[2]}`;
          }
        },
        emphasis: {
          label: {
            show: false // 鼠标 hover 呈现 label
          }
        }
      }, {
        name: 'TOP 10',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: this.convertData(valueData.sort((a, b) => {
          return b.value - a.value;
        }).slice(0, 10)),
        encode: {
          value: 2
        },
        symbelSize: function (val) {
          return val[2] / 10;
        },
        hoverAnimation: true,
        rippleEffect: {
          brushType: 'stroke' // 波纹样式
        },
        itemStyle: {
          color: 'purple',
          shadowBlur: 10,
          shadowColor: '#333'
        },
        zlevel: 1
      }];
    }
  }
}
</script>
