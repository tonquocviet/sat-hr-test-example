<template>
  <v-flex>
    <v-layout v-for="item in dataAlerts" :key="item.id" row justify-center align-center>
      <v-flex xs1>
        <v-icon v-if="item.type === 'error' " color="black">error</v-icon>
        <v-icon v-if="item.type === 'info' " color="error">cancel</v-icon>
        <v-icon v-if="item.type === 'success' " color="success">check_circle</v-icon>
      </v-flex>
      <v-flex xs10>
        <div class="elevation-1">
          <div class="text-xs-left px-2 pt-1 pb-2" style="height: 50px">{{item.alert}}</div>
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>
<script>
export default {
  props: {
    dataAlerts: Array
  }
};
</script>
