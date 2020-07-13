<template>
  <common-card title="累计订单量" value="257,678">
    <template>
      <div class="compare"></div>
    </template>
    <template v-slot:footer>
      <div>
        <span>昨日订单量</span>
        <span class="money">￥ 2,000,000</span>
      </div>
    </template>
  </common-card>
</template>

<script>
import commonCardMixins from '@/mixins/commonCardMixins';
export default {
  name: 'TotalOrders',
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
