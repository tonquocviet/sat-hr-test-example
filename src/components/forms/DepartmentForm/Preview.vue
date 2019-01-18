<template>
  <v-form>
    <v-container>
      <v-layout align-center justify-center>
        <div class="v-btn-full">
          <v-btn
            absolute
            dark
            small
            fab
            top
            right
            color="white"
            :href="detailLink + '/' + nodeDataDetail.id"
            target="blank"
          >
            <v-icon class="black--text">open_in_new</v-icon>
          </v-btn>
        </div>
        <div class="v-btn-create">
          <v-btn @click="editForm" absolute dark small fab top right color="green">
            <v-icon>create</v-icon>
          </v-btn>
        </div>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <h3 class="success--text display-1 v-text-h3">Supermodel</h3>
        </v-flex>
      </v-layout>
      <v-flex xs12>
        <h4>Description</h4>
      </v-flex>
      <v-flex xs12>
        <p>{{nodeDataDetail.description}}</p>
      </v-flex>
      <v-layout>
        <v-flex xs12>
          <h4>Insight</h4>
          <div class="v-div-card">
            <div class="div-card">
              <v-card class="v-card">
                <h6
                  :style="nodeDataDetail.summary.newHires.isIncrease ? 'color: green' : 'color:red'"
                  class="v-percent"
                >{{nodeDataDetail.summary.newHires.percent}}%</h6>
                <v-icon
                  class="right"
                  :color="nodeDataDetail.summary.newHires.isIncrease ? 'green' : 'red'"
                >{{nodeDataDetail.summary.newHires.isIncrease ? 'arrow_drop_up' : 'arrow_drop_down'}}</v-icon>
                <v-card-title class="v-card-title">
                  <h1>{{nodeDataDetail.summary.newHires.number}}</h1>
                  <h5>New Hires</h5>
                </v-card-title>
              </v-card>
              <v-card class="v-card">
                <h6
                  :style="nodeDataDetail.summary.managers.isIncrease ? 'color: green' : 'color:red'"
                  class="v-percent"
                >{{nodeDataDetail.summary.managers.percent}}%</h6>
                <v-icon
                  class="right"
                  :color="nodeDataDetail.summary.managers.isIncrease ? 'green' : 'red'"
                >{{nodeDataDetail.summary.managers.isIncrease ? 'arrow_drop_up' : 'arrow_drop_down'}}</v-icon>
                <v-card-title class="v-card-title">
                  <h1>{{nodeDataDetail.summary.managers.number}}</h1>
                  <h5>Managers</h5>
                </v-card-title>
              </v-card>
            </div>
            <div class="div-card">
              <v-card class="v-card">
                <h6
                  :style="nodeDataDetail.summary.employees.isIncrease ? 'color: green' : 'color:red'"
                  class="v-percent"
                >{{nodeDataDetail.summary.employees.percent}}%</h6>
                <v-icon
                  class="right"
                  :color="nodeDataDetail.summary.employees.isIncrease ? 'green' : 'red'"
                >{{nodeDataDetail.summary.employees.isIncrease ? 'arrow_drop_up' : 'arrow_drop_down'}}</v-icon>
                <v-card-title class="v-card-title">
                  <h1>{{nodeDataDetail.summary.employees.number}}</h1>
                  <h5>Employees</h5>
                </v-card-title>
              </v-card>
              <v-card class="v-card">
                <h6
                  :style="nodeDataDetail.summary.team.isIncrease ? 'color: green' : 'color:red'"
                  class="v-percent"
                >{{nodeDataDetail.summary.team.percent}}%</h6>
                <v-icon
                  class="right"
                  :color="this.nodeDataDetail.summary.team.isIncrease ? 'green' : 'red'"
                >{{nodeDataDetail.summary.team.isIncrease ? 'arrow_drop_up' : 'arrow_drop_down'}}</v-icon>
                <v-card-title class="v-card-title">
                  <h1>{{nodeDataDetail.summary.team.number}}</h1>
                  <h5>Teams</h5>
                </v-card-title>
              </v-card>
            </div>
          </div>
        </v-flex>
      </v-layout>
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

<style scoped >
.v-div-card {
  width: 100%;
  height: 230px;
}

.v-text-h3 {
  font-weight: bold;
}

.div-card {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 5px 0px 3px 0px;
}

.v-card-title {
  justify-content: center;
  margin-left: 20px;
  align-items: center;
  height: 100%;
  flex-direction: column;
}

.v-card {
  height: 100px;
  width: 48%;
}

.v-percent {
  position: absolute;
  right: 20px;
  top: 5px;
}

.v-btn-full a {
  top: 8px !important;
}

.v-btn-create button {
  top: 70px !important;
}
</style>
