<template>
  <v-layout row justify-center>
    <v-dialog :value="isShowCreate" @input="$emit('closeDialog')" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add new Employees to this Policy</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-flex xs12>
              <v-autocomplete
              v-model="employee"
              :items="employees"
              box
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
              multiple
            >
              <template
                slot="selection"
                slot-scope="data"
              >
                <v-chip
                  :selected="data.selected"
                  close
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  <UserAvatar
                    :imageUrl="data.item.avatar"
                    :name="data.item.name"
                    width="unset"
                    backgroundColor="grey"
                  />
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template
                slot="item"
                slot-scope="data"
              >
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar>
                    <UserAvatar
                      :imageUrl="data.item.avatar"
                      :name="data.item.name"
                      width="unset"
                      backgroundColor="grey"
                    />
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-autocomplete>
            </v-flex>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" flat @click="$emit('closeDialog')">Cancel</v-btn>
          <v-btn color="success"  flat @click="$emit('closeDialog')">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import UserAvatar from "../../avatars/Avatar";

export default {
  components: {
    UserAvatar
  },
  props: {
    isShowCreate: Boolean,
    employees: Array
  },
  data(){
    return {
      employee: []
    }
  },
  methods: {
    remove (item) {
      const index = this.employee.indexOf(item.name)
      if (index >= 0) this.employee.splice(index, 1)
    }
  }
}
</script>
