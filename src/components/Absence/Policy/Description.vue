<template>
  <v-card>
    <v-layout class="pa-2 mt-3">
      <v-card style="width:100%; margin-top: -20px" color="teal">
        <v-layout class="pa-3">
          <v-toolbar-title class="pr-1 white--text font-weight-light">Desciption</v-toolbar-title>
        <v-icon
          style="cursor: pointer; color: rgba(255, 255, 255, 0.79)"
          v-if="readonly"
          @click="readonly = false"
        >border_color</v-icon>
        </v-layout>
      </v-card>
    </v-layout>
    <v-layout row wrap class="pa-2">
      <v-flex xs12 sm6 class="pr-2">
        <v-textarea :readonly="readonly" solo v-model="description" name="input-7-4"></v-textarea>
      </v-flex>
      <v-flex xs12 sm6>
        <div v-for="item in Settings" :key="item.id">
          <v-card>
            <v-card-text class="py-0">
              <v-layout row wrap>
                <v-flex xs11>
                  <v-subheader class="pl-0" style="height:100%">{{ item.question }}</v-subheader>
                </v-flex>
                <v-flex xs1>
                  <v-text-field :readonly="readonly" label="days" :value="item.answer"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
    <div v-if="!readonly" style="text-align: right" class="pb-2">
      <v-btn @click="readonly = true" color="info ">Save</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      readonly: true,
      description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      Settings: [
        {
          id: 1,
          question: "How many absence days can one full-time employee have under this policy?",
          answer: 1
        },
        {
          id: 2,
          question: "How many absence days can one part-time employee have under this policy?",
          answer: 2
        },
        {
          id: 3,
          question: "How many absence days can one intern have under this policy?",
          answer: 3
        }
      ]
    };
  }
};
</script>

