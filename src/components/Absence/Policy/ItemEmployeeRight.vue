<template>
  <v-flex xs12 sm12>
    <v-card flat>
      <h3 class="ml-2 pt-2">{{ title }}</h3>
      <div class="ml-4 pt-2" v-for="item in items" :key="item.id">
        <v-layout colum class="mx-2 mt-3">
          <v-icon class="subheading mr-1">av_timer</v-icon>
          <span>{{ item.date }}, at 20:20:01</span>
        </v-layout>
        <v-layout colum class="mx-2 pt-2">
          <a href="#">{{ item.eraser }}</a>  
          <h4 class="error--text mx-3" v-if="status ==='removed'">removed</h4>
          <h4 class="success--text mx-3" v-else>added</h4>
          <a href="#">{{ item.employee }}</a>
        </v-layout>
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
    }
  }
</script>

