<template>
  <div class="elevation-1">
    <div style="height: 117px" class="text-xs-center pl-3 pr-3 pt-2 pb-2">
      <v-layout>
        <v-flex xs3>
          <h3>{{formatMonth(itemDetail.startDate)}}</h3>
          <h1>{{formatDate(itemDetail.startDate)}}</h1>
          <h3 class="grey--text">{{formatDay(itemDetail.startDate)}}</h3>
        </v-flex>
        <v-flex xs6 class="user-date-arrow">
          <v-layout class="justify-center">
            <v-icon size="67" color="orange darken-2">arrow_right_alt</v-icon>
            <h4
              style="position: absolute;bottom: 0px;"
            >{{countDay(itemDetail.startDate, itemDetail.endDate)}} days anhual leave</h4>
          </v-layout>
        </v-flex>
        <v-flex xs3>
          <h3>{{formatMonth(itemDetail.endDate)}}</h3>
          <h1>{{formatDate(itemDetail.endDate)}}</h1>
          <h3 class="grey--text">{{formatDay(itemDetail.endDate)}}</h3>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: {
    itemDetail: Object
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD");
    },
    formatDay(date) {
      return moment(date).format("ddd");
    },
    formatMonth(date) {
      return moment(date).format("MMM");
    },
    formatDateTime(date) {
      return moment(date).format("DD MMM");
    },
    countDay(startDate, endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      return end.diff(start, "days");
    }
  }
};
</script>

