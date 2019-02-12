<template>
  <PolicyDetailWrapper :apiPolicy="apiPolicy"/>
</template>

<script>
import PolicyDetailWrapper from "../components/PolicyDetailWrapper";

export default {
  components: {
    PolicyDetailWrapper
  },
  data() {
    const baseUrl =
      "https://elastic-swanson-9b5efe.netlify.com/.netlify/functions/server/api";
    return {
      apiPolicy: {
        getCountries: `${baseUrl}/get-countries`,
        filterPolicy: `${baseUrl}/absence/filter`
      }
    };
  }
};
</script>
