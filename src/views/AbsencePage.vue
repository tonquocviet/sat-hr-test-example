<template>
  <AbsenceWrapper :apiAbsence="apiAbsence" :detailLinks="detailLinks"/>
</template>

<script>
import AbsenceWrapper from "../components/AbsenceWrapper";

export default {
  components: {
    AbsenceWrapper
  },
  data() {
    const baseUrl =
      "https://elastic-swanson-9b5efe.netlify.com/.netlify/functions/server/api";
    return {
      apiAbsence: {
        filterAbsences: `${baseUrl}/absence/filter`,
        filterWhoAbsencing: `${baseUrl}/absence/filter-absencing`,
        filterUpcommingAbsence: `${baseUrl}/absence/filter-upcomming`,
        getReason: `${baseUrl}/absence/get-reasons`,
        approveRequest: `${baseUrl}/absence/approve-request`,
        getAbsenceHRApprovers: absenceId => `${baseUrl}/absence/${absenceId}/approvers`,
        getCommentAbsence: absenceId => `${baseUrl}/absence/${absenceId}/comments` 
      },
      detailLinks: {
        forAbsenceProfile: "/absence-profile"
      }
    };
  }
};
</script>
