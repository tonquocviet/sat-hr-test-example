<template>
  <div>
    <h3 class="mt-3">Upcoming Absence</h3>
    <LeaveRowItem
      @emitPopupAbsenceApproved="emitPopupAbsenceApproved"
      @emitPopupAbsenceRequest="emitPopupAbsenceRequest"
      :items="dataUpcommingAbsence"
    />
    <h3 class="mt-3">Past Absence</h3>
    <LeaveRowItem
      @emitPopupAbsenceApproved="emitPopupAbsenceApproved"
      @emitPopupAbsenceRequest="emitPopupAbsenceRequest"
      :items="dataWhoAbsencing"
    />
  </div>
</template>
<script>
import LeaveRowItem from "../Profile/LeaveRowItem";
export default {
  props: {
    dataWhoAbsencing: Array,
    dataUpcommingAbsence: Array
  },
  components: {
    LeaveRowItem
  },
  methods: {
    emitPopupAbsenceApproved() {
      this.$emit("receivePopupAbsenceApproved");
    },
    emitPopupAbsenceRequest(absenceDetail) {
      this.$emit("receivePopupAbsenceRequest", absenceDetail);
    }
  }
};
</script>
