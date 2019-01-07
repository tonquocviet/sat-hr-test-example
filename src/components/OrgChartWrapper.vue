<template>
  <v-content>
    <v-toolbar flat color="transparent" absolute light>
      <v-flex xs3>
        <v-select
          v-model="select"
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
      </v-list>
    </v-navigation-drawer>
    <HierarchyContainer :mouseWheel="mouseWheel" :scale="scale"/>
  </v-content>
</template>
<script>
import { scaleValue, zoomValue } from "../config";
import HierarchyContainer from "./hierarchy/HierarchyContainer";

export default {
  components: {
    HierarchyContainer
  },
  watch: {
    zoom: function(newZoom, oldZoom) {
      if (newZoom > oldZoom) {
        this.zoomIn();
      }else {
        this.zoomOut();
      }
    }
  },
  props: {
    scaleValue: { type: Number, default: scaleValue },
    zoomValue: { type: Number, default: zoomValue }
  },
  methods: {
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
      var delta = (e.deltaY + 50) * ((3/2) / 150);
      this.scale -= delta * ((3/2) / 150);
      this.zoom -= delta * (this.scale + 1);
    },
    zoomOut: function() {
      const zoom = this.zoom;
      if (zoom === 0) {
        return (this.scale = 0.1);
      }
    },
    zoomIn: function() {
      const zoom = this.zoom;
      return (this.scale = zoom * ((3/2) / 150));
    }
  },
  data: () => ({
    drawer: true,
    scale: scaleValue,
    min: 13,
    max: 100,
    zoom: zoomValue,
    select: { state: "Corporate Structure", abbr: "cor" },
    itemsSelect: [
      { state: "Department Structure", abbr: "dep" },
      { state: "Branch Structure", abbr: "bra" },
      { state: "Corporate Structure", abbr: "cor" }
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