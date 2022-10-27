export const state = () => ({
  name: ''
})

export const mutations = {
  set(state, text) {
    state.name = text;
  },
}
