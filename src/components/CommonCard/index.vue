<template>
  <div class="common-card">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div class="chart">
      <slot></slot>
    </div>
    <div class="line" />
    <div class="total">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonCard',
  props: {
    title: String,
    value: String
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  color: #999;
}
.value {
  font-size: 25px;
  color: #000;
  margin-top: 5px;
  letter-spacing: 1px;
}
.chart {
  height: 50px;
}
.line {
  margin: 10px;
  border-top: 1px solid #eee;
}
.total {
  font-size: 12px;
  color: #666;
}
</style>

<style lang="scss">
.emphasis {
  margin-left: 10px;
  color: #333;
  font-weight: 700;
}

.increase {
  width: 0;
  height: 0;
  margin: 0 0 3px 5px;
  border-style: solid;
  border-width: 3px;
  border-color: transparent transparent red transparent;
}

.decrease {
  width: 0;
  height: 0;
  margin: 3px 0 0 5px;
  border-style: solid;
  border-width: 3px;
  border-color: green transparent transparent transparent;
}
</style>
