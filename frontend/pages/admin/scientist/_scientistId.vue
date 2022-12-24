<template lang="pug">
  div(v-if="user && currentItem" )

    v-row
      v-col(sm="2")
        v-list(v-model="tab")
          v-list-item-group(v-model="pageIndex")
            v-list-item(v-for="p of pages" @click="selectPage(p)" :key="p.model")
              v-list-item-title(class="text-wrap") {{p.label}} ({{dataCount(p)}})
      v-col
        h1 {{user.fullName}}
        div(v-for="d of currentItem.data")
          Publiaction(:page="currentPage" :item="d")

</template>

<script>
import Publiaction from "~/components/Publiaction.vue";

export default {
  name: "admin-scientist",
  components: {Publiaction},
  data(){
    return {
      tab:null,
      user: null,
      items:[],
      page: 'publication',
      pageIndex: 0,
    }
  },
  async fetch() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      console.log(this.currentItem)
      const res = await this.$axios.$get('/admin/user/' +  this.$route.params.scientistId)
      this.user = res.user
      this.items = res.items
    },
    selectPage(page){
      this.page  = page.model
      console.log(page)
    },
    dataCount(page){
      return this.items.find(i=>i.model === page.model).data.length
    }
  },
  computed:{
    currentPage(){
      return this.$store.state.pages.find(p=>p.model === this.page)
    },
    currentItem(){
      return this.items.find(p=>p.model === this.page)
    },
    pages() {
      return this.$store.state.pages
    }
  }
}
</script>

<style scoped lang="sass">
table
  margin-bottom: 20px
</style>