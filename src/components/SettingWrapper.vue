<template>
  <v-content>
    <v-container fluid class="pa-0">
      <v-tabs left color="transparent" dark slider-color="primary">
        <v-tab
          v-for="item in Object.keys(settings)"
          :key="item"
          class="primary--text"
          ripple
        >{{ item }}</v-tab>
        <v-tab-item v-for="item in Object.keys(settings)" :key="item">
          <Baselines v-if="item === 'Baselines'" :data="settings[item]"/>
          <Holiday v-if="item === 'Holiday'" :data="settings[item]" @addHoliday="addHoliday"/>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-content>
</template>

<script>
import Baselines from "./Setting/Baselines";
import Holiday from "./Setting/Holiday";

export default {
  components: {
    Baselines,
    Holiday
  },
  data() {
    return {
      settings: {
        Baselines: [
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
        Holiday: [
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
    };
  },
  methods: {
    addHoliday: function({ name, date }) {
      const id = this.settings.Holiday.length + 1;
      this.settings.Holiday.push({
        id,
        name,
        date
      });
    },
    updateBaseline: function(id, answer) {
      let index = this.settings.Baselines.findIndex(q => q.id === id);
      this.settings.Baselines[index].answer = answer;
    }
  }
};
</script>
