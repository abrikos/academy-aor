export default async function ({store, redirect, app, route}) {
  try{
    await store.dispatch('auth/getUser')
  }catch (e) {
    console.log('try save redirect', route.fullPath)
    app.$saveRedirect(route.fullPath)
    return redirect('/user/login')
  }
}
