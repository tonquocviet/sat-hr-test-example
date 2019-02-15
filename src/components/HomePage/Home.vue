<template>
  <div>
    <v-toolbar
      color="cyan"
      dark
      tabs
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>HOME PAGE</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <v-tabs
        slot="extension"
        v-model="tab"
        color="cyan"
        grow
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
      <PageWeb v-if="item ==='menu'"/>
      <PageImage v-if="item ==='images'"/>
      <PageInfo v-if="item === 'infomation'"/>
      </v-tab-item>
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
    </v-tabs-items>
  </div>
</template>
<script>
import PageWeb from "./Web/PageWeb.vue";
import PageImage from "./Web/PageImage.vue";
import PageInfo from "./Web/PageInfo.vue"
  export default {
    components:{
      PageWeb,
      PageImage,
      PageInfo
    },
    data () {
      return {
        tab: null,
        items: [
          'menu', 'infomation', 'videos', 'images', 'news'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
