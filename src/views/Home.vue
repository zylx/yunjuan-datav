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
