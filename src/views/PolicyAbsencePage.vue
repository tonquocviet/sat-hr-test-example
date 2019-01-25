<template>
  <PolicyWrapper :apiPolicy="apiPolicy"/>
</template>

<script>
import PolicyWrapper from "../components/PolicyAbsenceWrapper";

export default {
  components: {
    PolicyWrapper
  },
  data() {
    const baseUrl =
      "https://elastic-swanson-9b5efe.netlify.com/.netlify/functions/server/api";
    return {
      apiPolicy: {
        filterPolicy: `${baseUrl}/absence-policy/filter`
      }
    };
  }
};
</script>
