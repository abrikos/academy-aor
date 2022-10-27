<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
  >
  <v-card>
    <v-card-title>{{ $t('Reset password') }}</v-card-title>
    <v-card-text>
      <v-text-field
          outlined
          v-model="form.email"
          :label="$t('Email')"
          :rules="rules"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="submit" class="my-4">{{ $t('Send') }}</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script>
export default {
  name: "reset-password",
  data() {
    return {
      valid: false,
      rules: [
        value => !!value || this.$t('Required'),
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || this.$t('E-mail must be valid')
      ],
      form: {
      }
    }
  },
  methods:{
    async submit(){
      if(!this.$refs.form.validate()) return      console.log('Not valid')
      this.$axios.$post('/user/reset-password', this.form)
          .then(()=>{
            this.$router.push('/user/reset-password-confirm')
          })
    }
  }
}
</script>

<style scoped>

</style>