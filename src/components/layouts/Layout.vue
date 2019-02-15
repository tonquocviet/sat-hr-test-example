<template>
  <v-app>
    <v-navigation-drawer app fixed clipped v-model="navigator" :mini-variant="mini">
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
    <v-toolbar clipped-left clipped-right color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 100px">
        <v-list-tile-avatar>
          <img src="https://cdn.vuetifyjs.com/images/logos/v-alt.svg">
        </v-list-tile-avatar>
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in itemTabs" flat :key="item.id" :to="item.link">{{ item.text }}</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
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
    <slot></slot>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    navigator: null,
    right: null,
    mini: true,
    itemTabs: [
      { text: "ABSENCE", link: "/absence" },
      { text: "POLICIES", link: "/absence-policy" },
      { text: "REPORT", link: "/report" },
      { text: "SETTINGS", link: "/settings" },
      { text: "LOGIN", link: "/login" },
      { text: "HOMEPAGE", link: "/homepage" }
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

