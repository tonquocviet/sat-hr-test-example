<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>
    <v-btn color="primary">Save</v-btn>
    <v-btn color="default">Cancel</v-btn>
  </v-form>
</template>
<script>
export default {
  props: {
    object: {
      name: String,
      address: String,
      city: String,
      country: String,
      zipCode: String,
      telephone: String,
      contactPersonnel: String,
      nodePosition: String
    }
  },
  data: () => ({
    valid: true,
    nameRules: [v => !!v || "Name is required"],
    addressRules: [v => !!v || "Address is required"]
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>