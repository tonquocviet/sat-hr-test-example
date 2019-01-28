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
          <td class="text-xs-center">{{ props.item.name }}</td>
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
        const { name, daysOff = [] } = e;

        const mVacation = daysOff.filter(d => d.type === 'vacation').map(dateToMoment);
        const mSick = daysOff.filter(d => d.type === 'sick').map(dateToMoment);
        const mUnpaid = daysOff.filter(d => d.type === 'unpaid').map(dateToMoment);
        const mHaflday = daysOff.filter(d => d.type === 'halfday').map(dateToMoment);
        const mOther = daysOff.filter(d => d.type === 'other').map(dateToMoment);

        const styles = range(1, this.daysInMonth + 1, 1).map(d => {
          const mDay = moment(`${month}/${d}/${year}`, 'MM/DD/YYYY');
          const isVacation = mVacation.some(v => mDay.isBetween(v.from, v.to, null, '[]'));
          const isSick = mSick.some(v => mDay.isBetween(v.from, v.to, null, '[]'));
          const isUnpaid = mUnpaid.some(v => mDay.isBetween(v.from, v.to, null, '[]'));
          const isHalfday = mHaflday.some(v => mDay.isBetween(v.from, v.to, null, '[]'));
          const isOther = mOther.some(v => mDay.isBetween(v.from, v.to, null, '[]'));
          const isHoliday = this.holidaysInYear.some(v => mDay.isBetween(v.from, v.to, null, '[]'));
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
      return this.holidays.map(dateToMoment);
    }
  }
}
</script>
<style>
.fixed-table table th {
  padding: 0 !important;
  text-align: center !important;
}
</style>
