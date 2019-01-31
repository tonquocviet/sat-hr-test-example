<template>
  <MaterialPanel
    panel-title="Step 2"
    panel-sub-title="Absence Reasons"
    :readonly="true"
    :isShowEdit="false"
  >
    <template>
      <v-layout class="px-3 py-2">
        <v-flex xs12 class="px-2 pb-3 pt-2">
          <v-data-table :headers="headers" :items="desserts" class="elevation-1 custom-table-step2">
            <template slot="items" slot-scope="props">
              <td>
                <v-text-field
                  style="font-size:14px"
                  v-if="editId === props.item.id"
                  v-model="editedItem.absenceReason"
                  label="Absence Reason"
                ></v-text-field>
                <span v-else>{{ props.item.absenceReason }}</span>
              </td>
              <td class="text-xs-left">
                <v-text-field
                  v-if="editId === props.item.id"
                  v-model="editedItem.description"
                  label="Description"
                ></v-text-field>
                <span v-else>{{ props.item.description }}</span>
              </td>
              <td class="text-xs-left">
                <v-text-field
                  v-if="editId === props.item.id"
                  v-model="editedItem.shortDescription"
                  label="Short description"
                ></v-text-field>
                <span v-else>{{ props.item.shortDescription }}</span>
              </td>
              <td class="justify-center layout px-0">
                <v-icon v-if="editId === props.item.id" size="20" class="mr-2" @click="save">save</v-icon>
                <v-icon v-else size="20" class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon v-if="editId === props.item.id" size="20" class="mr-2" @click="close">cancel</v-icon>
                <v-icon v-else size="20" @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </template>
  </MaterialPanel>
</template>

<script>
import MaterialPanel from "../../panels/MaterialPanel";

export default {
  components: {
    MaterialPanel
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Absence Reason",
        align: "left",
        sortable: false,
        value: "absenceReason"
      },
      {
        text: "description",
        align: "left",
        sortable: false,
        value: "description"
      },
      {
        text: "Short description",
        align: "left",
        sortable: false,
        value: "shortDescription"
      },
      { text: "Actions", align: "center", sortable: false, value: "actions" }
    ],
    desserts: [],
    editedIndex: -1,
    editId: "",
    editedItem: {
      absenceReason: "",
      description: "",
      shortDescription: ""
    },
    defaultItem: {
      absenceReason: "",
      description: "",
      shortDescription: ""
    }
  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [
        {
          id: 1,
          absenceReason: "Frozen Yogurt",
          description: "Other",
          shortDescription: "Other"
        },
        {
          id: 2,
          absenceReason: "Ice cream sandwich",
          description: "Regular",
          shortDescription: "Regular"
        },
        {
          id: 3,
          absenceReason: "Eclair",
          description: "Forced",
          shortDescription: "Forced"
        },
        {
          id: 4,
          absenceReason: "Cupcake",
          description: "Scheduled",
          shortDescription: "Scheduled"
        },
        {
          id: 5,
          absenceReason: "Gingerbread",
          description: "Other",
          shortDescription: "Other"
        },
        {
          id: 6,
          absenceReason: "Jelly bean",
          description: "Regular",
          shortDescription: "Regular"
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editId = item.id;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },
    close() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.editId = "";
    },
    save() {
      Object.assign(this.desserts[this.editedIndex], this.editedItem);
      this.close();
    }
  }
};
</script>

<style>
.custom-table-step2 .v-table__overflow .v-table thead th {
  font-size: 14px;
}
.custom-table-step2 .v-table__overflow .v-table tbody td {
  font-size: 14px;
}
.custom-table-step2 .v-table__overflow .v-table tbody .v-text-field input {
  font-size: 14px;
}
</style>
