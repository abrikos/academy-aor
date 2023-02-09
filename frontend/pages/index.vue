<template>
  <v-container>
    <v-card>
      <v-card-title>Информационная база данных деятельности научных сотрудников</v-card-title>
      <v-card-text>
        Для начала работы с базой необходимо
        <router-link to="/user/login">Войти</router-link>
        или
        <router-link to="/user/signup">Зарегистрироваться</router-link>
      </v-card-text>
    </v-card>
  </v-container>
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

  methods: {},
  created() {

  },
}
</script>
