<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.description="{ item }">
        {{ item.component.description }}
      </template>
      <template v-slot:item.controls="{item}">
        <v-btn class="mx-2" small :color="item.isAdmin ? 'red' : 'silver' " @click="switchRole(item)" :title="item.isAdmin ? 'Revoke admin' : 'Make admin'">
          <v-icon>mdi-shield-account</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="deleteUser(item)">
          <v-icon>mdi-delete</v-icon>
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
      headers: [
        {text: 'e-mail', value: 'email'},
        {text: 'Date', value: 'date'},
        {text: '', value: 'controls'},
      ]
    }
  },
  created() {
    this.reloadList()
  },
  methods: {
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

<style scoped>

</style>