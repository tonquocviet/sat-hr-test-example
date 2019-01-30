<template>
  <div>
    <LeaveRowItem
      @emitPopupAbsenceApproved="emitPopupAbsenceApproved"
      @emitPopupAbsenceRequest="emitPopupAbsenceRequest"
      :title="`Upcoming leaves`"
      :items="dataAbsenceList"
    />
    <LeaveRowItem
      @emitPopupAbsenceApproved="emitPopupAbsenceApproved"
      @emitPopupAbsenceRequest="emitPopupAbsenceRequest"
      :title="`Past leaves`"
      :items="dataUpcommingAbsence"
    />
  </div>
</template>
<script>
import LeaveRowItem from "./LeaveRowItem";
export default {
  props: {
    dataAbsenceList: Array,
    dataUpcommingAbsence: Array
  },
  methods: {
    emitPopupAbsenceApproved() {
      this.$emit("receivePopupAbsenceApproved");
    },
    emitPopupAbsenceRequest(absenceDetail) {
       this.$emit("receivePopupAbsenceRequest", absenceDetail);
    }
  },
  components: {
    LeaveRowItem
  }
};
</script>
