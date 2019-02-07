<template>
  <v-container fluid class="pa-0 ma-0" style="overflow: auto">
    <table class="report-table">
      <thead>
        <tr>
          <th rowspan="2">
            <div :style="{width: firstColumnWidth}">EMPLOYEE NAME</div>
          </th>
          <th v-for="(date, index) in getHeaders" :key="index" class="text-xs-center">
            <ReportCell is-header>{{date.weekDate}}</ReportCell>
          </th>
        </tr>
        <tr>
          <th v-for="(date, index) in getHeaders" :key="index" class="text-xs-center">
            <ReportCell is-header>{{date.date}}</ReportCell>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getItems" :key="item.id">
          <td>
            <div class="text-xs-right pr-2 font-weight-bold" :style="{width: firstColumnWidth}">{{item.name}}</div>
          </td>
          <td v-for="cell in item.styles" :key="cell.id">
            <ReportCell
              :leaveType="cell.leaveType"
              :dateType="cell.dateType"
              :employeeType="cell.employeeType"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
import moment from "moment";
import ReportCell from "./ReportCell";
import { leaveTypes } from "../../config";

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
const dateToMoment = ({ from, to, name }) => ({
  from: moment(from, "MM/DD/YYYY"),
  to: moment(to, "MM/DD/YYYY"),
  name
});
const getDateInWeek = date =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date % 7];
export default {
  components: {
    ReportCell
  },
  props: {
    data: Array,
    date: Object,
    holidays: Array
  },
  computed: {
    gridWidth() {
      return this.dates.length * 40 + "px";
    },
    getHeaders() {
      return range(0, this.daysInMonth, 1).map(d => ({
        weekDate: `${getDateInWeek(this.dateInWeek + d)}`,
        date: d + 1
      }));
    },
    getItems() {
      const { year, month } = this.date;
      return this.data.map(e => {
        const { id, name, daysOff = [] } = e;

        const daysOffInMomentFormat = daysOff.map(dateToMoment);
        const styles = range(1, this.daysInMonth + 1, 1).map(d => {
          const mDay = moment(`${month}/${d}/${year}`, "MM/DD/YYYY");
          const leaveType = daysOffInMomentFormat.filter(v =>
            mDay.isBetween(v.from, v.to, null, "[]")
          )[0];
          const day = mDay.weekday();
          const isWeekend = day === 6 || day === 0;

          return {
            id: d,
            text: "",
            leaveType: (leaveType || {}).name,
            dateType: isWeekend ? "weekend" : "",
            employeeType: e.employeeType
          };
        });

        return {
          id,
          name,
          styles
        };
      });
    },
    firstColumnWidth: () => "150px",
    dateInWeek() {
      return new Date(this.date.year, this.date.month - 1, 1).getDay();
    },
    daysInMonth() {
      return new Date(this.date.year, this.date.month, 0).getDate();
    }
  }
};
</script>
<style scoped>
.cell {
  width: 40px;
}
.report-table {
  background: white;
  border-collapse: collapse;
}
.report-table /deep/ th,
.report-table /deep/ td {
  border: 1px solid black;
}
</style>
