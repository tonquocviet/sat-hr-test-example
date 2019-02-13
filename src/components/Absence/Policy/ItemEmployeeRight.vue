<template>
  <v-flex xs12 sm12>
    <v-card flat>
      <h3 class="ml-2 pt-2">Employee activity</h3>
      <div class="ml-4 pt-2" v-for="item in items" :key="item.id">
        <v-layout colum class="mx-2 mt-3">
          <v-icon class="subheading mr-1">av_timer</v-icon>
          <span>{{ item.date }}, at 20:20:01</span>
        </v-layout>
        <v-layout colum class="mx-2 pt-2">
          <a href="#">{{ item.eraser }}</a>  
          <h4 class="success--text mx-3" v-if="item.status ==='added'">add</h4>
          <h4 class="error--text mx-3" v-else>removed</h4>
          <a href="#">{{ item.employee[0].employee || item.employee }} </a>
           <div v-if="Array.isArray(item.employee)" class="px-2">
            <span> along with </span>
           <a href="">{{nameEmployee(item.employee)}}</a>
           </div>
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
    },
    methods: {
      nameEmployee(item) {
        return `${(item.length - 1)} orthers`;
      }
    },
  }
</script>

