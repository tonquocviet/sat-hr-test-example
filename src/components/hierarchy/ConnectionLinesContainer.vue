<template>
  <svg :width="containerProperties.wrapperWidth" :height="containerProperties.wrapperHeight">
    <g class="drawarea" :transform="transformValue">
      <connection-line v-for="(line, key) in computedLines" :key="key" v-bind="line"></connection-line>
    </g>
  </svg>
</template>

<script>
import ConnectionLine from "./ConnectionLine";
import { nodeHeight } from "../../config";
export default {
  components: {
    ConnectionLine
  },
  props: {
    lines: Array,
    height: {
      type: Number,
      default: nodeHeight
    },
    containerProperties: Object
  },
  computed: {
    computedLines: function() {
      return this.lines.map(x => ({
        source: { ...x.source, y: x.source.y + this.height / 2 },
        target: { ...x.target, y: x.target.y - this.height / 2 }
      }));
    },
    transformValue: function() {
      return `translate(${this.containerProperties.translateX},${
        this.containerProperties.translateY
      }) scale(1)`;
    }
  }
};
</script>