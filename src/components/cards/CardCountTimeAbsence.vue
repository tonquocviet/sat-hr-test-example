<template>
  <div class="elevation-1">
    <div style="height: 117px" class="text-xs-center pl-3 pr-3 pt-2 pb-2">
      <v-layout justify-center align-center>
        <v-flex xs3>
          <h1>{{numberTimeStart}}</h1>
          <h3 class="subheading font-weight-bold">{{numberDayTimeStart}}</h3>
        </v-flex>
        <v-flex xs6 class="user-date-arrow">
          <v-layout justify-center>
            <v-icon size="67" color="orange darken-2">arrow_right_alt</v-icon>
          </v-layout>
        </v-flex>
        <v-flex xs3>
          <h1>{{numberTimeEnd}}</h1>
          <h3 class="subheading font-weight-bold">{{countTime}} Hours</h3>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: {
    startDate: String,
    endDate: String
  },
  computed: {
    numberTimeStart() {
      return moment(this.startDate).format("HH:mm");
    },
    numberTimeEnd() {
      return moment(this.endDate).format("HH:mm");
    },
    numberDayTimeStart() {
      return moment(this.startDate).format("MM-DD-YYYY");
    },
    countTime() {
      const start = moment(this.startDate);
      const end = moment(this.endDate);
      return end.diff(start, "hours");
    }
  }
};
</script>

