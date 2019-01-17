<template>
  <Layout>
    <OrgChartWrapper :apiEndPoints="apiEndPoints" :detailLinks="detailLinks"/>
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
    const baseUrl =
      "https://elastic-swanson-9b5efe.netlify.com/.netlify/functions/server/api";
    return {
      apiEndPoints: {
        loadHierarchyData: `${baseUrl}/hierarchy-chart`,
        loadStructureDetails: `${baseUrl}/structure-details`,
        loadCoporateNames: `${baseUrl}/get-coporates`,
        getLocations: `${baseUrl}/query-locations`,
        getNodePositions: `${baseUrl}/get-node-positions`,
        updateStructure: `${baseUrl}/update-structure`,
        getFullCoporates: `${baseUrl}/get-full-coporates`,
        getBoardNames: `${baseUrl}/get-board-names`,
        getEmployees: `${baseUrl}/get-employees`,
        getCountries: `${baseUrl}/get-countries`,
        getCitiesByCountryId: `${baseUrl}/get-cities-by-country-id`,
        getContactPersonnels: `${baseUrl}/get-contact-personels`
      },
      detailLinks: {
        forDepartment: "/detail/branch"
      }
    };
  }
};
</script>
