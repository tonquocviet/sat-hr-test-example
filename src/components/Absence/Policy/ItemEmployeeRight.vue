<template>
  <v-flex xs12 sm12>
    <v-card flat>
      <h3 class="ml-2 pt-2">{{ title }}</h3>
    </v-card>
    <v-card v-for="item in items" :key="item.id" flat class="py-1">
      <v-list two-line class="item-card-absence">
        <v-list-tile>
          <div class="v-image-user">
            <v-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-avatar>
          </div>
          <v-list-tile-sub-title class="ml-3">
            <span class="font-weight-bold">{{ item.name }}</span>
            <v-layout>
              <v-icon class="caption">date_range</v-icon>
              <span class="caption ml-1">{{ item.startDate }}</span>
              <v-icon class="caption ml-4">date_range</v-icon>
              <span class="caption ml-1">{{ item.endDate }}</span>
            </v-layout>
            <v-layout column>
              <span class="date-off error--text mr-3">2 day ago</span>
              <div>
                <v-chip v-for="tag in item.tags" :key="tag" class="mx-0 my-0" small text-color="white">{{ tag }}</v-chip>
              </div>
            </v-layout>
          </v-list-tile-sub-title>
        </v-list-tile>
      </v-list>
    </v-card>
    <v-card flat>
      <v-layout justify-end>
        <v-btn flat color="success">View full</v-btn>
      </v-layout>
    </v-card>
  </v-flex>
</template>
<script>
  export default {
    props: {
      items: Array,
      title: String,
    }
  }
</script>

