<template>
  <div v-if="page">
    <h1>{{ page.label }}</h1>
    <v-row>
      <v-col sm="2">
        <h4>Список</h4>
        <div class="models-list">
<!--          <div v-for="(n,i) in 100" :key="i">-->
          <div v-for="(item, i) of items" :key="i" @click="selectRecord(item)" :class="item.id === record.id ? 'active': ''" :id="'record-'+item.id">
            {{ item.name.length>200 ? item.name.substr(0, 200) + '...' : item.name }}
          </div>
<!--          </div>-->
        </div>
      </v-col>
      <v-col sm="10">
        <div class="field-list">
          <div v-for="field of page.fields" :key="field.name" class="field-container">
            <v-radio-group v-model="record[field.name]" row v-if="controlType(field) === 'radio'" :label="field.label" dense hide-details>
              <v-radio v-for="(option, i) of field.radio" :key="i" :label="option" :value="option"/>
            </v-radio-group>

            <v-select v-model="record[field.name]" :label="field.label" v-if="controlType(field) === 'select'"
                      dense
                      item-text="name"
                      item-value="id" :items="relations[field.name]"/>

            <v-textarea v-model="record[field.name]" :label="field.label" outlined  dense hide-details
                        v-if="controlType(field) === 'text'"/>
            <v-text-field v-model="record[field.name]" :label="field.label" outlined  dense
                          v-if="controlType(field) === 'number'" type="number"/>
            <div v-if="controlType(field) === 'datepicker'">TODO datepicker</div>
          </div>
        </div>
        <hr/>
        <v-row>
          <v-col sm="8">
            <v-btn @click="saveRecord" small color="primary">Сохранить</v-btn>
            <v-btn @click="record = {}" v-if="record.id" small>Создать новое</v-btn>
          </v-col>
          <v-col><span v-if="record.id">Дата создания: <i>{{record.date}}</i></span></v-col>
          <v-col><v-btn @click="deleteRecord" v-if="record.id" color="red" x-small>Удалить</v-btn></v-col>
        </v-row>
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
      relations: {},
      record: {}
    }
  },
  computed: {
    model() {
      return this.$route.params.model
    },
    page() {
      return this.$store.state.pages.find(p => p.model === this.$route.params.model)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    selectRecord(item){
      this.record = item
      const myElement = document.getElementById('record-'+item.id);
      const topPos = myElement.offsetTop;
      console.log(myElement, topPos)
    },
    async deleteRecord() {
      await this.$axios.$delete(`/${this.model}/${this.record.id}`)
      this.record = {}
      await this.getList()
    },
    async saveRecord() {
      const res = await this.$axios.$put(`/${this.model}/${this.record.id}`, this.record)
      this.record = res || {}
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
      console.log('REZZZZZZZ',res , this.page)
      this.items = res.items;
      this.relations = res.relations;
    }
  }
}
</script>

<style scoped lang="sass">
.field-list
  column-count: 3
  div
    page-break-inside: avoid           /* Theoretically FF 20+ */
    break-inside: avoid-column         /* Chrome, Safari, IE 11 */
    display: table
    width: 100%
.field-container
  :deep(.v-input)
    margin: 10px 0
.models-list
  overflow-y: scroll
  height: 70vh
  div
    padding: 5px
    border-bottom: 1px solid gray
    font-size: small
    cursor: pointer

  div.active
    background-color: silver
</style>