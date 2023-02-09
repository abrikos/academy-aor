<template>
  <v-container>
    <v-card style="text-align: center">
    {{$t('Password change confirmation code sent to email')}}
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "reset-password-confirm",
  auth: 'guest',
}
</script>

<style scoped>

</style>