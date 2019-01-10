<template>
  <v-form ref="form" v-model="valid" lazy-validation class="right-form">
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="object.name"
            item-text="name"
            item-value="id"
            :items="name"
            :rules="[v => !!v || 'Please choose Corporate name']"
            label="Corporate Name"
          ></v-combobox>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="object.company"
            item-text="name"
            item-value="id"
            :items="company"
            :rules="[v => !!v || 'Please choose Company Position']"
            label="Company Position"
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
import { FakeCorporateData } from "../../FakeDataForTesting";

export default {
  props: {
    FakeCorporateData: {
      type: Object,
      default: () => FakeCorporateData
    },
    closeModal: { default: () => closeModal },
    object: {
      type: Object,
      default: function() {
        const data = this.FakeCorporateData;
        return {
          name: data ? data.name : "",
          company: data ? data.company : "",
          nodePosition: data ? data.nodePosition : ""
        };
      }
    },
    name: {
      type: Array,
      default: function() {
        return [
          { id: 1, name: "Wells Fargo" },
          { id: 2, name: "JPMorgan Chase" },
          { id: 3, name: "Berkshire Hathaway" }
        ];
      }
    },
    company: {
      type: Array,
      default: function() {
        return [
          { id: 1, name: "Louisiana Street, Houston, Texas" },
          { id: 2, name: "Travis Street, Houston, Texas" },
          { id: 3, name: "RHJ3+XM Northside, Houston, Texas" }
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
    valid: true
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
      const { name, nodePosition, company } = this.object;
      const data = {
        name: name.id,
        company: company.id,
        nodePosition: nodePosition.id
      };
      return data;
    },
    onCancel() {
      this.closeModal();
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
