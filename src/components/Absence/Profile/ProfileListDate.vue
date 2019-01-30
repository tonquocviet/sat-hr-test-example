<template>
  <v-layout wrap>
    <v-flex xs12 sm12 md4 lg3 class="pt-2">
      <v-card>
        <v-date-picker
          :value="dates"
          multiple
          width="100%"
          @input="changeDates"
          :pickerDate="pickerDate"
          @update:pickerDate="changePickerDate"
          :titleDateFormat="titleDateFormat"
          disabled
        ></v-date-picker>
      </v-card>
      <v-card class="mt-3">
        <v-layout row wrap justify-center align-center> 
          <div v-for="item in tags" :key="item.name" class="pa-1">
            <LeaveTypeChip :leaveType="item.name"/>
          </div>
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
          <v-card :class="`card-date-of-month ${index===selectedIndex ? 'elevation-10':''}`">
            <v-date-picker :value="month" multiple no-title disabled width="100%"></v-date-picker>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import LeaveTypeChip from "../../chips/LeaveTypeChip";
export default {
  components: {
    LeaveTypeChip
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
    }
  },
  computed: {
    to12Months() {
      let months = [];
      const defaultYear =
        new Date(this.dates[0] || new Date()).getFullYear() + "";
      for (var i = 0; i < 12; i++) {
        const datesInMonth = this.dates.filter(
          x => new Date(x).getMonth() === i
        );
        if (!datesInMonth.length) {
          datesInMonth.push(`${defaultYear}-${i + 1}`);
        }
        months.push(datesInMonth);
      }
      return months;
    },
    pickerDate() {
      const defaultYear =
        new Date(this.dates[0] || new Date()).getFullYear() + "";
      return `${defaultYear}-${this.selectedIndex + 1}`;
    }
  }
};
</script>
<style scopes>
.month-absence {
  cursor: pointer;
}
@media only screen and (max-width: 868px) {
  .card-date-of-month {
    margin-left: 5px !important;
  }
}
</style>