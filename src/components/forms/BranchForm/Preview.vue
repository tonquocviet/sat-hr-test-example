<template>
   <v-container>
    <v-layout align-center justify-center>
      <div class="v-btn-full">
        <v-btn
          absolute
          light
          small
          fab
          top
          right
          :href="detailLink + '/' + nodeDataDetail.id"
          target="blank"
        >
          <v-icon>open_in_new</v-icon>
        </v-btn>
      </div>
      <div class="v-btn-create">
        <v-btn @click="editForm" absolute small fab top right color="success">
          <v-icon>create</v-icon>
        </v-btn>
      </div>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-layout>
          <v-flex xs12>
            <h3 class="success--text headline font-weight-bold">{{nodeDataDetail.name}}</h3>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <h3 class="mt-4">
      <span>
        <v-icon>location_on</v-icon>
      </span>
      {{nodeDataDetail.address}}
    </h3>
    <v-layout>
      <v-flex xs12>
        <h4 class="mt-4">
          <span>
            <v-icon>person</v-icon>
            {{nodeDataDetail.contactPersonnel.name}}
          </span>
          <span class="ml-5">
            <v-icon>phone</v-icon>
            {{nodeDataDetail.telephone}}
          </span>
        </h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h3 class="mt-4">Description</h3>
        {{nodeDataDetail.description}}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    nodeDataDetail: Object,
    editForm: Function,
    detailLink: String
  }
};
</script>

<style scoped >
.v-div-card {
  width: 100%;
  height: 230px;
  background: #f3f4f8;
}
.v-btn-full a {
  top: 8px !important;
}
.v-btn-create button {
  top: 70px !important;
}
</style>
