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
        :step="0.05"
        color="grey"
        v-model="scale"
        hide-details
      ></v-slider>
      <v-btn icon @click.stop="showFormAddNew">
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
    <v-navigation-drawer :value="drawer" fixed app clipped right width="400">
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-action>
            <v-btn icon @click.stop="closeModal">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{select.slideInfo}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-container v-if="isLoadingDetails">
          <v-progress-circular :width="3" indeterminate></v-progress-circular>
        </v-container>
        <template v-if="!isLoadingDetails && !!nodeDataDetail">
          <BranchForm
            @closeModal="closeModal"
            @saveDetails="saveBranch"
            :node-data-detail="nodeDataDetail"
            v-if="select.value === 1"
            :apiEndPoints="apiEndPoints"
          />
          <CorporateForm
            @closeModal="closeModal"
            @saveDetails="saveCorporateDetails"
            :node-data-detail="nodeDataDetail"
            v-if="select.value === 2"
            :apiEndPoints="apiEndPoints"
          />
          <DepartmentForm
            @closeModal="closeModal"
            @saveDetails="saveDepartmentDetails"
            :node-data-detail="nodeDataDetail"
            v-if="select.value === 3"
            :apiEndPoints="apiEndPoints"
          />
          <BoardStructureForm
            @closeModal="closeModal"
            :node-data-detail="nodeDataDetail"
            @saveDetails="saveBoardDetails"
            v-if="select.value === 4"
            :apiEndPoints="apiEndPoints"
          />
        </template>
      </v-list>
    </v-navigation-drawer>
    <HierarchyContainer
      v-if="!!dataForHierarchy"
      @emitOrgChartWrapper="receiveEmitNodeData"
      @collapseOrExpandNode="collapseOrExpandNode"
      :data-for-hierarchy="dataForHierarchy"
      :mouseWheel="mouseWheel"
      :scale="scale"
      :typeId="select.value"
    />
  </v-content>
</template>
<script>
import BranchForm from "../components/forms/BranchForm";
import BoardStructureForm from "../components/forms/BoardStructureForm";
import CorporateForm from "../components/forms/CorporateForm";
import DepartmentForm from "../components/forms/DepartmentForm";
import HierarchyContainer from "./hierarchy/HierarchyContainer";
import { scaleValue } from "../config";

function inactiveAllNodes(node) {
  node.isActive = false;
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      inactiveAllNodes(node.children[i]);
    }
  }
}

function collapseAllNodes(node) {
  node.isCollapse = true;
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      collapseAllNodes(node.children[i]);
    }
  }
}

function expandFirst3Levels(node, level) {
  if (level == 2) return;
  node.isCollapse = false;
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      expandFirst3Levels(node.children[i], level + 1);
    }
  }
}

function mapCollapseExpandStatus(target, source) {
  if (!target || !source) return;
  target.isCollapse = source.isCollapse;
  if (target.children && source.children) {
    for (let i = 0; i < target.children.length; i++) {
      mapCollapseExpandStatus(
        target.children[i],
        source.children.filter(x => x.id === target.children[i].id)[0]
      );
    }
  }
}

export default {
  components: {
    HierarchyContainer,
    CorporateForm,
    DepartmentForm,
    BranchForm,
    BoardStructureForm
  },
  mounted() {
    const typeId = this.select.value;
    this.getAndShowData(typeId);
  },
  props: {
    apiEndPoints: Object
  },
  methods: {
    getAndShowData(typeId, resetCollapseExpandLevel) {
      this.$http
        .get(`${this.apiEndPoints.loadHierarchyData}/${typeId}`)
        .then(res => {
          this.closeModal();
          inactiveAllNodes(res.data);
          collapseAllNodes(res.data);
          if (resetCollapseExpandLevel || !this.dataForHierarchy) {
            expandFirst3Levels(res.data, 0);
          } else {
            mapCollapseExpandStatus(res.data, this.dataForHierarchy);
          }
          this.dataForHierarchy = res.data;
        });
    },
    changeDropdownOrgChart: function(e) {
      this.closeModal();
      const typeId = e.value;
      this.getAndShowData(typeId, true);
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
      let delta = e.deltaY;
      delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency
      this.scale -= delta * 0.05;
    },
    receiveEmitNodeData: function(event) {
      inactiveAllNodes(this.dataForHierarchy);
      event.isActive = true;

      this.isLoadingDetails = true;
      this.nodeDataDetail = this.nodeDataDetail || {};
      this.$http
        .get(`${this.apiEndPoints.loadStructureDetails}/${event.id}`)
        .then(res => {
          this.nodeDataDetail = res.data;
          this.isLoadingDetails = false;
        });
    },
    saveBranch: function(object) {
      this.saveDetails(object, "branch");
    },
    saveCorporateDetails: function(object) {
      this.saveDetails(object, "corporate");
    },
    saveDepartmentDetails: function(object) {
      this.saveDetails(object, "department");
    },
    saveBoardDetails: function(object) {
      this.saveDetails(object, "board");
    },
    saveDetails: function(object, type) {
      this.$http
        .post(`${this.apiEndPoints.updateStructure}`, {
          object,
          type
        })
        .then(() => {
          this.closeModal();
          this.getAndShowData(this.select.value);
        });
    },
    closeModal: function() {
      this.nodeDataDetail = null;
    },
    showFormAddNew: function() {
      this.nodeDataDetail = {
        id: 0
      };
    },
    collapseOrExpandNode(eventArgs) {
      eventArgs.isCollapse = !eventArgs.isCollapse;
    }
  },
  data: () => ({
    isLoadingDetails: false,
    dataForHierarchy: null,
    scale: scaleValue,
    nodeDataDetail: null,
    min: 0.2,
    max: 1.0,
    select: {
      state: "Branch Structure",
      slideInfo: "Branch Information",
      value: 1
    },
    itemsSelect: [
      { state: "Branch Structure", slideInfo: "Branch Information", value: 1 },
      {
        state: "Board Structure",
        slideInfo: "Board Member Information",
        value: 4
      },
      {
        state: "Corporate Structure",
        slideInfo: "Corporation Information",
        value: 2
      },
      {
        state: "Department Structure",
        slideInfo: "Structure Information",
        value: 3
      }
    ]
  }),
  computed: {
    drawer: function() {
      return !!this.nodeDataDetail;
    }
  }
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
