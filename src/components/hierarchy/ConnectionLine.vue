<template>
  <path
    class="link"
    :d="lineValue"
    marker-end="url(#point-in-line)"
    marker-start="url(#point-in-line)"
  ></path>
</template>

<script>
import { linkVertical } from "d3-shape";
export default {
  props: {
    source: Object,
    target: Object
  },
  computed: {
    lineValue: function() {
      return linkVertical()
        .x(d => d.x)
        .y(d => d.y)({ source: this.source, target: this.target });
    }
  }
};
</script>

<style scoped>
.link {
  fill: none;
  stroke: silver;
  stroke-width: 2px;
}
</style>
