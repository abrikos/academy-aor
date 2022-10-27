<template>
  <v-snackbar
    :value="!!snackbar"
    :color="color"
  >
    {{ snackbar && $t(snackbar.message) }}

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        text
        v-bind="attrs"
        @click="remove"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  watch: {
    snackbar(){
      setTimeout(() => {
        this.remove();
      }, this.snackTimeout);
    }
  },
  computed: {
    snackData() {
      this.snackbar = this.$store.getters.getSnackBar
      return this.$store.getters.getSnackBar
    },
    color() {
      if(!this.snackData) return;
      if(this.snackData.status === 406) return 'warning'
      if(this.snackData.status > 400) return 'error'
      return 'success'
    }
  },
  methods:{
    remove(){
      this.$store.commit('setSnackBar')
    }
  },
  data(){
    return {
      snackbar: false,
      snackTimeout: 6000,
    }
  }
}
</script>

<style scoped>

</style>
