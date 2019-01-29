<template>
  <div>
    <h3 class="mt-3">Upcoming Absence</h3>
    <v-card v-for="item in items" :key="item.id" class="mt-3">
      <LeaveRowItem :item="item"/>
    </v-card>
    <h3 class="mt-3">Past Absence</h3>
    <v-card v-for="item in items" :key="item.id" class="mt-3">
      <LeaveRowItem :item="item"/>
    </v-card>
  </div>
</template>
<script>
import LeaveRowItem from "../Profile/LeaveRowItem";
export default {
  props: {
    items: Array
  },
  components: {
    LeaveRowItem
  }
};
</script>