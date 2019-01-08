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
          nodePosition: ""
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
      const { name, nodePosition } = this.object;
      const data = {
        name: name.id,
        nodePosition: nodePosition.id
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
