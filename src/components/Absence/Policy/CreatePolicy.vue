<template>
  <v-dialog :value="isShow" @input="$emit('closeDialog')" width="60%">
    <v-card>
      <div class="ml-4 pt-3">
        <span class="font-weight-bold text-uppercase">Create Policy</span>
        <v-textarea class="mr-3 mt-3" solo placeholder="Time-off Policy Name" required></v-textarea>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default" flat="flat" @click="$emit('closeDialog')">Cancel</v-btn>
        <v-btn color="green" flat="flat" @click="$emit('closeDialog')">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: {
      isShow: Boolean
    }
  }
</script>