<template>
  <common-card title="累计用户数" value="1,201,871">
    <template>
      <div class="compare"></div>
    </template>
    <template v-slot:footer>
      <span>日同比</span>
      <span class="emphasis">5.82%</span>
      <span>月同比</span>
      <span class="emphasis">32.45%</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins';
export default {
  name: 'TodayUsers',
  mixins: [commonCardMixins]
};
</script>

<style lang="scss" scoped>
.compare {
  height: 100%;
  background-color: yellow;
}
</style>
