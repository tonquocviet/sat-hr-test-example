<template>
  <div class="elevation-1">
    <div style="height: 117px" class="text-xs-center pl-3 pr-3 pt-2 pb-2">
      <v-layout justify-center align-center>
        <v-flex xs12>
          <h3 class="subheading font-weight-bold">
            {{numberDayTimeStart}}
            <span class="subheading font-weight-bold orange--text">From</span>
            {{numberTimeStart}}
            <span class="subheading font-weight-bold orange--text">To</span>
            {{numberTimeEnd}}
          </h3>
          <h3 class="subheading font-weight-bold mt-2">{{numberDayTimeStart}}</h3>
          <h3 class="subheading font-weight-bold mt-2">
            {{numberDayTimeEnd}}
            <span class="subheading font-weight-bold orange--text">From</span>
            {{numberTimeStart}}
            <span class="subheading font-weight-bold orange--text">To</span>
            {{numberTimeEnd}}
          </h3>
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
    numberDayTimeEnd() {
      return moment(this.startDate).format("MM-DD-YYYY");
    }
  }
};
</script>

