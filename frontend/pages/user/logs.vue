<template>
  <div>
    Logs
    <button @click="test">Test222</button>
  </div>
</template>

<script>
export default {
  name: "logs",
  methods:{
    test(){
      this.$axios.post('user/update', {superUser: false})
    }

  }
}
</script>

<style scoped>

</style>
