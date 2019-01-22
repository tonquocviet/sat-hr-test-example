<template>
  <div class="v-container">
    <vue-tabs>
      <v-tab title="Pending Approval">
        <v-card-text class="card-user">
          <v-layout row wrap>
            <v-flex
              v-for="(item, index) in data.slice(0, showMore)"
              xs12
              sm6
              md4
              class="pl-2 pr-2 pt-2 pb-2"
              :key="index"
            >
              <AbsenceCard :item="item"/>
            </v-flex>
            <v-flex sm12 style="text-align:center">
              <v-btn @click="showViewMore">View More</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-tab>
      <v-tab title="Approved">Second tab content</v-tab>
      <v-tab title="Reject">Third tab content</v-tab>
    </vue-tabs>
  </div>
</template>
<script>
import AbsenceCard from "../cards/AbsenceCard";
import { VueTabs, VTab } from "vue-nav-tabs";
import "vue-nav-tabs/themes/vue-tabs.css";
export default {
  components: {
    AbsenceCard,
    VueTabs,
    VTab
  },
  data() {
    return {
      showMore: 3
    };
  },
  methods: {
    showViewMore() {
      this.showMore += 3;
    }
  },
  props: { data: Array }
};
</script>