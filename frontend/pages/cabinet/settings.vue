<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-card
          v-if="user"
      >
        <v-card-title>{{ $t('Settings') }}</v-card-title>
        <v-card-text>
          <v-text-field
              outlined
              :value="user.email"
              :label="$t('Email')"
              disabled
          />
          <v-text-field v-model="user.password" type="password" :label="$t('Password')" outlined/>
          <v-text-field v-model="user.passwordConfirm" type="password" :label="$t('Confirm password')" outlined
                        :rules="passwordRules"/>

        </v-card-text>
        <v-card-actions>
          <v-btn @click="update" color="primary" class="my-4">{{ $t('Save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>

export default {
  name: "cabinet-settings",
  middleware: ['auth'],
  computed: {
    user() {
      return {...this.$store.getters.getLoggedUser}
    }
  },
  data() {
    return {
      valid: false,
      passwordRules: [
        v => this.user.password === this.user.passwordConfirm || this.$t('Passwords do not match')
      ],

    }
  },
  methods: {
    update() {
      if (!this.$refs.form.validate()) return console.log('Not valid')
      this.$axios.$post('/user/update', this.user)
          .then(user => {
            this.$store.dispatch('auth/getUser')
          })

    }
  }
}
</script>

<style scoped>

</style>
