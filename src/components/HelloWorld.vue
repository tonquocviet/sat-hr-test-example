<template>
  <v-layout wrap style="height: 200px;">
    <v-layout>
      <v-btn top left style="margin-left: 70px;" color="white" dark @click.stop="drawer = !drawer">
        <v-icon color="black">menu</v-icon>
      </v-btn>
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

    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 100px">
        <v-list-tile-avatar>
          <img src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
        </v-list-tile-avatar>
      </v-toolbar-title>
      <v-tabs color="transparent">
        <v-tab v-for="item in itemTabs" :key="item.id">{{ item.text }}</v-tab>
      </v-tabs>
      <v-autocomplete
        cache-items
        class="mx-4"
        flat
        hide-no-data
        hide-details
        label="Type anything to search"
        solo-inverted
      ></v-autocomplete>
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
  data: () => ({
    drawer: null,
    navigator: null,
    right: null,
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
    ]
  })
};
</script>

<style>
</style>
