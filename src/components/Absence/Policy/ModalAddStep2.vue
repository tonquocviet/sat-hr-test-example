<template>
  <div>
    <v-btn @click="dialog = true" color="primary" dark class="mb-2">New Reason</v-btn>
    <v-dialog :value="dialog" @input="close" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Reason</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  :rules="[v => !!v || 'Absence Reason is required']"
                  v-model="editedItem.absenceReason"
                  label="Absence Reason"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="editedItem.description"
                  :rules="[v => !!v || 'Description is required']"
                  label="Description"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="editedItem.shortDescription"
                  :rules="[v => !!v || 'Short Description is required']"
                  label="Short Description"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-end>
            <v-btn color="default" flat @click="close">Cancel</v-btn>
            <v-btn color="green" flat @click="save">Create</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    editedItem: Object
  },
  data: () => ({
    valid: true,
    dialog: false
  }),
  methods: {
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$emit("close");
    },
    save() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        this.$refs.form.resetValidation();
        this.$emit("save");
      }
    }
  }
};
</script>
