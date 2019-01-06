<template>
  <g class="drawarea" transform="translate(0,0) scale(1)">
    <connection-line v-for="(line, key) in computedLines" :key="key" v-bind="line"/>
  </g>
</template>

<script>
import ConnectionLine from "./ConnectionLine";
export default {
  components: {
    ConnectionLine
  },
  props: {
    lines: Array,
    height: {
      type: Number,
      default: 300
    }
  },
  computed: {
    computedLines: function() {
      return this.lines.map(x => ({
        source: { ...x.source, y: x.source.y + this.height / 4 },
        target: { ...x.target, y: x.target.y - this.height / 4 }
      }));
    }
  }
};
</script>