<template>
  <div>
    <h3 class="mt-3">Upcoming leaves</h3>
    <v-card v-for="item in items" :key="item.id" class="mt-3">
      <LeavePast :item="item"></LeavePast>
    </v-card>
    <h3 class="mt-3">Past leaves</h3>
    <v-card v-for="item in items" :key="item.id" class="mt-3">
      <LeavePast :item="item"></LeavePast>
    </v-card>
  </div>
</template>
<script>
import LeavePast from './LeavePast'
export default {
  props: {
    items: Array,
  },
  components: {
    LeavePast
  }
};
</script>

