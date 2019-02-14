<template>
  <v-layout v-if="type === 1">
    <v-flex xs3>
      <h3>{{info.monthStart}}</h3>
      <h1>{{info.dateStart}}</h1>
      <h3 class="grey--text">{{info.dayStart}}</h3>
    </v-flex>
    <v-flex xs6 class="user-date-arrow">
      <v-layout class="justify-center">
        <v-icon size="67" color="orange darken-2">arrow_right_alt</v-icon>
        <h4 style="position: absolute;bottom: 0px;">{{info.diffDay}} day{{ info.diffDay > 1 ? 's' : '' }} Annual leave</h4>
      </v-layout>
    </v-flex>
    <v-flex xs3>
      <h3>{{info.monthEnd}}</h3>
      <h1>{{info.dateEnd}}</h1>
      <h3 class="grey--text">{{info.dayEnd}}</h3>
    </v-flex>
  </v-layout>
  <v-layout v-else-if="type === 2" justify-center align-center>
    <v-flex xs3>
      <h1>{{info.timeStart}}</h1>
      <h3 class="subheading font-weight-bold">{{info.dayOff}}</h3>
    </v-flex>
    <v-flex xs6 class="user-date-arrow my-2">
      <v-layout justify-center>
        <v-icon size="67" color="orange darken-2">arrow_right_alt</v-icon>
      </v-layout>
    </v-flex>
    <v-flex xs3>
      <h1>{{info.timeEnd}}</h1>
      <h3 class="subheading font-weight-bold">{{info.diffHours}} hours</h3>
    </v-flex>
  </v-layout>
  <v-layout column v-else-if="type === 3" class="text-xs-left" justify-center>
    <v-flex xs12 :key="index" v-for="(item, index) in leaveData">
      <h3 v-if="hasHours(item)" class="subheading font-weight-bold my-1">
        {{item.from | formatFullDay}}
        <span class="subheading font-weight-bold orange--text">from</span>
        {{item.fromHours}}
        <span class="subheading font-weight-bold orange--text">to</span>
        {{item.toHours}}
      </h3>
      <h3 v-else-if="hasManyDays(item)" class="subheading font-weight-bold my-1">
        <span class="subheading font-weight-bold orange--text">from</span>
        {{item.from | formatFullDay}}
        <span class="subheading font-weight-bold orange--text">to</span>
        {{item.to | formatFullDay}} full day
      </h3>
      <h3 v-else class="subheading font-weight-bold my-1">{{item.from | formatFullDay}} full day</h3>
    </v-flex>
  </v-layout>
</template>
<script>
import moment from "moment";

export default {
  props: {
    leaveData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    hasHours(day) {
      return day.from && day.to && day.fromHours && day.toHours;
    },
    hasManyDays(day) {
      return day.from !== day.to;
    }
  },
  computed: {
    type() {
      const { leaveData } = this;
      if (leaveData.length === 0) return 0;
      if (leaveData.length > 1) return 3;
      if (
        leaveData[0].from &&
        leaveData[0].to &&
        leaveData[0].fromHours &&
        leaveData[0].toHours
      )
        return 2;
      return 1;
    },
    info() {
      switch (this.type) {
        case 1: {
          const { from, to } = this.leaveData[0];
          const mFrom = moment(from, "YYYY-MM-DD");
          const mTo = moment(to, "YYYY-MM-DD");
          return {
            monthStart: mFrom.format("MMM"),
            monthEnd: mTo.format("MMM"),
            dateStart: mFrom.format("DD"),
            dateEnd: mTo.format("DD"),
            dayStart: mFrom.format("ddd"),
            dayEnd: mTo.format("ddd"),
            diffDay: mTo.diff(mFrom, "days") + 1
          };
        }
        case 2: {
          const { from, to, fromHours, toHours } = this.leaveData[0];
          const mFrom = moment(`${from} ${fromHours}`, "YYYY-MM-DD HH:mm");
          const mTo = moment(`${to} ${toHours}`, "YYYY-MM-DD HH:mm");
          return {
            timeStart: fromHours,
            timeEnd: toHours,
            dayOff: mFrom.format("MM-DD-YYYY"),
            diffHours: mTo.diff(mFrom, "hours", true)
          };
        }
      }
      return {};
    }
  }
};
</script>

<style scoped>
.user-date-arrow {
  position: relative;
}
</style>
