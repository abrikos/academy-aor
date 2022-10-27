import {LocalScheme} from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser(endpoint) {
    console.log(endpoint)
    // if (!this.$auth.ctx.route.path.match('/user')) return;
    const token = this.$auth.strategy.token.get();
    console.log('AUTH token', token)
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }
    const ep = {headers:{}};
    ep.headers[this.$auth.strategies.custom.options.token.name] = token.uid;

    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      ep,
      this.options.endpoints.user,
    ).then((response) => {
      const user = response.data
      this.$auth.setUser(user)

      return response
    }).catch((error) => {
      console.warn(error)
      this.$auth.callOnError(error, {method: 'fetchUser'})
    })
  }
}
