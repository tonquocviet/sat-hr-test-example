<template>
  <v-layout row wrap>
    <v-flex md9 sx12>
      <v-flex xs12 right class="right-button-container mb-1">
        <v-btn color="info">Add New Employee</v-btn>
      </v-flex>
      <v-data-table :headers="headers" :items="desserts" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>
            <v-btn flat icon @click="absenceClick(props.item)" class="ma-0" color="black">
              <v-icon>remove_circle</v-icon>
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
      <v-layout>
        <v-flex xs12 sm12 >
          <v-card flat>
            <h3 class="ml-2 pt-2">Tiêu đề</h3>
          </v-card>
          <v-card
            flat
            class="py-1"
          >
            <v-list two-line class="item-card-absence">
              <v-list-tile>
                <div class="v-image-user">
                  <v-avatar>
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    >
                  </v-avatar>
                </div>
                <v-list-tile-sub-title>
                  <span class="font-weight-bold">name</span>
                  <v-layout>
                    <v-icon class="caption">date_range</v-icon>
                    <span class="caption ml-1">start date</span>
                    <v-icon class="caption ml-4">date_range</v-icon>
                    <span class="caption ml-1">end date</span>
                  </v-layout>
                  <v-layout column>
                    <span class="date-off error--text mr-3">dem ngay</span>
                    <div>
                      <v-chip
                        class="mx-0 my-0"
                        small
                        text-color="white"
                      >tag</v-chip>
                    </div>
                  </v-layout>
                </v-list-tile-sub-title>
              </v-list-tile>
            </v-list>
          </v-card>
          <v-card flat>
            <v-layout justify-end>
              <v-btn  flat color="success">View full</v-btn>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
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
          name: "Frozen Yogurt",
          designation: 159,
          joined: 6.0,
          contact: 24,
          email: "vanphong250895@gmail.com"
        },
        {
          name: "Frozen Yogurt",
          designation: 159,
          joined: 6.0,
          contact: 24,
          email: "vanphong250895@gmail.com"
        },
        {
          name: "Frozen Yogurt",
          designation: 159,
          joined: 6.0,
          contact: 24,
          email: "vanphong250895@gmail.com"
        }
      ]
    };
  }
};
</script>