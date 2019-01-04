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
      <v-slider style="max-width:100px" color="grey" v-model="ex3.val" hide-details></v-slider>
      <v-btn icon>
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_horiz</v-icon>
      </v-btn>
      <v-btn icon>
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
        <v-container>
          <BranchForm/>
        </v-container>
      </v-list>
    </v-navigation-drawer>
  </v-content>
</template>
<script>
import BranchForm from "../components/forms/BranchForm";
export default {
  components: { BranchForm },
  data: () => ({
    drawer: true,
    select: { state: "Corporate Structure", abbr: "cor" },
    itemsSelect: [
      { state: "Department Structure", abbr: "dep" },
      { state: "Branch Structure", abbr: "bra" },
      { state: "Corporate Structure", abbr: "cor" }
    ],
    ex3: { val: 50, color: "red" }
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
