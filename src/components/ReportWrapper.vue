<template>
  <v-content>
    <v-container fluid class="pa-0">
      <v-tabs left color="transparent" dark slider-color="primary">
        <v-tab class="primary--text" ripple>Employee List</v-tab>
        <v-tab class="primary--text" ripple>Summary</v-tab>
        <v-tab-item>
          <ReportHeader :date="date" v-on:changeDate="changeDate" :colors="colorsReport" />
          <ReportTable :data="employees" :date="getMonth" :holidays="holidays"/>
        </v-tab-item>
        <v-tab-item>Summary</v-tab-item>
      </v-tabs>
    </v-container>
  </v-content>
</template>

<script>
import ReportTable from "./Report/ReportTable";
import ReportHeader from "./Report/ReportHeader";
import { colorsReport } from "../config";

export default {
  components: {
    ReportTable,
    ReportHeader
  },
  data() {
    return {
      colorsReport,
      date: '2016-11',
      holidays: [
        {
          name: 'Holiday 1',
          from: '11/24/2016',
          to: '11/25/2016'
        }
      ],
      employees: [
        {
          id: 1,
          name: 'Employee 1',
          daysOff: [
            {
              from: '11/15/2016',
              to: '11/15/2016',
              type: 'sick'
            }
          ]
        },
        {
          id: 2,
          name: 'Employee 2',
          daysOff: [
            {
              from: '11/05/2016',
              to: '11/19/2016',
              type: 'vacation'
            }
          ],
        },
        {
          id: 3,
          name: 'Employee 3',
          daysOff: []
        },
        {
          id: 4,
          name: 'Employee 4',
          daysOff: [
            {
              from: '11/07/2016',
              to: '11/10/2016',
              type: 'other'
            }
          ]
        },
        {
          id: 5,
          name: 'Employee 5',
          daysOff: [
            {
              from: '11/22/2016',
              to: '11/22/2016',
              type: 'sick'
            }
          ]
        },
        {
          id: 6,
          name: 'Employee 6',
          daysOff: [
            {
              from: '11/15/2016',
              to: '11/29/2016',
              type: 'vacation'
            }
          ]
        },
        {
          id: 7,
          name: 'Employee 7',
          daysOff: [
            {
              from: '11/10/2016',
              to: '11/11/2016',
              type: 'unpaid'
            }
          ]
        },
        {
          id: 8,
          name: 'Employee 8',
          daysOff: [
            {
              from: '11/10/2016',
              to: '11/10/2016',
              type: 'halfday'
            }
          ]
        },
        {
          id: 9,
          name: 'Employee 9',
          daysOff: []
        },
        {
          id: 10,
          name: 'Employee 10',
          daysOff: [
            {
              from: '11/24/2016',
              to: '11/29/2016',
              type: 'sick'
            }
          ]
        },
      ]
    }
  },
  computed: {
    getMonth() {
      return {
        year: +this.date.split('-')[0],
        month: +this.date.split('-')[1]
      }
    }
  },
  methods: {
    changeDate(val) {
      this.date = val;
    }
  }
}
</script>

