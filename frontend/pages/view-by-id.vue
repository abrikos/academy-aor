<template>
  <div>{{id}}</div>
</template>

<script>
export default {
  name: "view-by-id",
  computed: {
    id() {
      return this.$route.params.pathMatch;
    },
  }
}
</script>

<style scoped>

</style>