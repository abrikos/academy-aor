<template>
  <div class="p-3">
    <v-alert type="error">
      {{error.statusCode}} {{error.message}}
    </v-alert>
    <NuxtLink to="/">На главную</NuxtLink>

  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>
