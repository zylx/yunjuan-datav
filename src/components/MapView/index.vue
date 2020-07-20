<template>
  <div class="map-view">
    <div class="left">
      <b-map-scatter />
    </div>
    <div class="right">
      <el-card shadow="hover">
        <template slot="header">
          <div class="title-wrapper">用户月同比增长</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <liquid-fill />
          </div>
        </template>
      </el-card>
      <el-card shadow="hover">
        <template slot="header">
          <div class="title-wrapper">热门搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <word-cloud />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import BMapScatter from '@/components/BMapScatter'
import LiquidFill from '@/components/LiquidFill'
import WordCloud from '@/components/WordCloud'
export default {
  name: 'MapView',
  components: {
    BMapScatter,
    LiquidFill,
    WordCloud
  }
};
</script>

<style lang="scss" scoped>
.map-view {
  display: flex;
  margin-top: 20px;
  .left {
    flex: 0 0 80%;
    width: 80%;
    height: 600px;
    background-color: #fff;
    // .ve-bmap {
    //   .anchorBL {
    //     display: none;
    //   }
    // }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20px;
    .title-wrapper {
      display: flex;
      align-items: center;
      height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid #e6e6e6;
      font-size: 14px;
      font-weight: 500;
    }
    .chart-wrapper{
      width: 100%;
      height: 200px;
    }
  }
}
</style>
