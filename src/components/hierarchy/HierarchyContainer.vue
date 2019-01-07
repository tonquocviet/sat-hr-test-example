<template>
  <div @mousewheel="mouseWheel" v-dragscroll class="hierarchy-scrollable">
    <div class="hierarchy-container" :style="containerStyle">
      <card-nodes-container
        :nodes="nodes"
        :node-template="nodeTemplate"
        :containerProperties="containerProperties"
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
var dataForTesting = {
  name: "A1",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          value: 100
        },
        {
          name: "C2",
          value: 300
        },
        {
          name: "C3",
          value: 200
        }
      ]
    },
    {
      name: "B2",
      value: 200,
      children: [
        {
          name: "T1",
          value: 100
        },
        {
          name: "T2",
          value: 300
        },
        {
          name: "T3",
          value: 200,
          children: [
            {
              name: "X1",
              value: 100
            },
            {
              name: "X2",
              value: 300
            },
            {
              name: "X3",
              value: 200
            }
          ]
        }
      ]
    }
  ]
};
export default {
  components: {
    ConnectionLinesContainer,
    CardNodesContainer,
    NodeCard
  },
  directives: {
    dragscroll
  },
  props: {
    mouseWheel: {
      default: () => mouseWheel
    },
    scale: Number,
    nodeWidth: { type: Number, default: nodeWidth },
    nodeHeight: { type: Number, default: nodeHeight },
    nodeDensityX: { type: Number, default: defaultNodeDensityX },
    nodeDensityY: { type: Number, default: defaultNodeDensityY },
    dataForHierarchy: {
      type: Object,
      default: () => dataForTesting
    }
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
      return root.descendants().map(x => ({ x: x.x, y: x.y }));
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
