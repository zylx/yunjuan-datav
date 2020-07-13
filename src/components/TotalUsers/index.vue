<template>
  <common-card title="累计用户数" value="1，201,871">
    <template>
      <div class="compare"></div>
    </template>
    <template v-slot:footer>
      <div>
        <span>日同比</span>
        <span class="money">5.82%</span>
        <span>月同比</span>
        <span class="money">32.45%</span>
      </div>
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
span {
  font-size: 12px;
}
.money {
  margin-left: 5px;
  color: #333;
  font-weight: 700;
}
</style>
