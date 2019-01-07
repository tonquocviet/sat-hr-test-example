<template>
  <Layout>
    <OrgChartWrapper />
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
    return {};
  }
};
</script>
