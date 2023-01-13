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
        v-row
          v-col
            div(v-for="d of currentItemData")
              ModelTable(:page="currentPage" :item="d")
          v-col(sm="2")
            h3 Годы
            v-btn(@click="yearFilter = ''" v-bind:class="{yearSelected: yearFilter === ''}") Все
            div(v-for="year of years")
              v-btn(@click="yearFilter = year" v-bind:class="{yearSelected: yearFilter === year}") {{year}} ( {{countOfYear(year)}} )

</template>

<script>

import ModelTable from "~/components/ModelTable.vue";
import moment from "moment/moment";

export default {
  name: "admin-scientist",
  components: {ModelTable},
  data(){
    return {
      tab:null,
      user: null,
      items:[],
      yearFilter: '',
      page: 'publication',
      pageIndex: 0,
    }
  },
  async fetch() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      const res = await this.$axios.$get('/admin/user/' +  this.$route.params.scientistId)
      this.user = res.user
      this.items = res.items
    },
    selectPage(page){
      this.page  = page.model
    },
    dataCount(page){
      return this.items.find(i=>i.model === page.model).data.length
    },
    countOfYear(year){
      return this.currentItem.data.filter(d=>moment(d.date).format('YYYY') === year).length
    }
  },
  computed:{
    years(){
      return [...new Set(this.currentItem.data.filter(d=>d.date).map(d=>moment(d.date).format('YYYY')))]
    },
    currentPage(){
      return this.$store.state.pages.find(p=>p.model === this.page)
    },
    currentItem(){
      return this.items.find(p=>p.model === this.page)
    },
    currentItemData(){
      return this.currentItem.data.filter(d=>d.date ? (this.yearFilter ? moment(d.date).format('YYYY') === this.yearFilter : true) : true )
    },
    pages() {
      return this.$store.state.pages
    }
  }
}
</script>

<style scoped lang="sass">
.yearSelected
  background-color: red !important
table
  margin-bottom: 20px
</style>