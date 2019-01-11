<template>
  <v-content>
    <v-toolbar flat color="transparent" absolute light>
      <v-flex xs3>
        <v-select
          v-model="select"
          v-on:change="changeDropdownOrgChart"
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
      <v-btn @click="openModal" icon>
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
        <BranchForm
          :close-modal="closeModal"
          :node-data-detail="nodeDataDetail"
          v-if="select.value === 1"
        />
        <CorporateForm
          :close-modal="closeModal"
          :node-data-detail="nodeDataDetail"
          v-if="select.value === 2"
        />
        <DepartmentForm
          :close-modal="closeModal"
          :node-data-detail="nodeDataDetail"
          v-if="select.value === 3"
        />
        <BoardStructureForm
          :close-modal="closeModal"
          :node-data-detail="nodeDataDetail"
          v-if="select.value === 4"
        />
      </v-list>
    </v-navigation-drawer>
    <HierarchyContainer
      v-if="!!dataForHierarchy"
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
import BoardStructureForm from "../components/forms/BoardStructureForm";
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
    BranchForm,
    BoardStructureForm
  },
  watch: {
    zoom: function() {
      this.zoomSlider();
    }
  },
  mounted() {
    const typeId = this.select.value;
    this.getAndShowData(typeId);
  },
  props: {
    scaleValue: { type: Number, default: scaleValue },
    zoomValue: { type: Number, default: zoomValue },
    apiEndPoints: Object
  },
  methods: {
    getAndShowData(typeId) {
      this.$http
        .get(`${this.apiEndPoints.loadHierarchyData}/${typeId}`)
        .then(res => {
          this.dataForHierarchy = res.data;
        });
    },
    changeDropdownOrgChart: function(e) {
      const typeId = e.value;
      this.getAndShowData(typeId);
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
    },
    closeModal: function() {
      this.drawer = false;
    }
  },
  data: () => ({
    dataForHierarchy: null,
    drawer: false,
    scale: scaleValue,
    nodeDataDetail: null,
    min: 13,
    max: 100,
    zoom: zoomValue,
    select: { state: "Branch Structure", value: 1 },
    itemsSelect: [
      { state: "Branch Structure", value: 1 },
      { state: "Board Structure", value: 4 },
      { state: "Corporate Structure", value: 2 },
      { state: "Department Structure", value: 3 }
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
