<template>
  <v-layout right>
    <v-flex xs4 v-for="item in items" :key="item.id">
      <v-btn target="blank" :href="item.downloadLink" flat small color="primary">
        <v-icon v-if="item.type == 'doc'">description</v-icon>
        <v-icon v-else-if="item.type == 'img'">photo</v-icon>
        <v-icon v-else>attach_file</v-icon>
        {{ item.name }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: {
      items: Array
    }
  }
</script>

