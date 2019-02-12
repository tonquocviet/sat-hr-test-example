<template>
  <div :class="`cell ${firstLayerStyle}`" :style="[secondLayerStyle, thirdLayerStyle]">
    <slot/>
  </div>
</template>

<script>
import { leaveTypes, dateTypeStyles, employeeTypeStyles } from "../../config";
export default {
  props: {
    leaveType: String,
    dateType: String,
    employeeType: String,
    isHeader: Boolean
  },
  computed: {
    firstLayerStyle() {
      const type = leaveTypes.filter(x => x.name === this.leaveType)[0];
      return type ? type.color : "";
    },
    secondLayerStyle() {
      return dateTypeStyles[this.dateType];
    },
    thirdLayerStyle() {
      return employeeTypeStyles[this.employeeType] || {};
    }
  }
};
</script>
<style scoped>
.cell {
  width: 40px;
  height: 26px;
}
</style>
