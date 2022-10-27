<template>
  <div class="tabs">
    <div v-for="({type}, i) of items" :key="i" @click="tabClick(i)"
         :class="'tab' + (tab===i ? ' active' : '') + (isHovering===i ? ' hovered':'')"
         @mouseover="isHovering = i"
         @mouseout="isHovering = false">
      <img :src="`/icons/${type}_icon.png`" v-if="withIcons" :class="imageStyle"/>
      {{ type }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: ['onClick', 'items', 'withIcons'],
  computed:{
    imageStyle(){
      return this.$vuetify.theme.isDark ? 'inverse' : ''
    }
  },
  data(){

    return {
      tab: 0,
      isHovering : false
    }
  },
  methods:{
    resetTab(){
      this.tab = 0
    },
    tabClick(index){
      this.tab = index
      this.onClick(index)
    }
  }
}
</script>

<style scoped lang="sass">
.tabs
  display: flex
  cursor: pointer
  text-align: center
  border-bottom: 1px solid silver
  padding-bottom: 5px
  font-size: .9em

  div
    margin: 1px
    border-radius: 6px 6px 0 0

  .tab
    width: 120px
    text-align: center
    color: #1976d2
    padding: 10px
    img
      margin: auto
      display: block
      width: 55px
    img.inverse
      filter: invert(1)
  .tab.hovered
    background-color: silver

  .tab.active
    border-color: silver
    border-style: solid
    border-width: 1px 1px 0 1px
    color: inherit
    font-weight: bold

</style>