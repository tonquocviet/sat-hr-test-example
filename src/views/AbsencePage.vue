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
    return {
      apiAbsence: this.apiAbsence,
      detailLinks: {
        forAbsenceProfile: "/absence-profile"
      }
    };
  }
};
</script>
