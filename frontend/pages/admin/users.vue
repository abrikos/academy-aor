<template>
  <div>
    <v-data-table
        v-if="users.length"
        :headers="headers"
        :items="users"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.fullName="{item}">
        <router-link :to="`/admin/scientist/${item.id}`">{{item.fullName}}</router-link>
      </template>
      <template v-slot:item.date="{item}">
        <small>{{item.date}}</small>
      </template>
<!--      <template v-for="m of this.$store.state.pages" v-slot:item.grant="{item}">
        {{m.model}}
      </template>-->
      <template v-slot:item.controls="{item}">
        <v-btn icon x-small @click="setPassword(item)">
          <v-icon x-small>mdi-form-textbox-password</v-icon>
        </v-btn>
        <v-btn :to="`/admin/scientist/${item.id}`" icon x-small>
          <v-icon x-small>mdi-eye</v-icon>
        </v-btn>
        <v-btn x-small :color="item.isAdmin ? 'red' : 'silver' " @click="switchRole(item)" :title="item.isAdmin ? 'Revoke admin' : 'Make admin'" icon>
          <v-icon x-small>mdi-shield-account</v-icon>
        </v-btn>
        <v-btn x-small icon color="red" @click="deleteUser(item)">
          <v-icon x-small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      users: [],
    }
  },
  created() {
    this.reloadList()
  },
  computed:{
    headers(){
      const headers = [
        {text: 'ФИО', value: 'fullName'},
        {text: 'e-mail', value: 'email'},
        ...this.$store.state.pages.map(p=>({text:p.label, value:p.model})),
        {text: 'Date', value: 'date', width: 130},
        {text: '', value: 'controls', width:150},
      ]
      return headers
    }
  },
  methods: {
    async setPassword(user){
      const password = window.prompt('Введите новый пароль')
      await this.$axios.$post('/admin/new-password', {user, password})
      await this.reloadList()
    },
    reloadList() {
      this.$axios.$get('/admin/users')
          .then(res => this.users = res)
    },
    deleteUser(user) {
      if(!confirm('Удалить юзера '+user.email+'?')) return
      this.$axios.$delete('/admin/user/'+ user.id)
          .then(this.reloadList)
    },
    switchRole(user) {
      this.$axios.$post('/admin/switch-role', user)
          .then(this.reloadList)
      console.log(user)
    }
  }
}
</script>

<style scoped lang="sass">
</style>