<template>
  <v-card>
    <v-card-title>INDEX</v-card-title>
    <v-card-text>
      Для начала работы с конфигуратором необходимо  <router-link  to="/user/login">Войти</router-link> или <router-link  to="/user/signup">Зарегистрироваться</router-link>
    </v-card-text>
  </v-card>
</template>

<script>


export default {
  auth: false,
  data() {
    return {
      form: {},
      list: [],
      departments: []
    }
  },

  methods: {

  },
  created() {

  },
}
</script>
