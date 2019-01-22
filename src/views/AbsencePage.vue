<template>
  <AbsenceWrapper :apiAbsence="apiAbsence"/>
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
        filterWhoAbsencing: `${baseUrl}/absence/filter-absencing`
      }
    };
  }
};
</script>
