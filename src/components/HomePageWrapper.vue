<template>
  <v-content>
    <v-container fluid class="pa-0">
      <Home/>
      <Footer/>
    </v-container>
  </v-content>
</template>
<script>
import Home from "./HomePage/Home";
import Footer from "./HomePage/Footer";
export default {
  components: {
    Home,
    Footer
  }
};
</script>
