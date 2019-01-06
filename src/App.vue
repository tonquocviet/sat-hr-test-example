<template>
  <hierarchy-container/>
</template>

<script>
import OrgChartWrapper from "./components/OrgChartWrapper";
import Layout from "./components/layouts/Layout";
import HierarchyContainer from "./components/hierarchy/HierarchyContainer";

export default {
  name: "App",
  components: {
    OrgChartWrapper,
    Layout,
    HierarchyContainer
  },
  data() {
    return {
      //
    };
  }
};
</script>
