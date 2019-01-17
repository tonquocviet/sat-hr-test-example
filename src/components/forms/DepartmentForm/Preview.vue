<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h4>{{nodeDataDetail.name.name}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4>{{nodeDataDetail.nodePosition.name}}</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <p>{{nodeDataDetail.description}}</p>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <h4>{{nodeDataDetail.name.name}}</h4>
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
</template>

<script>
export default {
  props: {
    nodeDataDetail: Object
  }
};
</script>

<style scoped >
.v-div-card {
  width: 100%;
  height: 230px;
  background: #f3f4f8;
}

.div-card {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  padding: 8px 5px 3px 5px;
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
  width: 45%;
}

.v-percent {
  position: absolute;
  right: 20px;
  top: 5px;
}
</style>
