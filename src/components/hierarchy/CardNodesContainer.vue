<template>
  <div class="nodes-container" :style="{transform:transformValue}">
    <div
      class="node-wrapper"
      v-bind:style="wrapperPosition(node)"
      v-for="node in nodes"
      :key="node.id"
    >
      <component
        @emitCardNodeContainer="receiveEmitNodeData"
        @collapseOrExpandNode="collapseOrExpandNode"
        v-bind:is="nodeTemplate"
        :nodeData="node.nodeData"
        :typeId="typeId"
      />
    </div>
  </div>
</template>

<script>
import { nodeWidth, nodeHeight } from "../../config";
export default {
  props: {
    nodes: Array,
    typeId: Number,
    nodeTemplate: Object,
    nodeWidth: {
      type: Number,
      default: nodeWidth
    },
    nodeHeight: {
      type: Number,
      default: nodeHeight
    },
    containerProperties: {
      type: Object
    }
  },
  methods: {
    wrapperPosition: function(node) {
      return {
        top: node.y - this.nodeHeight / 2 + "px",
        left: node.x - this.nodeWidth / 2 + "px",
        width: this.nodeWidth + "px",
        height: this.nodeHeight + "px"
      };
    },
    receiveEmitNodeData: function(event) {
      this.nodeDataDetail = event;
      this.$emit("emitHierarchy", this.nodeDataDetail);
    },
    collapseOrExpandNode: function(eventArgs) {
      this.$emit("collapseOrExpandNode", eventArgs);
    }
  },
  computed: {
    transformValue: function() {
      return `translate(${this.containerProperties.translateX}px,${
        this.containerProperties.translateY
      }px)`;
    }
  }
};
</script>

<style scoped>
.nodes-container {
  position: absolute;
}
.node-wrapper {
  position: absolute;
}
</style>
