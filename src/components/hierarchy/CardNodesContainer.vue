<template>
  <div class="nodes-container"></div>
</template>

<script>
export default {
  props: {
    nodes: Array
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
