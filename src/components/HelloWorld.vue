<template>
  <v-layout wrap style="height: 200px;">
    <v-layout>
      <v-btn top left color="white" dark @click.stop="drawer = !drawer">
        <v-icon color="black">menu</v-icon>
      </v-btn>
    </v-layout>

    <v-navigation-drawer v-model="drawer" absolute right width="500">
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-action>
            <v-btn icon @click.stop="drawer = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sat-hr</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    right: null
  })
};
</script>

<style>
</style>
