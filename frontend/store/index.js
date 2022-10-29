export const state = () => ({
  loginRedirect: '/cabinet/settings',
  snackbar: null,
  pages: []
})

export const mutations = {
  setSnackBar(state, payload){
    state.snackbar = payload
  },
  setPages(state, payload){
    state.pages = payload
  }
}

export const getters = {
  getLoginRedirect(state) {
    return state.loginRedirect;
  },
  getLoggedUser(state) {
    return state.auth.user
  },
  getSnackBar(state) {
    return state.snackbar
  }
}

