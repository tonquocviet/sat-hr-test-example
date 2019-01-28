<template>
  <div class="px-4 py-4">
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout column wrap>
          <div>Desciption
            <v-icon size="17">edit</v-icon>
          </div>
          <v-textarea solo v-model="description" name="input-7-4"></v-textarea>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <div>Step 1: Setup
          <v-icon style="cursor: pointer;" @click="isShowModalStep = true" size="17">edit</v-icon>
          <div class="detail-step1">
            <table class="table-step1">
              <tr>
                <td>Policy Name</td>
                <td>Name</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>Country</td>
              </tr>
              <tr>
                <td>Effective Start Date</td>
                <td>20/10/2018</td>
              </tr>
              <tr>
                <td>Effective End Date</td>
                <td>20/10/2019</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Absence Type Code</td>
                <td>Absence Type Code</td>
              </tr>
              <tr>
                <td>Short Description</td>
                <td>Short Description</td>
              </tr>
              <tr>
                <td>Allow Request in ESSD</td>
                <td>true</td>
              </tr>
              <tr>
                <td>Allow Request in ESSD</td>
                <td>false</td>
              </tr>
            </table>
          </div>
        </div>
      </v-flex>
      <ModalFormStep1
        :isShow="isShowModalStep"
        :apiUrl="apiPolicy.getCountries"
        @closeDialog="isShowModalStep = false"
      />
    </v-layout>
  </div>
</template>

<script>
import ModalFormStep1 from "./ModalFormStep1";

export default {
  components: {
    ModalFormStep1
  },
  props: {
    apiPolicy: Object
  },
  data() {
    return {
      description: "",
      isShowModalStep: false
    };
  }
};
</script>

<style>
.table-step1 {
  width: 100%;
  background: white;
  border-collapse: collapse;
  caption-side: bottom;
}
.table-step1 th,
.table-step1 td {
  border: solid 1px #000;
  padding: 10px;
}
</style>


