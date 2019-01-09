<template>
  <v-content>
    <v-toolbar flat color="transparent" absolute light>
      <v-flex xs3>
        <v-select
          v-model="select"
          v-on:change="change"
          :items="itemsSelect"
          item-text="state"
          item-value="abbr"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-flex>
      <v-spacer></v-spacer>
      <v-slider
        style="max-width:100px"
        :max="max"
        :min="min"
        color="grey"
        v-model="zoom"
        hide-details
      ></v-slider>
      <v-btn icon>
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_horiz</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fullScreen">
        <v-icon>fullscreen</v-icon>
      </v-btn>
    </v-toolbar>
    <slot></slot>
    <v-navigation-drawer v-model="drawer" fixed app clipped right width="400">
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-action>
            <v-btn icon @click.stop="drawer = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Modal for structure</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <BranchForm :node-data-detail="nodeDataDetail" v-if="selectValue === 1"/>
        <CorporateForm :node-data-detail="nodeDataDetail" v-if="selectValue === 2"/>
        <DepartmentForm :node-data-detail="nodeDataDetail" v-if="selectValue === 3"/>
      </v-list>
    </v-navigation-drawer>
    <HierarchyContainer
      :openModal="openModal"
      @emitOrgChartWrapper="receiveEmitNodeData"
      :data-for-hierarchy="dataForHierarchy"
      :mouseWheel="mouseWheel"
      :scale="scale"
    />
  </v-content>
</template>
<script>
import BranchForm from "../components/forms/BranchForm";
import CorporateForm from "../components/forms/CorporateForm";
import DepartmentForm from "../components/forms/DepartmentForm";
import HierarchyContainer from "./hierarchy/HierarchyContainer";
import { dataForTesting } from "../FakeDataForTesting";
import { scaleValue, zoomValue } from "../config";

export default {
  components: {
    HierarchyContainer,
    CorporateForm,
    DepartmentForm,
    BranchForm
  },
  watch: {
    zoom: function() {
      this.zoomSlider();
    }
  },
  mounted() {
    this.$http.get(this.apiEndPoints.loadHierarchyData).then(function() {
      console.log("11111111111111111");
    });
  },
  props: {
    scaleValue: { type: Number, default: scaleValue },
    zoomValue: { type: Number, default: zoomValue },
    dataForHierarchy: {
      type: Object,
      default: () => dataForTesting
    },
    apiEndPoints: Object
  },
  methods: {
    change: function(e) {
      if (e.abbr === "bra") {
        this.selectValue = 1;
      }
      if (e.abbr === "cor") {
        this.selectValue = 2;
      }
      if (e.abbr === "dep") {
        this.selectValue = 3;
      }
    },
    fullScreen: function() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    },
    mouseWheel: function(e) {
      var delta = (e.deltaY + 50) * (3 / 2 / 150);
      this.scale -= delta * (3 / 2 / 150);
      this.zoom -= delta * (this.scale + 1);
    },
    zoomSlider: function() {
      const zoom = this.zoom;
      return (this.scale = zoom * (3 / 2 / 150));
    },
    receiveEmitNodeData: function(event) {
      this.nodeDataDetail = event;
    },
    openModal: function() {
      this.drawer = true;
    }
  },
  data: () => ({
    drawer: false,
    scale: scaleValue,
    nodeDataDetail: null,
    min: 13,
    selectValue: 1,
    max: 100,
    zoom: zoomValue,
    select: { state: "Branch Structure", abbr: "bra" },
    itemsSelect: [
      { state: "Branch Structure", abbr: "bra" },
      { state: "Corporate Structure", abbr: "cor" },
      { state: "Department Structure", abbr: "dep" }
    ]
  })
};
</script>

<style>
.button {
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 10px;
  border-radius: 5px;
}
</style>
