<template lang="pug">
  v-row
    v-col(sm="2")
      v-list(v-model="tab" height="100vh" )
        v-list-item(v-for="item of pages" :to="'/admin/model/'+item.model" :key="item.to")
          v-list-item-title(class="text-wrap") {{ item.label }}
    v-col
      div.model-item(v-for="item of items")
        h3 {{item.name}}
        router-link.user-name(:to="`/admin/scientist/${item.user.id}`") {{item.user.fullName}}
        //div {{pages}}
        ModelTable(:page="page" :item="item")
</template>

<script>
import ModelTable from "~/components/ModelTable.vue";

export default {
  name: "AdminModelName",
  components: {ModelTable},
  data() {
    return {
      items: [],
      models: [],
      tab: null
    }
  },
  computed:{
    model(){

      return this.$route.params.modelName || 'publication'
    },
    page() {
      return this.pages.find(p => p.model === this.model)
    },
    pages() {
      return this.$store.state.pages
    }
  },
  async fetch() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      const res = await this.$axios.$get('/admin/model/' +  this.model)
      this.items = res.items
    }
  }
}
</script>

<style scoped lang="sass">
.user-name
  color: blue
.model-item
  //border: 1px solid silver
  margin: 5px 0
  //padding: 5px
  //border-radius: 10px
</style>