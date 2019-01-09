<template>
  <Layout>
    <OrgChartWrapper :apiEndPoints="apiEndPoints"/>
  </Layout>
</template>

<script>
import OrgChartWrapper from "./components/OrgChartWrapper";
import Layout from "./components/layouts/Layout";

export default {
  name: "App",
  components: {
    OrgChartWrapper,
    Layout
  },
  data() {
    const baseUrl = "https://testingabc.com/api";
    return {
      apiEndPoints: {
        loadHierarchyData: `${baseUrl}/hierarchy-chart/`
      }
    };
  }
};
</script>
