<template>
  <v-flex xs12 sm12>
    <v-card flat>
      <h3 class="ml-2 pt-2">Ativities</h3>
      <div class="ml-4 pt-2" v-for="item in items" :key="item.id">
        <v-layout colum class="mx-2 mt-3">
          <v-icon class="subheading mr-1">av_timer</v-icon>
          <span>{{ item.date }}, at 20:20:01</span>
        </v-layout>
        <v-flex>
          <a href="#">{{ item.eraser }}</a> 
          <span class="success--text mx-2 font-weight-bold" v-if="item.status ==='added'">added</span>
          <span class="error--text mx-2 font-weight-bold" v-else>removed</span>
          <a href="#">{{ item.employee[0].employee || item.employee }}</a>
          <span v-if="Array.isArray(item.employee)">
            along with
            <a href="" class="ml-2">{{nameEmployee(item.employee)}}</a>
          </span>
        </v-flex>
      </div>
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
    status: String
  },
  methods: {
    nameEmployee(item) {
      return `${item.length - 1} orthers`;
    }
  }
};
</script>

