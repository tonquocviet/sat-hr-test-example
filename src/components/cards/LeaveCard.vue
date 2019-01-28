<template>
  <v-layout row wrap>
    <v-flex sm12 md12>
      <v-layout row wrap>
        <v-flex
          md3
          class="px-1 py-1"
          v-for="itemLeaveCard in dataLeaveCard"
          :key="itemLeaveCard.id"
        >
          <v-card
            :style="`border-top:7px solid ${itemLeaveCard.type === 1 ? `blue` : null || 
              itemLeaveCard.type === 2 ? `green` : null || 
              itemLeaveCard.type === 3 ? `red` : null || 
              itemLeaveCard.type === 4 ? `purple` : null
            };border-radius:6px`"
          >
            <v-card-title>
              <div style="width:100%">
                <h3>{{itemLeaveCard.name}}</h3>
                <span
                  :class="`font-weight-bold display-1 
                  ${itemLeaveCard.type === 1 ? `blue--text` : null || 
                    itemLeaveCard.type === 2 ? `green--text` : null || 
                    itemLeaveCard.type === 3 ? `red--text` : null || 
                    itemLeaveCard.type === 4 ? `purple--text` : null}`"
                >{{itemLeaveCard.numberAbsence}}</span>
                <br>
                <b>Absence</b>
                <br>
                <v-layout>
                  <v-flex xs6 class="grey--text">Number</v-flex>
                  <v-flex xs6 class="grey--text text-xs-right">{{itemLeaveCard.number}}</v-flex>
                </v-layout>
              </div>
            </v-card-title>
            <v-card-actions class="px-0">
              <v-btn
                flat
                :color="`${
                  itemLeaveCard.type === 1 ? `blue` : null || 
                  itemLeaveCard.type === 2 ? `green` : null || 
                  itemLeaveCard.type === 3 ? `red` : null || 
                  itemLeaveCard.type === 4 ? `purple` : null}`"
              >
                <span>ADJUST</span>
                <v-icon size="15">arrow_forward</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    dataLeaveCard: Array
  }
};
</script>

<style scoped>
@media only screen and (max-width: 960px) {
  .user-img {
    justify-content: center !important;
  }
}
</style>