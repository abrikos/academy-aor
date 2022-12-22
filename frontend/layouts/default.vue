<template>
  <div id="app">
    <v-app app>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none"/>
        <v-toolbar-title>Академия РС(Я) - ИБДДНС :: {{ user?.fullName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="switchTheme" title="Переключение темы">
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn to="/cabinet/settings" icon v-if="user" title="настройки пользователя">
          <v-icon>mdi-account-cog-outline</v-icon>
        </v-btn>


        <template v-if="user?.isAdmin">
          <v-btn title="Администратор" :to="adminItems[0].to" >
            АДМИН
          </v-btn>
        </template>

        <v-btn to="/user/signup" v-if="!user" :title="$t('Signup')">Регистрация</v-btn>
        <v-btn @click="logout" v-if="user" :title="$t('Logout')">Выход</v-btn>
        <v-btn to="/user/login" v-if="!user" :title="$t('Login')">Вход</v-btn>

        <template v-slot:extension>
          <v-tabs
              v-model="tab"
              align-with-title
              class="d-none d-sm-flex"
          >
            <v-tabs-slider color="red" style="display: none"/>
            <v-tab v-for="item of items" :to="'/cabinet/'+item.model" v-if="user" :key="item.to">{{ item.label }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <!-- Add a navigation bar -->
      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
      >
        <v-list nav dense>
          <v-list-item-group v-model="adminItem">
            <v-list-item v-for="(item, index) in items" :key="index" v-if="user">
              <v-list-item-title :to="'/cabinet/'+item.model">{{ item.label }}</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-tabs
            v-if="user.isAdmin"
            v-model="tab2"
            align-with-title
            class="d-none d-sm-flex"
        >
          <v-tabs-slider color="red" style="display: none"/>
          <v-tab v-for="item of adminItems" :to="item.to" :key="item.to">
            {{ item.title }}
          </v-tab>
        </v-tabs>

        <nuxt/>
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
      tab2: null,
      adminItem: '/admin/reports',
      items: [],
      adminItems: [

        {to: '/admin/reports/publication', title: 'Список публикаций по разделам'},
        {to: '/admin/scientists', title: 'Список публикаций по авторам'},
        {to: '/admin/users', title: 'Список авторов'},
      ]
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
    this.$axios.$get('/models')
        .then(res => {
          this.items = res
          this.$store.commit('setPages', res)
        })
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
  },

}
</script>

<style lang="sass">
.v-app-bar
  .v-toolbar__extension
//background-color: #7f828b
.container
  width: 1024px

.v-main > div
  padding: 0 15px

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
