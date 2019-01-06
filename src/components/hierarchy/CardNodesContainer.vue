<template>
  <div class="nodes-container">
    <div v-for="node in nodes" :key="node.id">
      <component v-bind:is="nodeTemplate" :nodeData="node"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nodes: Array,
    nodeTemplate: Object,
    nodeWidth: {
      type: Number,
      default: 300
    },
    nodeHeight: {
      type: Number,
      default: 300
    }
  }
};
</script>

<style scoped>
.nodes-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 1000px;
  height: 1000px;
}
</style>
