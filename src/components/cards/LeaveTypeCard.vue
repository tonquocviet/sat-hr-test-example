<template>
  <v-flex md3 class="px-1 py-1">
    <v-card style="border-radius: 5px">
      <div :class="leaveTypeColor(leaveData.name) + ' card-header'"></div>
      <v-card-title>
        <div style="width:100%">
          <h3>{{ leaveData.name }}</h3>
          <v-chip class="font-weight-bold white--text" :color="leaveTypeColor(leaveData.name)">{{ leaveData.available }}/{{ leaveData.totals }}</v-chip>
          <br>
          <b>Available</b>
          <br>
        </div>
      </v-card-title>
      <v-card-actions class="px-0">
        <v-btn flat :color="leaveTypeColor(leaveData.name)" @click="isShowModalAdjust = true">
          <span>{{ type }}</span>
          <v-icon size="15">arrow_forward</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <ModalAdjust :leaveType="leaveData.name" :employeeName="employeeName" :effectiveDate="leaveData.effectiveDate" :isShowModalAdjust="isShowModalAdjust" @closeDialog="isShowModalAdjust = false"/>
  </v-flex>
</template>
<script>
import { leaveTypes } from '@/config.js';
import ModalAdjust from '@/components/Absence/Profile/ModalAdjust';
export default {
  components: {
    ModalAdjust
  },
  props: {
    leaveData: Object,
    type: String,
    employeeName: String
  },
  data() {
    return {
      isShowModalAdjust: false
    }
  },
  methods: {
    leaveTypeColor(name) {
      return (
        leaveTypes.find(x => x.name === name) || {
          color: "primary"
        }
      ).color;
    }
  },
}
</script>

<style scoped>
.card-header {
  height: 5px;
  border-radius: 5px 5px 0 0;
}
</style>
