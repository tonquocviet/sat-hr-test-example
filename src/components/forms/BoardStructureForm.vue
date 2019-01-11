<template>
  <v-form ref="form" v-model="valid" lazy-validation class="right-form">
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="nodeDataDetail.employeeName"
            item-text="name"
            item-value="id"
            :items="name"
            :rules="[v => !!v || 'Please employee name']"
            label="Employee name"
          ></v-combobox>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="nodeDataDetail.boardTitle"
            item-text="name"
            item-value="id"
            :items="title"
            :rules="[v => !!v || 'Please Board title']"
            label="Board title"
          ></v-combobox>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-combobox
            v-model="nodeDataDetail.nodeLocation"
            item-text="name"
            item-value="id"
            :items="location"
            :rules="[v => !!v || 'Please node location']"
            label="Node location"
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
    nodeDataDetail: Object,
    name: {
      type: Array,
      default: function() {
        return [
          { id: 1, name: "John Doe" },
          { id: 2, name: "Steven Kan" },
          { id: 3, name: "Kelvin Manc" }
        ];
      }
    },
    title: {
      type: Array,
      default: function() {
        return [
          { id: 1, name: "Administrators" },
          { id: 2, name: "Leader" },
          { id: 3, name: "Personnel" }
        ];
      }
    },
    location: {
      type: Array,
      default: function() {
        return [
          { id: 1, name: "5513 Maple Ave, Dallas, TX 75235" },
          { id: 2, name: "Stemmons Fwy, Dallas, TX 75219" },
          { id: 3, name: "2414 Wycliff Ave, Dallas, TX 75219" }
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
      const { employeeName, boardTitle, nodeLocation } = this.object;
      const data = {
        employeeName: employeeName.id,
        boardTitle: boardTitle.id,
        nodeLocation: nodeLocation.id
      };
      return data;
    },
    onCancel() {
      this.$emit("closeModal");
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
