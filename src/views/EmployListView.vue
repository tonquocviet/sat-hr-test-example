<template>
  <EmployViewWrapper :apiListEmployView="apiListEmployView"/>
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
      apiListEmployView: {
        filterWhoAbsencing: `${baseUrl}/absence/filter-absencing`
      }
    };
  }
};
</script>