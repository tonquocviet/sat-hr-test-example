<template>
  <div class="px-4 py-4">
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout column wrap>
          <v-layout>
            <h2>Desciption</h2>
            <v-icon style="cursor: pointer;" size="20">edit</v-icon>
          </v-layout>
          <v-textarea solo v-model="description" name="input-7-4"></v-textarea>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <Step1 @openDialog="isShowModalStep1 = true"/>
      </v-flex>
      <ModalFormStep1
        :isShow="isShowModalStep1"
        :apiUrl="apiPolicy.getCountries"
        @closeDialog="isShowModalStep1 = false"
      />
    </v-layout>
  </div>
</template>

<script>
import Step1 from "./Step1";
import ModalFormStep1 from "./ModalFormStep1";

export default {
  components: {
    Step1,
    ModalFormStep1
  },
  props: {
    apiPolicy: Object
  },
  data() {
    return {
      description: "",
      isShowModalStep1: false
    };
  }
};
</script>

