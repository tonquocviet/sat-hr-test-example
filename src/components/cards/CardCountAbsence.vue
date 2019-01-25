<template>
  <div class="elevation-1">
    <div style="height: 117px" class="text-xs-center pl-3 pr-3 pt-2 pb-2">
      <v-layout>
        <v-flex xs3>
          <h3>{{nameMonthStartDate}}</h3>
          <h1>{{numberDateStartDate}}</h1>
          <h3 class="grey--text">{{nameDayStartDate}}</h3>
        </v-flex>
        <v-flex xs6 class="user-date-arrow">
          <v-layout class="justify-center">
            <v-icon size="67" color="orange darken-2">arrow_right_alt</v-icon>
            <h4 style="position: absolute;bottom: 0px;">{{countDay}} days Annual leave</h4>
          </v-layout>
        </v-flex>
        <v-flex xs3>
          <h3>{{nameMonthEndDate}}</h3>
          <h1>{{numberDateEndDate}}</h1>
          <h3 class="grey--text">{{nameDayEndDate}}</h3>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: {
    startDate: String
  },
  computed: {
    nameMonthStartDate() {
      return moment(this.startDate).format("MMM");
    },
    nameMonthEndDate() {
      return moment(this.endDate).format("MMM");
    },
    numberDateStartDate() {
      return moment(this.startDate).format("DD");
    },
    numberDateEndDate() {
      return moment(this.endDate).format("DD");
    },
    nameDayStartDate() {
      return moment(this.startDate).format("ddd");
    },
    nameDayEndDate() {
      return moment(this.endDate).format("ddd");
    },
    countDay() {
      const start = moment(this.startDate);
      const end = moment(this.endDate);
      return end.diff(start, "days");
    }
  }
};
</script>

