<template>
 <v-container grid-list-md>
    <v-layout class="header">a</v-layout>
    <v-layout class="main">a</v-layout>
    <v-layout  column class="footer">
      <h3 class="mt-3"> Upcoming leaves </h3>
      <v-card v-for="item in items" :key="item.id" class="mt-3">
        <v-layout class="py-4" >
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">Today</h4>
            <h3>{{ item.day }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">First name</h4>
            <h3>{{ item.first_name }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">Last name</h4>
            <h3>{{ item.last_name }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">Status</h4>
            <h3 v-if="item.status == 'success'" class="success--text ">{{ item.status }}</h3>
            <h3 v-if="item.status == 'pending'" class="orange--text ">{{ item.status }}</h3>
            <h3 v-if="item.status == 'error'" class="error--text ">{{ item.status }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">Address</h4>
            <h3>{{ item.address }}</h3>
          </v-flex>
          <v-flex xs2 v-if="item.status == 'pending'">
            <v-layout class="primary--text text-uppercase py-4">
              <h3 >view</h3>
              <v-icon>trending_flat</v-icon>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
      
      <h3 class="mt-5"> Past leaves </h3>
      <v-card v-for="item in items" :key="item.id" class="mt-3">
        <v-layout class="py-4" >
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">Today</h4>
            <h3>{{ item.day }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">First name</h4>
            <h3>{{ item.first_name }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">Last name</h4>
            <h3>{{ item.last_name }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">Status</h4>
            <h3 v-if="item.status == 'success'" class="success--text ">{{ item.status }}</h3>
            <h3 v-if="item.status == 'pending'" class="orange--text ">{{ item.status }}</h3>
            <h3 v-if="item.status == 'error'" class="error--text ">{{ item.status }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text ">Address</h4>
            <h3>{{ item.address }}</h3>
          </v-flex>
          <v-flex xs2 v-if="item.status == 'pending'">
            <v-layout class="primary--text text-uppercase py-4">
              <h3 >view</h3>
              <v-icon>trending_flat</v-icon>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
 </v-container>
</template>
<script>
export default {
  data () {
    return {
      items: [
        { last_name: "Phong JR", day: "25 Aug, Sun", first_name : "Nguyễn", status: "success", address: "Duy Sơn" },
        { last_name: "Phong JR", day: "25 Aug, Sun", first_name : "Nguyễn", status: "pending", address: "Duy Sơn" },
        { last_name: "Phong JR", day: "25 Aug, Sun", first_name : "Nguyễn", status: "error", address: "Duy Sơn" },
      ]
    }
  }
}
</script>
