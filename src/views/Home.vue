<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
import TopView from '@/components/TopView';
import SalesView from '@/components/SalesView';
import MapView from '@/components/MapView';
import BottomView from '@/components/BottomView';
export default {
  name: 'Home',
  components: {
    TopView,
    SalesView,
    MapView,
    BottomView
  },
  data () {
    return {
      mapData: {},
      reportData: {},
      wordCloud: {}
    }
  },
  provide () {
    return {
      getMapData: () => this.mapData,
      getReportData: () => this.reportData,
      getWordCloud: () => this.wordCloud
    }
  },
  mounted () {
    this.$services.mapData()
      .then((res) => {
        this.mapData = res;
      })
      .catch((error) => {
        console.log(error);
      });
    this.$services.reportData()
      .then((res) => {
        this.reportData = res;
      })
      .catch((error) => {
        console.log(error);
      });
    this.$services.wordCloud()
      .then((res) => {
        this.wordCloud = res;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss">
.home {
  width: 100%;
  padding: 20px;
  background-color: #eee;
  box-sizing: border-box;
}
</style>
