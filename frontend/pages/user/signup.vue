<template>
  <v-container>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >

      <v-card>
        <v-card-title>{{ $t('Sign up') }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="form.email" :label="$t('Email')" outlined :rules="emailRules"/>
          <v-text-field v-model="form.password" type="password" :label="$t('Password')" outlined
                        :rules="passwordRules"/>
          <v-text-field v-model="form.passwordConfirm" type="password" :label="$t('Confirm password')" outlined
                        :rules="passwordRules"/>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="registration">{{ $t('Send') }}</v-btn>
          <!--        <v-btn @click="rnd">Random11</v-btn>-->
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>

export default {
  name: "SignUp",
  auth: false,
  data() {
    const form = window?.location.host === 'test.abrikos.pro' ? {
      email: Math.random() + '@gmail.com',
      password: '123',
      passwordConfirm: '123',
    } : {}
    return {
      valid: false,
      error: '',
      emailRules: [
        value => !!value || this.$t('Required'),
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('E-mail must be valid')
      ],
      passwordRules: [
        v => this.form.password === this.form.passwordConfirm || this.$t('Passwords do not match')
      ],
      form,
    }
  },
  methods: {
    async registration() {

      if (!this.$refs.form.validate()) return console.log('Not valid')
      this.$axios.$post('/auth/signup', this.form)
          .then(() => {
            this.$router.push(this.$store.getters.getLoginRedirect)
          })
          .catch(console.error)
    },
    rnd() {
      this.form.username = Math.random();
      this.form.email = Math.random() + '@aaa.com';
      this.form.password = '123';
      this.form.passwordConfirm = '123';
      this.error = this.form.username;
    },
  }
}
</script>

<style scoped>
</style>
