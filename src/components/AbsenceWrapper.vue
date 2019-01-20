<template>
  <v-tabs color="transparent">
    <v-tab v-for="item in itemTabs" :key="item.id">{{ item.text }}</v-tab>
    <v-tab-item>
      <Absence/>
    </v-tab-item>
    <v-tab-item></v-tab-item>
    <v-tab-item></v-tab-item>
    <v-tab-item></v-tab-item>
  </v-tabs>
</template>
<script>
import Absence from "./Absence/Form";
export default {
  components: {
    Absence
  },
  data() {
    return {
      itemTabs: [
        { text: "Absence" },
        { text: "Policies" },
        { text: "Report" },
        { text: "Setting" }
      ]
    };
  }
};
</script>
