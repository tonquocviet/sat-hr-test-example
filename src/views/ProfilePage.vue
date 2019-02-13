<template>
  <ProfileWrapper :apiAbsence="apiAbsence"/>
</template>

<script>
import ProfileWrapper from "../components/ProfileWrapper";

export default {
  components: {
    ProfileWrapper
  },
  data() {
    const baseUrl =
      "https://elastic-swanson-9b5efe.netlify.com/.netlify/functions/server/api";
    return {
      apiAbsence: {
        getReason: `${baseUrl}/absence/get-reasons`,
        filterWhoAbsencing: `${baseUrl}/absence/filter-absencing`,
        filterUpcommingAbsence: `${baseUrl}/absence/filter-upcomming`,
        getAbsenceHRApprovers: absenceId =>
          `${baseUrl}/absence/${absenceId}/approvers`,
        getAbsenceDaysOff: id => `${baseUrl}/absence-profile/${id}/leave-data`
      }
    };
  }
};
</script>
