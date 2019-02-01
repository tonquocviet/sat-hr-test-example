<template>
  <v-layout wrap>
    <v-flex xs12 sm12 md4 lg3 class="pt-2">
      <v-card class="colorful-calendar">
        <VDatePickerExtend
          :value="dates.map(x=>x.date)"
          :pickerDate="pickerDate"
          :titleDateFormat="titleDateFormat"
          :selectedColor="getColorByLeaveDate"
          disabled
          multiple
          width="100%"
          @input="changeDates"
          @update:pickerDate="changePickerDate"
        ></VDatePickerExtend>
      </v-card>
      <v-card class="mt-3">
        <v-layout row wrap>
          <v-flex v-for="item in tags" :key="item.name" lg6 sm4 xs6 class="pa-1">
            <LeaveTypeChip :leaveType="item.name"/>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 md8 lg9>
      <v-layout row wrap>
        <v-flex
          v-for="(month,index) in to12Months"
          :key="index"
          class="xs12 sm4 lg3 xl2 month-absence h-100 pa-2"
          @click="selectedIndex = index"
        >
          <v-card
            :class="`card-date-of-month colorful-calendar ${index===selectedIndex ? 'elevation-10':''}`"
          >
            <VDatePickerExtend
              :value="month.dates"
              :pickerDate="month.month"
              multiple
              no-title
              disabled
              :selectedColor="getColorByLeaveDate"
              width="100%"
            ></VDatePickerExtend>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import LeaveTypeChip from "../../chips/LeaveTypeChip";
import VDatePickerExtend from "../../vuetify/VDatePickerExtend/VDatePickerExtend";
import { leaveTypes } from "../../../config";
export default {
  components: {
    LeaveTypeChip,
    VDatePickerExtend
  },
  props: {
    dates: Array,
    tags: Array,
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  methods: {
    changeDates(selectedDates) {
      this.$emit("update:dates", selectedDates);
    },
    changePickerDate(pickerDate) {
      const [, month] = pickerDate.split("-").map(Number);
      this.selectedIndex = month - 1;
    },
    titleDateFormat(dates) {
      const count = dates.filter(x => {
        const [, month] = x.split("-").map(Number);
        return month === this.selectedIndex + 1;
      }).length;
      return `${count} day(s)`;
    },
    getColorByLeaveDate(date) {
      const leaveType = (
        this.dates.filter(x => x.date === date)[0] || { leaveType: "" }
      ).leaveType;
      return (
        leaveTypes.filter(x => x.name === leaveType)[0] || { color: "primary" }
      ).color;
    }
  },
  computed: {
    to12Months() {
      let months = [];
      const defaultYear =
        new Date((this.dates[0] || {}).date || new Date()).getFullYear() + "";
      for (var i = 0; i < 12; i++) {
        const datesInMonth = this.dates.filter(
          x => new Date(x.date).getMonth() === i
        );
        months.push({
          dates: datesInMonth.map(x => x.date),
          month: `${defaultYear}-${i + 1}`
        });
      }
      return months;
    },
    pickerDate() {
      const defaultYear =
        new Date(
          (this.dates[0] || { date: null }).date || new Date()
        ).getFullYear() + "";
      return `${defaultYear}-${this.selectedIndex + 1}`;
    }
  }
};
</script>
<style scoped>
.month-absence {
  cursor: pointer;
}
.colorful-calendar /deep/ .theme--light.v-btn.v-btn--disabled {
  color: white !important;
}
@media only screen and (max-width: 868px) {
  .card-date-of-month {
    margin-left: 5px !important;
  }
}
</style>
