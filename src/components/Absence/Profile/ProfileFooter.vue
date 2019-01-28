<template>
  <div>
    <h3 class="mt-3">Upcoming leaves</h3>
    <LeaveRowItem v-for="item in items" :key="item.id" :item="item"></LeaveRowItem>
    <h3 class="mt-3">Past leaves</h3>
    <LeaveRowItem v-for="item in items" :key="item.id" :item="item" :passLeave="true"></LeaveRowItem>
  </div>
</template>
<script>
import LeaveRowItem from './LeaveRowItem'
export default {
  props: {
    items: Array,
  },
  components: {
    LeaveRowItem
  }
};
</script>

