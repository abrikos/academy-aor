<template>
  <div v-if="page">
    <h1>{{ page.label }}</h1>
    <v-row>
      <v-col sm="2">
        <h4>Список</h4>
        <div class="models-list">
          <!--          <div v-for="(n,i) in 100" :key="i">-->
          <div v-for="(item, i) of items" :key="i" @click="selectRecord(item)"
               :class="item.id === record.id ? 'active': ''" :id="'record-'+item.id">
            {{ formatDate(item.date) }}
            {{ item.name?.length > 200 ? item.name.substr(0, 200) + '...' : item.name }}
          </div>
          <!--          </div>-->
        </div>
      </v-col>
      <v-col sm="10">
        <div class="field-list">
          <div v-for="field of page.fields" :key="field.name" class="field-container">

            <v-radio-group v-model="record[field.name]" row v-if="controlType(field) === 'radio'" :label="field.label"
                           dense hide-details>
              <v-radio v-for="(option, i) of field.radio" :key="i" :label="option" :value="option"/>
            </v-radio-group>

            <v-select v-model="record[field.name]" :label="field.label" v-if="controlType(field) === 'select'"
                      dense
                      item-text="name"
                      item-value="id" :items="relations[field.name]"/>

            <v-textarea v-model="record[field.name]" :label="field.label" outlined dense hide-details
                        v-if="controlType(field) === 'text'"/>
            <v-text-field v-model="record[field.name]" :label="field.label" outlined dense
                          v-if="controlType(field) === 'number'" type="number"/>
            <div v-if="controlType(field) === 'date'"
                 style="display: flex; justify-content: space-between; align-items: center">
              <div>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                      <v-icon>mdi-calendar</v-icon>
                      {{ field.label }}
                    </v-btn>
                  </template>
                  <v-date-picker
                      v-model="record[field.name]"
                      locale="ru-ru"
                      no-title
                  />
                </v-menu>
              </div>
              {{ formatDate(record[field.name]) }}

            </div>

            <div v-if="controlType(field) === 'datepicker'">TODO datepicker</div>
          </div>
        </div>
        <v-text-field label="Ссылка" v-model="record.link" outlined/>
        <div v-if="record.id">
          <input type="file" accept=".pdf" @change="upload" ref="uploadInput" hidden/>
          <v-btn @click="$refs.uploadInput.click()">Загрузить PDF</v-btn>
          <a :href="record.pdfLink" target="_blank" v-if="record.pdf">Скачать PDF</a>
        </div>
        <hr/>
        <v-row>
          <v-col sm="6">
            <v-btn @click="saveRecord" small color="primary">Сохранить</v-btn>
            <v-btn @click="selectRecord({id:''})" v-if="record.id" small>Создать новое</v-btn>
          </v-col>
          <v-col><span v-if="record.id">Дата создания: <i>{{ record.dateCreate }}</i></span></v-col>
          <v-col>
            <v-btn @click="deleteRecord" v-if="record.id" color="red" x-small>Удалить</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import moment from "moment/moment";

export default {
  name: "ModelId",
  data() {
    return {
      menu: null,
      activePicker: null,
      items: [],
      relations: {},
    }
  },
  computed: {
    model() {
      return this.$route.params.model
    },
    id() {
      return this.$route.params.modelId
    },
    record() {
      return this.items.find(i => i.id === this.id) || {}
    },
    page() {
      return this.$store.state.pages.find(p => p.model === this.$route.params.model)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      await this.$axios.$post(`/${this.model}/${this.id}/upload`, formData)
      this.$refs.uploadInput.value = null
      await this.getList()
    },
    formatDate(date) {
      if (!date) return
      return moment(date).format('DD.MM.YYYY')
      //this.$refs.menuDate.save(date)
    },
    selectRecord(item) {
      return this.$router.push(`/cabinet/${this.model}/${item.id}`)
    },
    async deleteRecord() {
      await this.$axios.$delete(`/${this.model}/${this.record.id}`)
      return this.$router.push(`/cabinet/${this.model}`)
      await this.getList()
    },
    async saveRecord() {
      const res = await this.$axios.$put(`/${this.model}/${this.record.id}`, this.record)
      return this.$router.push(`/cabinet/${this.model}/${res.id}`)
      //this.record = res || {}
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
      } else if (field.type === 'Date') {
        return 'date'
      }
      return 'text'
    },
    async getList() {
      const res = await this.$axios.$get(`/${this.model}/list`)
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
    page-break-inside: avoid
    /* Theoretically FF 20+ */
    break-inside: avoid-column
    /* Chrome, Safari, IE 11 */
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