<template>
  <v-content>
    <v-container fluid class="pa-0">
      <v-tabs left color="transparent" dark slider-color="primary">
        <v-tab
          v-for="item in Object.keys(settings)"
          :key="item"
          class="primary--text"
          ripple
        >
          {{ item }}
        </v-tab>
        <v-tab-item
          v-for="item in Object.keys(settings)"
          :key="item"
        >
          <Register class="ml-5" v-if="item === 'Register'" :data="settings[item]"/>
          <AddInfo v-if="item === 'AddInfo'" :data="settings[item]" :add="AddInfo"/>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-content>
</template>

<script>
import Register from "./Login/Register";
import AddInfo from "./Login/AddInfo";

export default {
  components: {
    Register,
    AddInfo
  },
  data() {
    return {
      settings: {
        Register: [
          {
            id: 1,
            question: "How many absence days does one full-time employee have?",
            answer: 1
          },
          {
            id: 2,
            question: "How many absence days does one part-time employee have?",
            answer: 2
          },
          {
            id: 3,
            question: "How many absence days does one intern employee have?",
            answer: 3
          }
        ],
        AddInfo: [
          {
            id: 1,
            name: "Lunar year",
            date: "01/01"
          },
          {
            id: 2,
            name: "Hung Vuong",
            date: "10/03"
          }
        ]
      }
    }
  },
  methods: {
    addInfo: function (name, date) {
      const id = this.settings.AddInfo.length + 1;
      this.settings.AddInfo.push({ 
        id,
        name,
        date
      });
    },
    updateBaseline: function (id, answer) {
      let index = this.settings.Baselines.findIndex(q => q.id === id);
      this.settings.Baselines[index].answer = answer;
    }
  }
}
</script>
