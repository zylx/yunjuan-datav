<template>
  <common-card title="今日交易用户数" value="56,790">
    <template>
      <div class="compare"></div>
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
  mixins: [commonCardMixins]
};
</script>

<style lang="scss" scoped>
.compare {
  height: 100%;
  background-color: yellow;
}
</style>
