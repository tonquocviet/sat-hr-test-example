<template>
  <v-form ref="form" v-model="valid" lazy-validation class="right-form">
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-autocomplete
            v-model="nodeDataDetail.name"
            cache-items
            :async-loading="corporateLoading"
            item-text="name"
            item-value="id"
            :items="corporates"
            :rules="[v => !!v || 'Please choose Corporate name']"
            :search-input.sync="corporateSearch"
            return-object
            label="Corporate Name"
          ></v-autocomplete>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="nodeDataDetail.company"
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
            v-model="nodeDataDetail.nodePosition"
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
    nodeDataDetail: Object,
    apiEndPoints: Object,
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
  data() {
    return {
      valid: true,
      corporateLoading: false,
      corporates: [this.nodeDataDetail.name],
      corporateSearch: null
    };
  },

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
      const { name, nodePosition, company } = this.nodeDataDetail;
      const data = {
        name: name.id,
        company: company.id,
        nodePosition: nodePosition.id
      };
      console.log(data);
    },
    onCancel() {
      this.$emit("closeModal");
    }
  },
  watch: {
    corporateSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.loadCoporateNames}`, {
            params: {
              s: val
            }
          })
          .then(res => (this.corporates = res.data));
      }
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
