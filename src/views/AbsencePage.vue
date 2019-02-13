<template>
  <AbsenceWrapper :detailLinks="detailLinks"/>
</template>

<script>
import AbsenceWrapper from "../components/AbsenceWrapper";

export default {
  components: {
    AbsenceWrapper
  },
  data() {
    return {
      detailLinks: {
        forAbsenceProfile: "/absence-profile"
      }
    };
  }
};
</script>
