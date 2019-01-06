<template>
  <svg width="1000" height="1000">
    <connection-lines-container :lines="lines"></connection-lines-container>
  </svg>
</template>

<script>
import ConnectionLinesContainer from "./ConnectionLinesContainer";
export default {
  components: {
    ConnectionLinesContainer
  },
  data: function() {
    return {
      lines: [
        { source: { x: 0, y: 0 }, target: { x: -150, y: 300 } },
        { source: { x: 0, y: 0 }, target: { x: 150, y: 300 } },
        { source: { x: -150, y: 300 }, target: { x: -450, y: 600 } },
        { source: { x: -150, y: 300 }, target: { x: -150, y: 600 } },
        { source: { x: -150, y: 300 }, target: { x: 150, y: 600 } }
      ]
    };
  }
};
</script>