<template>
  <v-layout>
    <v-flex xs12>
      <!-- start who are absence -->
      <v-card flat>
        <h3 class="ml-2 pt-2">{{ title }}</h3>
      </v-card>
      <v-card flat v-for="item in items" :key="item.id" @click="showDetail(item)">
        <v-list two-line class="item-card-absence">
          <v-list-tile>
            <v-list-tile-avatar>
              <img :src="item.avatar ">
            </v-list-tile-avatar>
            <v-list-tile-sub-title>
              <span class="font-weight-bold">{{ item.name }}</span>
              <v-layout>
                <v-icon class="caption">date_range</v-icon>
                <span class="caption ml-1">{{ item.date_start }}</span>
                <v-icon class="caption ml-4">date_range</v-icon>
                <span class="caption ml-1">{{ item.date_end }}</span>
              </v-layout>
              <v-layout>
                <span class="date-off error--text mr-3">1 day ago</span> |
                <span class="ml-3">LeeSin Jr</span>
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
      <!-- end who are absence -->
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    items: Array,
    title: String
  },
  methods: {
    showDetail(item) {
      return item;
    }
  }
};
</script>
<style scoped >
.item-card-absence {
  cursor: pointer;
}
.item-card-absence:hover {
  background-color: #eeeeee;
}
</style>