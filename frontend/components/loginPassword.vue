<template>
  <v-card>
    <v-card-text>
      <v-text-field
        outlined
        v-model="username"
        :label="$t('Username')"
        :rules="rules"
      />
      <v-text-field
        outlined
        v-model="password"
        :label="$t('Password')"
        :rules="rules"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="submit" class="my-4">{{ $t('Send') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "loginPassword",
  layout: 'admin',
  auth: false,
  data() {
    return {
      valid: false,
      rules: [
        value => !!value || this.$t('Required'),
        //value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      username: '',
      password: '',
    }
  },
  methods: {
    submit() {
      const {username, password} = this;
      this.$emit('userData', {strategy: 'password', username, password})
    },
  },
}
</script>

<style scoped>

</style>
