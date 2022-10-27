<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-app-bar-title>
        <v-btn to="/">
          {{$t('Home')}}
        </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
        <v-btn to="/view-by-id/some_id">View by id</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu rounded="true" open-on-hover offset-y transition="slide-x-transition" bottom right v-if="user?.isAdmin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn id v-bind="attrs" v-on="on">
              Admin
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item to="/admin/users">
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item>
            <v-list-item to="/admin/upload">
              <v-list-item-title>Upload example</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn to="/cabinet/settings" v-if="user" >Кабинет</v-btn>
        <v-btn to="/user/signup" v-if="!user" id>Регистрация</v-btn>
        <v-btn to="/user/login" v-if="!user" id>Вход</v-btn>
        <v-btn @click="logout" v-if="user" id>Выход</v-btn>
        <v-btn icon @click="switchTheme">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <LangSwitcher/>
      </v-toolbar-items>

    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
    <SnackBar/>
  </v-app>
</template>

<script>
import LangSwitcher from "~/components/LangSwitcher";
export default {
  components: {LangSwitcher},
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
          .then(() => this.$router.push('/user/login'))
    },
    switchTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      localStorage.setItem('themeDark', this.$vuetify.theme.isDark)
    }
  },
  created() {
    this.$vuetify.theme.isDark = JSON.parse(localStorage.getItem('themeDark'))
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
    this.$store.dispatch('auth/getUser')
  },

}
</script>

<style lang="sass">
pointer
  cursor: pointer
h1
  border-bottom: 1px solid silver
  margin-bottom: 10px
  text-align: center

  small
    font-size: .5em
    font-weight: lighter

h4
  text-align: center
</style>
