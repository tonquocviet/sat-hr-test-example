<template>
  <v-app>
    <v-content>
      <OrgChartWrapper/>
    </v-content>
  </v-app>
</template>

<script>
import OrgChartWrapper from './components/OrgChartWrapper'

export default {
  name: 'App',
  components: {
    OrgChartWrapper
  },
  data () {
    return {
      //
    }
  }
}
</script>
