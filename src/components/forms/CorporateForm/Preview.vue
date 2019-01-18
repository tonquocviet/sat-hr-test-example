<template>
  <v-form>
    <v-container>
      <v-layout align-center justify-center>
        <div class="v-btn-full">
          <v-btn
            absolute
            small
            fab
            top
            right
            light
            :href="detailLink + '/' + nodeDataDetail.id"
            target="blank"
          >
            <v-icon>open_in_new</v-icon>
          </v-btn>
        </div>
        <div class="v-btn-create">
          <v-btn @click="editForm" absolute dark small fab top right color="success">
            <v-icon>create</v-icon>
          </v-btn>
        </div>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <h3 class="success--text headline font-weight-bold">{{nodeDataDetail.name}}</h3>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <h4>Description</h4>
      </v-flex>
      <v-flex xs12>
        <p>{{nodeDataDetail.description}}</p>
      </v-flex>
    </v-container>
  </v-form>
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
<style>
.v-btn-full a {
  top: 8px !important;
}

.v-btn-create button {
  top: 70px !important;
}
</style>
