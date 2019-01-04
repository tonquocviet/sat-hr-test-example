<template>
  <v-layout wrap>
    <v-layout style="margin-left: 100px; position: relative;">
      <v-flex xs2>
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
      <v-flex>
        <v-slider :style="sliderStyle" color="grey" v-model="ex3.val"></v-slider>
      </v-flex>
      <v-flex :style="btnZoomStyle">
        <button class="button">
          <v-icon>add</v-icon>
        </button>
        <button class="button">
          <v-icon>more_horiz</v-icon>
        </button>
        <button class="button">
          <v-icon>fullscreen</v-icon>
        </button>
      </v-flex>
    </v-layout>

    <v-navigation-drawer v-model="navigator" :mini-variant="mini" absolute>
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="drawer" absolute right width="400">
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-action>
            <v-btn icon @click.stop="openDrawer()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Sat-hr</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 100px">
        <button @click.stop="openDrawer()">
          <v-list-tile-avatar>
            <img src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
          </v-list-tile-avatar>
        </button>
      </v-toolbar-title>
      <v-tabs color="transparent">
        <v-tab v-for="item in itemTabs" :key="item.id">{{ item.text }}</v-tab>
      </v-tabs>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Type anything to search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>message</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>calendar_today</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>email</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Vuetify">
        </v-avatar>
      </v-btn>
    </v-toolbar>
  </v-layout>
</template>

<script>
export default {
  methods: {
    openDrawer: function() {
      this.drawer = !this.drawer;
      if (this.drawer === true) {
        this.btnZoomStyle = "position: absolute; right: 30rem; top: 0;";
        this.sliderStyle = "position: absolute; right: 40rem; top: 0;";
        const btnZoomStyle = this.btnZoomStyle;
        const sliderStyle = this.sliderStyle;
        return {
          btnZoomStyle,
          sliderStyle
        };
      } else {
        this.btnZoomStyle = "position: absolute; right: 1rem; top: 0;";
        this.sliderStyle = "position: absolute; right: 10rem; top: 0;";
        const btnZoomStyle = this.btnZoomStyle;
        const sliderStyle = this.sliderStyle;
        return {
          btnZoomStyle,
          sliderStyle
        };
      }
    }
  },
  data: () => ({
    drawer: false,
    navigator: null,
    right: null,
    btnZoomStyle: { position: "absolute", right: "1rem", top: "0rem" },
    sliderStyle: { position: "absolute", right: "10rem", top: "0rem" },
    mini: true,
    itemTabs: [
      { text: "ANNOUNCEMENT" },
      { text: "ORGANIZATION CHART" },
      { text: "COMPANY PROFILE" },
      { text: "EMPLOYEES" },
      { text: "DEPARTMENTS" }
    ],
    items: [
      { title: "Home", icon: "dashboard" },
      { title: "About", icon: "question_answer" },
      { title: "Book", icon: "book" },
      { title: "Creadit", icon: "credit_card" },
      { title: "Account", icon: "account_box" },
      { title: "Phone", icon: "phone" },
      { title: "SMS", icon: "textsms" },
      { title: "Location", icon: "location_on" }
    ],
    select: { state: "Corporate Structure", abbr: "FL" },
    itemsSelect: [
      { state: "Corporate Structure 1", abbr: "FL" },
      { state: "Corporate Structure 2", abbr: "GA" },
      { state: "Corporate Structure 3", abbr: "NE" }
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
