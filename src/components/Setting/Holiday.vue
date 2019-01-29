<template>
  <div class="v-container">
    <v-btn color="red" dark fab fixed bottom right @click="dialog = true">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="newItem.name"
                    :rules="[v => !!v || 'Holiday Name is required']"
                    label="Holiday Name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-menu
                    :close-on-content-click="false"
                    v-model="menu"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="computedDate"
                      :rules="[v => !!v || 'Date is required']"
                      label="Date"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="newItem.date" no-title @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="default" flat @click="close">Cancel</v-btn>
            <v-btn color="primary" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-layout row>
      <v-flex xs6>
        <v-data-table :items="data" :headers="headers" class="elevation-1" hide-actions>
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
    data: Array
  },
  data() {
    return {
      headers: [
        {
          text: "Holiday Name",
          sortable: false
        },
        {
          text: "Date",
          sortable: false
        }
      ],
      newItem: {
        name: "",
        date: ""
      },
      dialog: false,
      menu: false
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("addHoliday", {
          name: this.newItem.name,
          date: this.computedDate
        });
        this.dialog = false;
        setTimeout(() => {
          this.newItem = {
            name: "",
            date: ""
          };
          this.$refs.form.resetValidation();
        }, 300);
      }
    }
  },
  computed: {
    computedDate() {
      const { date } = this.newItem;
      if (!date) return null;

      const [, month, day] = date.split("-");
      return `${month}/${day}`;
    }
  }
};
</script>
