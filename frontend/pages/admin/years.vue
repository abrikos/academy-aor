<template lang="pug">
  div
    table
      tr(v-if="items[1999]")
        th Год
        th(v-for="model of Object.keys(items[1999])") {{page(model)}}
      tr(v-for="year of years")
        td {{year}}
        td(v-for="model of Object.keys(items[year])")
          div(v-for="item of items[year][model]")
            router-link(:to="`/admin/scientist/${item.user.id}`") {{item.user.fullName}}
            div {{item.name}}

</template>

<script>
export default {
  name: "years",
  data(){
    return {
      items:{}
    }
  },
  computed:{
    years(){
      return Object.keys(this.items).reverse()
    }
  },
  created() {
    this.init()
  },
  methods:{
    page(model) {
      //console.log(this.$store.state.pages.find(p => p.model === model))
      //return 'zz'
      return this.$store.state.pages.find(p => p.model === model).label
    },
    async init(){
      const res = await this.$axios.$get('/admin/years')
      this.items = res
    }
  }
}
</script>

<style scoped lang="sass">
table
  width: 100%
  tr:nth-child(even)
    background-color: silver
  td
    padding: 10px
</style>