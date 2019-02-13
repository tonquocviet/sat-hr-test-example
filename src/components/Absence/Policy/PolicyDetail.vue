<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs color="cyan" dark slider-color="yellow">
        <v-tab v-for="item in itemList" :key="item.id" ripple>{{item.text}}</v-tab>
        <v-tab-item>
          <Overview/>
        </v-tab-item>
        <v-tab-item>
          <EmployeeList></EmployeeList>
        </v-tab-item>
        <v-tab-item>Performance</v-tab-item>
        <v-tab-item>Employee List</v-tab-item>
        <v-tab-item>
          <ChartPolicy/>
        </v-tab-item>
        <v-tab-item>Settings</v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>
<script>
import Overview from "./Overview";
import EmployeeList from "./EmployeeList";
import ChartPolicy from "./chart-policy/Form";

export default {
  components: {
    Overview,
    EmployeeList,
    ChartPolicy
  },
  props: {
    viewMode: String
  },
  data() {
    return {
      itemList: [
        { id: 1, text: "Overview" },
        { id: 2, text: "Employee List" },
        { id: 3, text: "Performance" },
        { id: 4, text: "Settings" }
      ]
    };
  }
};
</script>

