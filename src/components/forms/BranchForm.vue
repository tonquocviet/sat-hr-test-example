<template>
  <v-form ref="form" v-model="valid" lazy-validation class="right-form">
    <v-container>
      <v-text-field
        v-model="object.name"
        :rules="nameRules"
        label="Branch Name"
        required
        class="mt-0 pt-0"
      ></v-text-field>
      <v-layout>
        <v-flex xs12>
          <v-text-field v-model="object.address" :rules="addressRules" label="Address" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs6>
          <v-select
            v-model="object.country"
            item-text="name"
            item-value="id"
            :items="countries"
            :rules="[v => !!v || 'Country is required']"
            label="Contry"
            required
          ></v-select>
        </v-flex>
        <v-flex xs6>
          <v-select
            v-model="object.city"
            :items="cities"
            :rules="[v => !!v || 'City is required']"
            item-text="name"
            item-value="id"
            label="City"
            required
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs6>
          <v-text-field v-model="object.zipCode" :rules="zipCodeRules" label="Zip Code" required></v-text-field>
        </v-flex>
        <v-flex xs6></v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-text-field
            v-model="object.telephone"
            :rules="telephoneRules"
            label="Phone number"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="object.contactPersonnel"
            item-text="name"
            item-value="id"
            :items="contacts"
            :rules="[v => !!v || 'Please choose Contact Personnel']"
            label="Contact Personnel"
          ></v-combobox>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="object.nodePosition"
            item-text="name"
            item-value="id"
            :items="nodes"
            :rules="[v => !!v || 'Please choose position']"
            label="Node position"
          ></v-combobox>
        </v-flex>
      </v-layout>
      <v-btn v-on:click="onSave" color="primary">Save</v-btn>
      <v-btn v-on:click="onCancel" color="default">Cancel</v-btn>
    </v-container>
  </v-form>
</template>
<script>
export default {
  props: {
    object: {
      type: Object,
      default: function() {
        return {
          name: "",
          address: "",
          city: "",
          country: "",
          zipCode: "",
          telephone: "",
          contactPersonnel: "",
          nodePosition: ""
        };
      }
    },
    countries: {
      type: Array,
      default: function() {
        return [{ id: "usa", name: "USA" }];
      }
    },
    cities: {
      type: Array,
      default: function() {
        return [{ id: "tx", name: "Texas" }];
      }
    },
    contacts: {
      type: Array,
      default: function() {
        return [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Steven Kan" },
          { id: 3, name: "Kelvin Manc" }
        ];
      }
    },
    nodes: {
      type: Array,
      default: function() {
        return [
          { id: 1, name: "Branch Texas" },
          { id: 2, name: "Branch Nothing" },
          { id: 3, name: "Branch Bank North" }
        ];
      }
    }
  },
  data: () => ({
    valid: true,
    nameRules: [v => !!v || "Name is required"],
    addressRules: [v => !!v || "Address is required"],
    zipCodeRules: [v => !!v || "Zip code is required"],
    telephoneRules: [v => !!v || "Phone number is required"]
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
    },
    onSave() {
      const data = {
        ...this.object,
        contactPersonnel: this.object.contactPersonnel.id,
        nodePosition: this.object.nodePosition.id
      };
      return data;
    },
    onCancel() {
      
    }
  }
};
</script>

<style scoped>
.right-form .v-text-field {
  padding-top: 0px;
  margin-top: 0px;
}
</style>
