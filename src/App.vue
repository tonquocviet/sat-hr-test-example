<template>
  <Layout>
    <OrgChartWrapper>
      <HierarchyContainer :dataForHierarchy="hierarchyData"/>
    </OrgChartWrapper>
  </Layout>
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
      hierarchyData: {
        name: "A1",
        children: [
          {
            name: "B1",
            children: [
              {
                name: "C1",
                value: 100
              },
              {
                name: "C2",
                value: 300
              },
              {
                name: "C3",
                value: 200
              }
            ]
          },
          {
            name: "B2",
            value: 200,
            children: [
              {
                name: "T1",
                value: 100
              },
              {
                name: "T2",
                value: 300,
                children: [
                  {
                    name: "Y1",
                    value: 100
                  },
                  {
                    name: "Y2",
                    value: 300
                  },
                  {
                    name: "Y3",
                    value: 200
                  },
                  {
                    name: "Y4",
                    value: 200
                  }
                ]
              },
              {
                name: "T3",
                value: 200,
                children: [
                  {
                    name: "X1",
                    value: 100
                  },
                  {
                    name: "X2",
                    value: 300
                  },
                  {
                    name: "X3",
                    value: 200
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  }
};
</script>
