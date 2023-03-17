<template lang="pug">
  div
    h1 ПРНД
    table
      thead
        tr
          th ФИО
          th(v-for="y in year - startYear") {{startYear + y}}
      tr(v-for="user of users")
        td {{user.fullName}}
        td(v-for="y in year - startYear")
          input(@change="inputChanged" :data-id="user.id" :data-year="startYear + y" :value="userPrnd(y+startYear, user)" type="number")
        //td {{user.prnds}}
</template>

<script>
export default {
  name: "prnd",
  data(){
    return {
      startYear: 2021,
      year: new Date().getFullYear(),
      users:[]
    }
  },
  created() {
    this.reloadList()
  },
  methods:{
    userPrnd(year, user){
      const found = user.prnds.find(p=>p.year===year)
      if(!found) return 0
      return found.value
    },
    inputChanged(e){
      const user = e.target.getAttribute('data-id')
      const year = e.target.getAttribute('data-year')
      const {value} = e.target
      this.$axios.$put(`/admin/user/${user}/prnd`, {value, year})
      console.log(user, year, value)
    },
    reloadList() {
      this.$axios.$get('/admin/users')
          .then(res => this.users = res)
    },

  }
}
</script>

<style scoped lang="sass">
input
  border: 1px solid silver
</style>