<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          icon
          v-bind="attrs"
          v-on="on"
      >
        <v-icon>mdi-earth</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="(item, index) in availableLocales"
          :key="index"
      >
        <v-list-item-title>
          <v-btn @click="switchLocale(item.code)">{{ item.name }}</v-btn>

        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "LangSwitcher",
  computed:{
    availableLocales() {
      return this.$i18n.locales.filter(l => l.code !== this.$i18n.locale)
    },
    localeName() {
      const locale = this.$i18n.locales.find(l => l.code === this.$i18n.locale)
      return locale.name
    },
  },
  methods:{
    switchLocale(code) {
      this.$i18n.setLocale(code)
    },
  }
}
</script>

<style scoped>

</style>