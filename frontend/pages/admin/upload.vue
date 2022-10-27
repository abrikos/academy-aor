<template>
  <div>
    <v-card>
      <v-card-title>Upload-example</v-card-title>
      <v-card-text>

        <input type="file" accept=".csv" @change="some" ref="inputFile" hidden>
        <v-btn @click="btnClick">{{$t('Upload')}}</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "upload",
  middleware: ['auth'],
  data() {
    return {
      components: [],
    }
  },
  methods: {
    btnClick() {
      this.$refs.inputFile.click()

    },
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      await this.$axios.$post('/admin/upload-list', formData)
      this.$refs.inputFile.value = null

    }
  }
}
</script>

<style scoped>

</style>