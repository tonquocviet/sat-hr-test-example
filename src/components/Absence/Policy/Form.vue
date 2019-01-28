<template>
 <v-layout row wrap>
   <v-flex xs12>
     <v-tabs color="cyan" dark slider-color="yellow">
       <v-tab v-for="item in itemList" :key="item.id" ripple>{{item.text}}</v-tab>
       <v-tab-item>
         tab overview
       </v-tab-item>
       <v-tab-item>
         <EmployeeList></EmployeeList>
       </v-tab-item>
       <v-tab-item>Performance</v-tab-item>
       <v-tab-item>Settings</v-tab-item>
     </v-tabs>
   </v-flex>
 </v-layout>
</template>
<script>
import PolicyList from "./PolicyList";
import EmployeeList from "./EmployeeList";
export default {
 components: {
   PolicyList,
   EmployeeList
 },
 props: {
   viewMode: String,
   apiPolicy: Object
 },
 methods: {
   changeViewMode(isListView) {
     this.$emit("changeViewMode", isListView ? "list" : "card");
   }
 },
 data() {
   return {
     pageIndex: 0,
     loading: true,
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
<style scoped>
.right-button-container {
 position: relative;
 z-index: 1;
}
</style>