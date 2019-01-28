<template>
  <div>
    <h3 class="mt-3">Upcoming leaves</h3>
    <v-card v-for="item in items" :key="item.id" class="mt-3">
      <CardLeavePast :item="item"/>
    </v-card>
    <h3 class="mt-3">Past leaves</h3>
    <v-card v-for="item in items" :key="item.id" class="mt-3">
      <CardLeavePast :item="item"/>
    </v-card>
  </div>
</template>
<script>
import CardLeavePast from "../../cards/CardLeavePast";
export default {
  props: {
    items: Array
  },
  components: {
    CardLeavePast
  }
};
</script>