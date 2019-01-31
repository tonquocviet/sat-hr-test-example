<template>
  <EmployViewWrapper :apiEmploy="apiEmploy"/>
</template>

<script>
import EmployViewWrapper from "../components/EmployViewWrapper";
export default {
  components: {
    EmployViewWrapper
  },
  data() {
    const baseUrl =
      "https://elastic-swanson-9b5efe.netlify.com/.netlify/functions/server/api";
    return {
      apiEmploy: {
        getReason: `${baseUrl}/absence/get-reasons`,
        filterWhoAbsencing: `${baseUrl}/absence/filter-absencing`,
        filterUpcommingAbsence: `${baseUrl}/absence/filter-upcomming`,
        approveRequest: `${baseUrl}/absence/approve-request`,
        rejectRequest: `${baseUrl}/absence/reject-request`,
        getAbsenceHRApprovers: absenceId =>
          `${baseUrl}/absence/${absenceId}/approvers`
      }
    };
  }
};
</script>