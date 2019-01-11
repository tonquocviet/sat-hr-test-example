<template>
  <div @mousewheel="mouseWheel" v-dragscroll class="hierarchy-scrollable">
    <div class="hierarchy-container" :style="containerStyle">
      <card-nodes-container
        :nodes="nodes"
        :node-template="nodeTemplate"
        :containerProperties="containerProperties"
        @emitHierarchy="receiveEmitNodeData"
      />
      <connection-lines-container :lines="lines" :containerProperties="containerProperties"></connection-lines-container>
    </div>
  </div>
</template>

<script>
import ConnectionLinesContainer from "./ConnectionLinesContainer";
import CardNodesContainer from "./CardNodesContainer";
import NodeCard from "../cards/NodeCard";
import { hierarchy, tree } from "d3-hierarchy";
import {
  nodeWidth,
  nodeHeight,
  defaultNodeDensityX,
  defaultNodeDensityY
} from "../../config";
import { dragscroll } from "vue-dragscroll";

export default {
  components: {
    ConnectionLinesContainer,
    CardNodesContainer
  },
  directives: {
    dragscroll
  },
  props: {
    mouseWheel: Function,
    scale: Number,
    nodeWidth: { type: Number, default: nodeWidth },
    nodeHeight: { type: Number, default: nodeHeight },
    nodeDensityX: { type: Number, default: defaultNodeDensityX },
    nodeDensityY: { type: Number, default: defaultNodeDensityY },
    dataForHierarchy: Object
  },
  data: function() {
    return {
      nodeTemplate: NodeCard
    };
  },
  methods: {
    toD3Hierarchy: function(treeData) {
      let root = hierarchy(treeData);
      let treeLayout = tree();
      treeLayout.nodeSize([
        this.nodeWidth * this.nodeDensityX,
        this.nodeHeight * this.nodeDensityY
      ]);
      treeLayout(root);
      return root;
    },
    receiveEmitNodeData: function(event) {
      this.nodeDataDetail = event;
      this.$emit("emitOrgChartWrapper", this.nodeDataDetail);
    }
  },
  computed: {
    lines: function() {
      let root = this.toD3Hierarchy(this.dataForHierarchy);
      return root.links().map(x => ({
        source: { x: x.source.x, y: x.source.y },
        target: { x: x.target.x, y: x.target.y }
      }));
    },
    nodes: function() {
      let root = this.toD3Hierarchy(this.dataForHierarchy);
      return root
        .descendants()
        .map(x => ({ x: x.x, y: x.y, nodeData: x.data }));
    },
    containerProperties: function() {
      let root = this.toD3Hierarchy(this.dataForHierarchy);
      let nodes = root.descendants().map(x => ({ x: x.x, y: x.y }));
      let translateX = (Math.min(...nodes.map(x => x.x)) - 200) * -1;
      let translateY = (Math.min(...nodes.map(x => x.y)) - 150) * -1;
      return {
        translateX,
        translateY,
        wrapperWidth: translateX + Math.max(...nodes.map(x => x.x)) + 200,
        wrapperHeight: translateY + Math.max(...nodes.map(x => x.y)) + 150
      };
    },
    containerStyle: function() {
      return {
        transform: `scale(${this.scale})`,
        transformOrigin: "0 0",
        width: this.containerProperties.wrapperWidth,
        height: this.containerProperties.wrapperHeight
      };
    }
  }
};
</script>

<style scoped>
.hierarchy-container {
  display: block;
  position: absolute;
}
.hierarchy-scrollable {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
