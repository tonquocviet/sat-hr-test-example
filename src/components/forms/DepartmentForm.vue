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
            label="Corporate Name"
            return-object
          ></v-autocomplete>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-autocomplete
            v-model="nodeDataDetail.nodePosition"
            cache-items
            :async-loading="nodePositionLoading"
            item-text="name"
            item-value="id"
            :items="nodePositions"
            :rules="[v => !!v || 'Please choose Parrent Node']"
            :search-input.sync="nodePositionSearch"
            return-object
            label="Node Position"
          ></v-autocomplete>
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
    nodeDataDetail: Object,
    apiEndPoints: Object
  },
  data() {
    return {
      valid: true,
      corporateLoading: false,
      corporates: this.nodeDataDetail.name ? [this.nodeDataDetail.name] : [],
      corporateSearch: null,
      nodePositionLoading: false,
      nodePositions: this.nodeDataDetail.nodePosition
        ? [this.nodeDataDetail.nodePosition]
        : [],
      nodePositionSearch: null
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
      if (this.$refs.form.validate()) {
        const { name, nodePosition } = this.nodeDataDetail;
        const data = {
          name: name,
          nodePosition: nodePosition
        };
        this.$emit("saveDetails", data);
      }
    },
    onCancel() {
      this.$emit("closeModal");
    }
  },
  watch: {
    corporateSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getFullCoporates}`, {
            params: {
              s: val
            }
          })
          .then(res => (this.corporates = res.data));
      }
    },
    nodePositionSearch(val) {
      if (val) {
        this.$http
          .get(`${this.apiEndPoints.getNodePositions}`, {
            params: {
              q: val
            }
          })
          .then(res => (this.nodePositions = res.data));
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
