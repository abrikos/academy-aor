<template>
  <div id="app">
    <v-app app>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = true"
                            class="d-flex d-sm-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Академия РС(Я) - ИБДДНС</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="switchTheme" title="Переключение темы">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn to="/cabinet/settings" icon v-if="user" title="настройки пользователя"><v-icon>mdi-account-cog-outline</v-icon></v-btn>
        <v-menu rounded="true" open-on-hover offset-y transition="slide-x-transition"
                v-if="user?.isAdmin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" title="Администратор">
              <v-icon>mdi-shield-account</v-icon>
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
        <v-btn to="/user/signup" v-if="!user" icon :title="$t('Signup')"><v-icon>mdi-account-plus</v-icon></v-btn>
        <v-btn @click="logout" v-if="user" icon :title="$t('Logout')"><v-icon>mdi-logout-variant</v-icon></v-btn>
        <v-btn to="/user/login" v-if="!user" icon :title="$t('Login')"><v-icon>mdi-login-variant</v-icon></v-btn>

        <template v-slot:extension>
          <v-tabs
              v-model="tab"
              align-with-title
              class="d-none d-sm-flex"
          >
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="item of items" :to="item.to" v-if="user" :key="item.to">{{item.label}}</v-tab>
          </v-tabs>

        </template>
      </v-app-bar>
      <!-- Add a navigation bar -->
      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
        <v-list
            nav
            dense
        >
          <v-list-item-group
          >
            <v-list-item v-for="(item, index) in items" :key="index" v-if="user">
              <v-list-item-title :to="item.to">{{ item.label }}</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>


      <v-main>
        <v-container>
          <nuxt/>
        </v-container>
      </v-main>
      <SnackBar/>
    </v-app>
  </div>
</template>

<script>
import LangSwitcher from "~/components/LangSwitcher";

export default {
  components: {LangSwitcher},
  data() {
    return {
      drawer: false,
      tab: null,
      items: process.env.pages,
    }
  },
  computed: {
    showMenu() {
      return this.toggleMenu || this.$vuetify.breakpoint.mdAndUp
    },
    user() {
      return this.$store.getters.getLoggedUser
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      //this.$store.dispatch('auth.js.bak/logout')
    },
    switchTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
      localStorage.setItem('themeDark', this.$vuetify.theme.isDark)
    }
  },
  created() {
    this.$vuetify.theme.isDark = JSON.parse(localStorage.getItem('themeDark'))
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
  },

}
</script>

<style lang="sass">
#nav-bar
  z-index: 1000000

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
