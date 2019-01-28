<template>
  <div>
    <v-layout>
      <h2>Step 1: Setup</h2>
      <v-icon style="cursor: pointer;" @click="$emit('openDialog')" size="20">edit</v-icon>
    </v-layout>
    <v-card>
      <v-layout row wrap class="pt-3">
        <v-flex xs12 sm6 class="px-2">
          <v-text-field value="John Doe" label="Policy Name" readonly></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 class="px-2">
          <v-text-field value="Usa" label="Country" readonly></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 class="px-2">
          <v-text-field value="true" label="Status" readonly></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 class="px-2">
          <v-text-field value="Absence Type Code" label="Absence Type Code" readonly></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 class="px-2">
          <v-text-field value="20/10/2018" label="Effective Start Date" readonly></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 class="px-2">
          <v-text-field value="20/12/2018" label="Effective End Date" readonly></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 class="px-2">
          <v-checkbox readonly label="Allow Request in ESSD" class="pa-0 ma-0" v-model="checkbox"></v-checkbox>
          <v-checkbox readonly label="Allow Request in ESSD" class="pa-0 ma-0" v-model="checkbox"></v-checkbox>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return { checkbox: true };
  }
};
</script>



