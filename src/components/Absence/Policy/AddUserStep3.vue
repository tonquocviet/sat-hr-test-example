<template>
  <v-layout row justify-center>
    <v-dialog :value="isShow" @input="cancel" max-width="700">
      <v-card>
        <v-card-title class="headline">Add HR Approvers</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs12>
              <v-autocomplete
                v-model="users"
                :items="people"
                box
                chips
                color="blue-grey lighten-2"
                label="Select"
                item-text="name"
                item-value="name"
                multiple
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    class="chip--select-multi"
                    @input="remove(data.item)"
                  >
                    <UserAvatar
                      :imageUrl="data.item.avatar"
                      :name="data.item.name"
                      unsetImgAvatar="unset-img-avatar"
                      backgroundColor="grey"
                    />
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template slot="item" slot-scope="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-tile-content v-text="data.item"></v-list-tile-content>
                  </template>
                  <template v-else>
                    <v-list-tile-avatar>
                      <UserAvatar
                        :imageUrl="data.item.avatar"
                        :name="data.item.name"
                        backgroundColor="grey"
                      />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" flat="flat" @click="cancel">Cancel</v-btn>
          <v-btn color="green" flat="flat" @click="add">Create</v-btn>
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
    isShow: Boolean
  },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    };

    return {
      users: [],
      people: [
        { name: "Sandra Adams", group: "Group 1", avatar: null },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
        { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
        { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
        { name: "John Smith", group: "Group 2", avatar: srcs[1] },
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] }
      ]
    };
  },
  methods: {
    remove(item) {
      const index = this.users.indexOf(item.name);
      if (index >= 0) this.users.splice(index, 1);
    },
    reset() {
      this.users = [];
    },
    add() {
      const users = this.users.map(name =>
        this.people.find(e => e.name === name)
      );
      this.$emit("addUser", users);
      this.$emit("closeDialog");
      this.reset();
    },
    cancel() {
      this.$emit("closeDialog");
      this.reset();
    }
  }
};
</script>

<style scoped>
.v-dialog__content {
  align-items: unset !important;
  height: unset;
}
</style>

