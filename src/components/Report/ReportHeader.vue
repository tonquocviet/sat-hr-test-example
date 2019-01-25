<template>
  <v-layout row wrap>
    <v-flex xs2>
      <v-menu
        ref="menu"
        v-model="menu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="picker"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="picker"
          type="month"
          no-title
          scrollable
        >
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-spacer></v-spacer>
    <template v-for="item in Object.keys(colors)">
        <v-flex style="margin-left: 2vw;" :key="item" xs1>
          <v-card
            class="mx-auto"
            :color="colors[item].background"
            dark
          >
            <v-card-text :style="{ color: colors[item].color || 'white'} " class="text-xs-center">{{ colors[item].name }}</v-card-text>
          </v-card>
        </v-flex>
    </template>
  </v-layout>
</template>

<script>
  export default {
    props: {
      date: String,
      colors: Object,
      changeDate: Function
    },
    data() {
      return {
        menu: false,
        modal: false,
        picker: this.date
      }
    },
    watch: {
      picker: function (val) {
        this.changeDate(val);
      }
    }
  }
</script>