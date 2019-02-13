<template>
  <v-layout row wrap>
    <v-flex md9 sx12>
      <v-flex xs12 right class="right-button-container mb-1">
        <v-btn @click="isShowCreate = true" color="info">Add New Employee</v-btn>
      </v-flex>
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>
            <v-btn flat icon class="ma-0" color="black">
              <v-icon color="error">remove_circle</v-icon>
            </v-btn>
          </td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.designation }}</td>
          <td class="text-xs-left">{{ props.item.joined }}</td>
          <td class="text-xs-left">{{ props.item.contact }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex md3 sx12 class="pl-3">
      <v-layout wrap>
        <ItemEmployeeRight :items="items"></ItemEmployeeRight>
      </v-layout>
    </v-flex>
    <CreateEmployee :employees="desserts" @closeDialog="isShowCreate= false" :isShowCreate="isShowCreate"></CreateEmployee>
  </v-layout>
</template>
<script>
import CreateEmployee from './CreateEmployee'
import ItemEmployeeRight from './ItemEmployeeRight'

export default {
  components: {
    CreateEmployee,
    ItemEmployeeRight
  },
  data() {
    return {
      isShowCreate: false,
      removed: "removed",
      added: "added",
      headers: [
        {
          text: "",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Name", value: "name", align: "left" },
        { text: "Designation", value: "designation", align: "left" },
        { text: "Joined", value: "joined", align: "left" },
        { text: "Contact No.", value: "contact", align: "left" },
        { text: "Email", value: "email", align: "left" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt1",
          designation: 159,
          joined: 6.0,
          contact: 24,
          email: "vanphong250895@gmail.com",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          name: "Frozen Yogurt2",
          designation: 159,
          joined: 6.0,
          contact: 24,
          email: "vanphong250895@gmail.com",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          name: "Frozen Yogurt3",
          designation: 159,
          joined: 6.0,
          contact: 24,
          email: "vanphong250895@gmail.com",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        }
      ],
      items: [
        {
          eraser: "Frozen Yogurt",
          employee: "John",
          date: "25 Aug 2019",
          status: "added"
        },
        {
          eraser: "Frozen Yogurt",
          employee: "John",
          date: "25 Aug 2019",
          status: "removed"
        },
        {
          eraser: "Frozen Yogurt",
          employee: [
            {
              employee: "John",
            },
            {
              employee: "John",
            },
            {
              employee: "John",
            }
          ],
          date: "25 Aug 2019",
          status: "added"
        }
      ],
    };
  }
};
</script>