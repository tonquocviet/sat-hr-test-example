<template>
  <v-layout row justify-center>
    <v-dialog :value="isShowCreate" @input="$emit('closeDialog')" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add new Employees to this Policy</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <v-autocomplete
                item-text="name"
                item-value="name"
                :items="employees"
                label="Choose name employer"
                return-object
                multiple
              ></v-autocomplete>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" flat @click="$emit('closeDialog')">Cancel</v-btn>
          <v-btn color="success"  flat @click="$emit('closeDialog')">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    isShowCreate: Boolean,
    employees: Array
  },
}
</script>
