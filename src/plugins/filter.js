import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatFullDay', day => {
  if (typeof day === 'string') {
    return moment(day).format("MM-DD-YYYY");
  }
  return day.format("MM-DD-YYYY");
});

Vue.filter('formatFullDayWithNA', day => {
  if (!day) return 'N/A';
  if (typeof day === 'string') {
    return moment(day).format("MM-DD-YYYY");
  }
  return day.format("MM-DD-YYYY");
})
