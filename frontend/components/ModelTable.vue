<template lang="pug">
  table
    tbody
      tr(v-for="field of page.fields")
        td {{field.label}}
        td {{field.ref ? item[field.name] && item[field.name].name : item[field.name]}}
      tr
        td(colspan=2)
          div.d-flex.justify-space-around
            a(:href="item.link" target="_blank" v-if="item.link" ) Ссылка
            a(:href="item.pdfLink" v-if="item.pdf" ) PDF
</template>

<script>
export default {
  name: "ModelTable",
  props: ['page', 'item']
}
</script>

<style scoped lang="sass">
table
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 255, .2)
  border: 1px solid silver
  border-radius: 10px
  overflow: hidden
  width: 100%
  tr:nth-child(odd)
    background: #ddd
  td:first-child
    width: 20%
  td
    padding: 5px

</style>