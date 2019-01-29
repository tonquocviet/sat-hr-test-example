<template>
  <div class="px-3 py-3">
    <v-layout row>
      <v-layout column>
        <v-flex xs10>
          <h3 class="headline font-weight-bold">Absence</h3>
        </v-flex>
        <v-flex xs10></v-flex>
      </v-layout>
      <v-flex xs2 row>
        <v-btn color="primary">
          <v-icon>add_circle</v-icon>Add New Absence
        </v-btn>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout>
      <v-flex xs9>
        <AbsenceEmployCard :dataEmployCard="dataEmployCard"/>
        <v-flex sm12 md12>
          <EmployViewContent :items="iistItemsAbsence"/>
        </v-flex>
      </v-flex>
      <v-flex xs3>
        <ListOnTheRight :dataAbsenceList="dataAbsenceList"/>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import AbsenceEmployCard from "../../cards/AbsenceEmployCard";
import ListOnTheRight from "./ListOnTheRight";
import EmployViewContent from "./EmployViewContent";
import { dataEmployCard, iistItemsAbsence, dataAbsenceList } from "../data";
export default {
  components: {
    AbsenceEmployCard,
    EmployViewContent,
    ListOnTheRight
  },
  props: {
    dataEmployCard: {
      type: Array,
      default: () => dataEmployCard
    },
    iistItemsAbsence: {
      type: Array,
      default: () => iistItemsAbsence
    },
    dataAbsenceList: {
      type: Array,
      default: () => dataAbsenceList
    }
  }
};
</script>