<template>
  <div>
    <h1>{{ page.label }}</h1>
    <v-row>
      <v-col sm="4">
        <div class="models-list">
          <div v-for="(item, i) of items" :key="i" @click="record = item" :class="item.id === record.id ? 'active': ''">
            {{ item.name }}
          </div>
        </div>
      </v-col>
      <v-col sm="8">
        <v-btn @click="saveRecord">Сохранить</v-btn>
        <v-btn @click="record = {}" v-if="record.id">Создать новое</v-btn>
        <v-btn @click="deleteRecord" v-if="record.id" color="red">Удалить</v-btn>

        <div v-for="field of fields" :key="field.name">
          <v-radio-group v-model="record[field.name]" row v-if="controlType(field) === 'radio'" :label="field.label">
            <v-radio v-for="(option, i) of field.radio" :key="i" :label="option" :value="option"/>
          </v-radio-group>

          <v-select v-model="record[field.name]" :label="field.label" v-if="controlType(field) === 'select'"
                    item-text="name"
                    item-value="id" :items="relations[field.name]"/>

          <v-textarea v-model="record[field.name]" :label="field.label" outlined
                      v-if="controlType(field) === 'text'"/>
          <v-text-field v-model="record[field.name]" :label="field.label" outlined
                      v-if="controlType(field) === 'number'" type="number"/>
          <div v-if="controlType(field) === 'datepicker'">TODO datepicker</div>
        </div>
        <v-btn @click="saveRecord">Сохранить</v-btn>
        <v-btn @click="record = {}" v-if="record.id">Создать новое</v-btn>
        <v-btn @click="deleteRecord" v-if="record.id" color="red">Удалить</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "publication",

  data() {
    return {
      items: [],
      fields: [],
      relations: {},
      record: {}
    }
  },
  computed: {
    model() {
      return this.$route.params.model
    },
    page() {
      return process.env.pages.find(p => p.to.match(this.$route.params.model))
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async deleteRecord() {
      await this.$axios.$delete(`/${this.model}/${this.record.id}`)
      this.record = {}
      await this.getList()
    },
    async saveRecord() {
      this.record = await this.$axios.$put(`/${this.model}/${this.record.id}`, this.record)
      await this.getList()
    },
    controlType(field) {
      if (Object.keys(this.relations).includes(field.name)) {
        return 'select'
      } else if (field.radio) {
        return 'radio'
      } else if (field.datepicker) {
        return 'datepicker'
      } else if (field.type === 'Number') {
        return 'number'
      }
      return 'text'
    },
    async getList() {
      const res = await this.$axios.$get(`/${this.model}/list`)
      console.log(res)
      this.items = res.items;
      this.fields = res.fields;
      this.relations = res.relations;
    }
  }
}
</script>

<style scoped lang="sass">
.models-list
  div
    cursor: pointer

  div.active
    background-color: silver
</style>