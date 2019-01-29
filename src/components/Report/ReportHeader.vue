<template>
  <v-layout row wrap>
    <v-flex xs4 md2>
      <v-menu
        ref="menu"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field slot="activator" v-model="picker" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="picker" type="month" no-title scrollable></v-date-picker>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
    <template v-for="item in colors">
      <LeaveTypeChip :key="item.name" :leaveType="item.name" is-responsive/>
    </template>
  </v-layout>
</template>

<script>
import LeaveTypeChip from "../chips/LeaveTypeChip";

export default {
  props: {
    date: String,
    colors: Array
  },
  components: {
    LeaveTypeChip
  },
  data() {
    return {
      menu: false,
      modal: false,
      picker: this.date
    };
  },
  watch: {
    picker: function(val) {
      this.$emit("changeDate", val);
    }
  }
};
</script>
