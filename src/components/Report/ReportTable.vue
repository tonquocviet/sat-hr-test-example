<template>
  <v-layout row>
    <v-flex xs12>
      <v-data-table
        :items="getItems()"
        :headers="getHeaders()"
        class="elevation-1 fixed-table"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-right">{{ props.item.name }}</td>
          <td v-for="item in props.item.styles" :key="item.id" :color="item.color">
            <span :class="item.color">&nbsp;</span>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
import { leaveTypes } from "../../config";

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
const getDateInWeek = date =>
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date % 7];
const dateToMoment = ({ from, to, name }) => ({
  from: moment(from, "MM/DD/YYYY"),
  to: moment(to, "MM/DD/YYYY"),
  name
});

export default {
  props: {
    data: Array,
    date: Object,
    holidays: Array
  },
  methods: {
    getHeaders() {
      return [{ text: "EMPLOYEE NAME", sortable: false }].concat(
        range(0, this.daysInMonth, 1).map(d => ({
          text: `${d + 1}/${getDateInWeek(this.dateInWeek + d)}`,
          sortable: false
        }))
      );
    },
    getItems() {
      const { year, month } = this.date;
      return this.data.map(e => {
        const { name, daysOff = [] } = e;

        const mDaysOff = daysOff.map(dateToMoment);

        const styles = range(1, this.daysInMonth + 1, 1).map(d => {
          const mDay = moment(`${month}/${d}/${year}`, "MM/DD/YYYY");
          const isDayOff = mDaysOff.findIndex(v =>
            mDay.isBetween(v.from, v.to, null, "[]")
          );
          const isHoliday = this.holidaysInYear.some(v =>
            mDay.isBetween(v.from, v.to, null, "[]")
          );

          const color = (isHoliday
            ? leaveTypes.filter(x => x.name === "Holiday")[0]
            : isDayOff !== -1
            ? leaveTypes.filter(x => x.name === mDaysOff[isDayOff].name)[0]
            : { color: "white" }
          ).color;

          return {
            id: d,
            text: "",
            color
          };
        });

        return {
          name,
          styles
        };
      });
    }
  },
  computed: {
    dateInWeek() {
      return new Date(this.date.year, this.date.month - 1, 1).getDay();
    },
    daysInMonth() {
      return new Date(this.date.year, this.date.month, 0).getDate();
    },
    holidaysInYear() {
      return this.holidays.map(dateToMoment);
    }
  }
};
</script>
<style>
.fixed-table table th {
  padding: 0 !important;
  width: 50px;
  text-align: center !important;
}
.fixed-table table td {
  padding: 0 !important;
  border: 1px solid gray;
}
.fixed-table table td span {
  height: 100%;
  width: 100%;
  display: block;
  overflow: auto;
}
</style>
