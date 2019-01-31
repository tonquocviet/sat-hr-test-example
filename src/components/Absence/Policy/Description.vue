<template>
  <MaterialPanel
    panel-title="Description"
    panel-sub-title="Setup policy's description"
    :readonly="readonly"
    :isShowEdit="true"
    @save="save"
    @cancel="cancel"
    @edit="edit"
  >
    <template>
      <v-layout row class="px-4 py-3">
        <v-flex xs12 sm6 class="pr-2">
          <span v-if="readonly">{{object.description}}</span>
          <v-textarea v-else solo v-model="object.description" hide-details no-resize></v-textarea>
        </v-flex>
        <v-flex xs12 sm6>
          <v-card >
            <v-card-text class="py-0" v-for="item in object.settings" :key="item.id">
              <v-layout row>
                <v-flex xs11>
                  <v-subheader class="pl-0" style="height:100%">{{ item.question }}</v-subheader>
                </v-flex>
                <v-flex xs1>
                  <v-text-field :readonly="readonly"  label="day(s)" v-model="item.answer"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </MaterialPanel>
</template>

<script>
import MaterialPanel from "../../panels/MaterialPanel";
export default {
  components: {
    MaterialPanel
  },
  data() {
    return {
      readonly: true,
      object: {
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        settings: [
          {
            id: 1,
            question:
              "How many absence days can one full-time employee have under this policy?",
            answer: 1
          },
          {
            id: 2,
            question:
              "How many absence days can one part-time employee have under this policy?",
            answer: 2
          },
          {
            id: 3,
            question:
              "How many absence days can one intern have under this policy?",
            answer: 3
          }
        ]
      },
      prevObject: {
        description: "",
        settings: []
      }
    };
  },
  methods: {
    edit() {
      this.prevObject = JSON.parse(JSON.stringify(this.object));
      this.readonly = false;
    },
    cancel() {
      this.object = JSON.parse(JSON.stringify(this.prevObject));
      this.readonly = true;
    },
    save() {
      this.readonly = true;
    }
  }
};
</script>
