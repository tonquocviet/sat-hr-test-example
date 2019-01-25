<template>
  <v-layout row>
    <v-flex xs12>
      <v-data-table
        :items="getItems()"
        :headers="getHeaders()"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td v-for="item in props.item.styles" :key="item.id" :style="{ backgroundColor: item.color, borderLeft: '1px solid grey' }">{{ item.text }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
import { colorsReport } from "../../config";

const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + (i * step));
const getDateInWeek = date => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][date % 7];
const dateToMoment = ({ from, to }) => ({
  from: moment(from, 'MM/DD/YYYY'),
  to: moment(to, 'MM/DD/YYYY')
})

export default {
  props: {
    data: Array,
    date: Object,
    holidays: Array
  },
  data() {
    return {

    }
  },
  methods: {
    getHeaders() {
      return [{ text: 'EMPLOYEE NAME', sortable: false }].concat(range(0, this.daysInMonth, 1).map(d => ({
        text: `${d + 1}/${getDateInWeek(this.dateInWeek + d)}`,
        sortable: false
      })));
    },
    getItems() {
      const { year, month } = this.date;
      return this.data.map(e => {
        const { name, daysOff: { vacation = [], sick = [], unpaid = [], halfday = [], other = [] } } = e;

        const mVacation = vacation.map(dateToMoment);
        const mSick = sick.map(dateToMoment);
        const mUnpaid = unpaid.map(dateToMoment);
        const mHaflday = halfday.map(dateToMoment);
        const mOther = other.map(dateToMoment);

        const styles = range(1, this.daysInMonth + 1, 1).map(d => {
          const isVacation = mVacation.filter(v => year === v.from.year() && month === v.from.month() + 1 && d >= v.from.date() && d <= v.to.date()).length > 0;
          const isSick = mSick.filter(v => year === v.from.year() && month === v.from.month() + 1 && d >= v.from.date() && d <= v.to.date()).length > 0;
          const isUnpaid = mUnpaid.filter(v => year === v.from.year() && month === v.from.month() + 1 && d >= v.from.date() && d <= v.to.date()).length > 0;
          const isHalfday = mHaflday.filter(v => year === v.from.year() && month === v.from.month() + 1 && d >= v.from.date() && d <= v.to.date()).length > 0;
          const isOther = mOther.filter(v => year === v.from.year() && month === v.from.month() + 1 && d >= v.from.date() && d <= v.to.date()).length > 0;
          const isHoliday = this.holidaysInYear.filter(h => h.month() + 1 === month && h.date() === d).length > 0;
          const isWeekend = getDateInWeek(this.dateInWeek + d - 1) === 'Sun';

          return {
            id: d,
            text: '',
            color: isWeekend ? colorsReport.weekend.background :
              isHoliday ? colorsReport.holiday.background :
              isVacation ? colorsReport.vacation.background : 
              isSick ? colorsReport.sick.background :
              isUnpaid ? colorsReport.unpaid.background :
              isHalfday ? colorsReport.halfday.background :
              isOther ? colorsReport.other.background :
              'white'
          }
        });

        return {
          name,
          styles
        }
      })
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
      return this.holidays.map(h => moment(h.date, 'MM/DD').year(this.date.year));
    }
  }
}
</script>

