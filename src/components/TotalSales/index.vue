<template>
  <common-card title="累计销售额" value="￥ 23,333,678">
    <template>
      <div class="compare"></div>
    </template>
    <template v-slot:footer>
      <div>
        <span>昨日销售额</span>
        <span class="money">￥ 3000,000,000</span>
      </div>
    </template>
  </common-card>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins';
export default {
  name: 'TotalSales',
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
