<template>
  <v-container>
  <v-card>
    <v-card-title>{{ $t('Login') }}</v-card-title>
    <v-card-text>
      <v-text-field
          outlined
          v-model="login.email"
          :label="$t('Email')"
          :rules="rules"
      />
      <v-text-field
          outlined
          type="password"
          v-model="login.password"
          :label="$t('Password')"
          :rules="rules"
      />

    </v-card-text>
    <v-card-actions>
      <v-btn @click="submit" class="my-4">{{ $t('Send') }}</v-btn>
      <v-spacer/>
      <v-btn @click="resetPassword" class="my-4">{{ $t('Reset password') }}</v-btn>
    </v-card-actions>
  </v-card>
  </v-container>
</template>

<script>

export default {
  name: "login",
  auth: false,
  data() {
    return {
      name: '',
      email: '',
      search: '',
      valid: false,
      rules: [
        value => !!value || this.$t('Required'),
        //value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      list: [],
      login: {
        email: '',
        password: '',
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    }
  },
  created() {
    if (this.user) this.$router.push(this.$store.getters.getLoginRedirect)
  },
  methods: {
    async resetPassword() {
      this.$router.push('/user/reset-password')
    },
    async submit() {
      try {
        this.$store.dispatch('auth/login', this.login)
            .then(() => {
              this.$router.push(this.$store.getters.getLoginRedirect)
            })
      } catch (error) {
        console.error(error)
      }

    }
  }
}
</script>

<style scoped lang="sass">
u
  cursor: pointer
</style>
