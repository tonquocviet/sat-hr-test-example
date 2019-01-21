<template>
  <div>
    <v-flex xs12 md9 class="type-selector-container" style="margin-top:20px">
      <v-flex xs12 right position absolute>
        <v-btn color="info" class="v-btn-add-filter">Add New Absence</v-btn>
        <v-btn icon class="primary--text v-btn-add-filter">
          <v-icon>filter_list</v-icon>
        </v-btn>
      </v-flex>
      <v-tabs color="transparent" dark slider-color="primary">
        <v-tab v-for="item in itemList" :key="item.id" ripple class="primary--text">{{ item.text }}</v-tab>
        <v-tab-item>
          <AbsenceList/>
        </v-tab-item>
        <v-tab-item>Approved Request</v-tab-item>
        <v-tab-item>Rejected Request</v-tab-item>
      </v-tabs>
    </v-flex>
    <v-flex xs12 md3></v-flex>
  </div>
</template>
<script>
import AbsenceList from "./AbsenceList";
export default {
  components: {
    AbsenceList
  },
  data() {
    return {
      itemList: [
        { text: "Peding Requests" },
        { text: "Approved Request" },
        { text: "Rejected Request" }
      ]
    };
  }
};
</script>
<style>
.v-btn-card {
  margin-right: 90px;
}
.v-btn-add-filter {
  z-index: 10;
}
</style>
