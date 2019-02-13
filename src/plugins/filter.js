import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatFullDay', day => {
  if (typeof day === 'string') {
    return moment(day).format("MM-DD-YYYY");
  }
  return day.format("MM-DD-YYYY");
})
