<template>
  <div class="v-container">
    <v-btn
      color="red"
      dark
      fab
      fixed
      bottom
      right
      @click="dialog = true"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout column wrap>
              <v-flex xs12>
                <v-text-field v-model="newItem.name" label="Holiday Name"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="newItem.date" label="Date"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-layout row>
      <v-flex xs6>
        <v-data-table
          :items="data"
          :headers="headers"
          class="elevation-1"
          hide-actions
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.date }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    add: Function
  },
  data() {
    return {
      headers: [
        {
          text: 'Holiday Name',
          sortable: false
        },
        {
          text: 'Date',
          sortable: false
        }
      ],
      newItem: {
        name: '',
        date: ''
      },
      dialog: false
    }
  },
  methods: {
    close() {
      this.dialog = false;
    },
    save() {
      const { name, date } = this.newItem;
      name && date && this.add(name, date);
      this.dialog = false;
    }
  }
}
</script>
