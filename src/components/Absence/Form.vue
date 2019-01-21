<template>
  <div>
    <v-flex xs12 md9 class="type-selector-container" style="margin-top:20px">
      <v-flex xs12 right position absolute>
        <v-btn color="info" class="v-btn-add-filter">Add New Absence</v-btn>
        <v-btn icon class="primary--text v-btn-add-filter">
          <v-icon>filter_list</v-icon>
        </v-btn>
        <v-btn
          v-if="viewMode === 'card'"
          icon
          class="v-btn-add-filter"
          @click="changeViewMode(true)"
        >
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn v-else icon class="v-btn-add-filter" @click="changeViewMode(false)">
          <v-icon>apps</v-icon>
        </v-btn>
      </v-flex>
      <v-tabs color="transparent" dark slider-color="primary">
        <v-tab v-for="item in itemList" :key="item.id" ripple class="primary--text">{{ item.text }}</v-tab>
        <v-tab-item>
          <AbsenceList/>
        </v-tab-item>
        <v-tab-item>Approved Request</v-tab-item>
        <v-tab-item>Rejected Request</v-tab-item>
      </v-tabs>
    </v-flex>
    <v-flex xs12 md3></v-flex>
    <ModalListDetail title="Who's on leave" :data="data" :value="value"/>
  </div>
</template>
<script>
import AbsenceList from "./AbsenceList";
import ModalListDetail from "./ModalListDetail";

export default {
  components: {
    AbsenceList,
    ModalListDetail
  },
  props: {
    viewMode: String
  },
  methods: {
    changeViewMode(isListView) {
      this.$emit("changeViewMode", isListView ? "list" : "card");
    }
  },
  data() {
    return {
      value: {
        isOpen: true,
        end: 3
      },
      itemList: [
        { text: "Peding Requests" },
        { text: "Approved Request" },
        { text: "Rejected Request" }
      ],
      data: [
        {
          id: 1,
          name: "John Leider",
          work: "Development",
          start: new Date(2019, 1, 4),
          end: new Date(2019, 2, 12)
        },
        {
          id: 2,
          name: "Thomas Harry",
          work: "Development",
          start: new Date(2019, 1, 12),
          end: new Date(2019, 3, 12)
        },
        {
          id: 3,
          name: "James Charlie",
          work: "Development",
          start: new Date(2019, 1, 22),
          end: new Date(2019, 1, 30)
        },
        {
          id: 4,
          name: "James Harry",
          work: "Development",
          start: new Date(2019, 1, 22),
          end: new Date(2019, 1, 30)
        },
        {
          id: 5,
          name: "James Jacob",
          work: "Development",
          start: new Date(2019, 1, 22),
          end: new Date(2019, 1, 30)
        },
        {
          id: 6,
          name: "James Charlie",
          work: "Development",
          start: new Date(2019, 1, 22),
          end: new Date(2019, 1, 30)
        },
        {
          id: 7,
          name: "James Charlie",
          work: "Development",
          start: new Date(2019, 1, 22),
          end: new Date(2019, 1, 30)
        }
      ]
    };
  },
  methods: {
    viewMore() {
      if (this.data.length > this.end) {
        this.end += 3;
      }
    }
  }
};
</script>
<style>
.v-btn-card {
  margin-right: 90px;
}
.v-btn-add-filter {
  z-index: 10;
}
</style>
