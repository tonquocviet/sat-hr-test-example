<template>
  <div class="v-container">
    <div v-for="item in data" :key="item.id">
      <v-card>
        <v-card-text>
          <v-layout row>
            <v-flex xs5>
              <v-subheader class="align-right">{{ item.question }}</v-subheader>
            </v-flex>
            <v-flex xs1>
              <v-text-field
                label="days"
                :value="item.answer"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>
