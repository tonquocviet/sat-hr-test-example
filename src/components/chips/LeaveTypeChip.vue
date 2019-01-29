<template>
  <v-chip small :color="leaveTypeColor" text-color="white">
    <span :class="`${isResponsive ? 'hidden-md-and-down' : ''}`">{{ leaveType }}</span>
    <span v-if="isResponsive" class="hidden-lg-and-up">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  </v-chip>
</template>

<script>
import { leaveTypes } from "../../config";
export default {
  props: {
    leaveType: String,
    isResponsive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    leaveTypeColor() {
      return (
        leaveTypes.filter(x => x.name === this.leaveType)[0] || {
          color: "primary"
        }
      ).color;
    }
  }
};
</script>
