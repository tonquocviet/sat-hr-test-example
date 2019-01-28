<template>
  <v-layout row wrap>
    <v-flex xs4 md2>
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
        <v-flex :key="item" md1 xs3>
          <v-chip
            label
            disabled
            :color="colors[item].background"
            :text-color="colors[item].color || 'white'"
          >{{ colors[item].name }}</v-chip>
        </v-flex>
    </template>
  </v-layout>
</template>

<script>
  export default {
    props: {
      date: String,
      colors: Object,
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
        this.$emit('changeDate', val);
      }
    }
  }
</script>