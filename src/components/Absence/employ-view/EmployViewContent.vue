<template>
  <div>
    <h3 class="mt-3">Upcoming Absence</h3>
    <LeaveRowItem :items="ListItemsAbsence"/>
    <h3 class="mt-3">Past Absence</h3>
    <LeaveRowItem :items="ListItemsAbsence"/>
  </div>
</template>
<script>
import LeaveRowItem from "../Profile/LeaveRowItem";
export default {
  props: {
    ListItemsAbsence: Array
  },
  components: {
    LeaveRowItem
  }
};
</script>
