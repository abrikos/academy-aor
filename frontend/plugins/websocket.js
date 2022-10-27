export default function ({app, $axios, store}, inject) {
  let socket = connect();
  function connect() {
    if (!process.client) return
    //const ws = new WebSocket(process.env.NODE_ENV === 'production' ? `wss://${window.location.origin}/ws` : 'ws://localhost:' + app.$config.apiPort);
    const ws = new WebSocket(`wss://${window.location.host}/ws`);
    ws.onclose = function (e) {
      console.error('socket closed', ws.readyState)
      setTimeout(function () {
        console.log('Socket is closed. Reconnect will be attempted in 3 seconds.');
        socket = connect();
      }, 3000);
    };

    ws.onopen = (data) => {
      console.log('SOCKET OPEN', socket.readyState)
    }
    ws.onmessage = (e) => {
      if(!e.data) return
      const data = JSON.parse(e.data);
      console.log('wss received', data)
      if (data.toast) {
        console.log(data.toast)
        store.commit('setSnackBar', data.toast)
      }
      $nuxt.$emit('wss-message', data);
      if(data.event) $nuxt.$emit(data.event, data.payload);
      $nuxt.$loading.finish()
    };
    return ws;
  }

  const send = (event, payload) => {
    if (!socket) return;
    $nuxt.$loading.start()
    const token = app.$auth.strategy.token.get();
    console.log(token)
    socket.send(JSON.stringify({token: token?.uid, event, payload}));
    console.log('wss sent', event)
  }


  inject('wsSend', (event, payload) => {
    try {
      send(event, payload)
    } catch (e) {
      setTimeout(function () {
        console.warn('SEND FAILED', e.message)
        send(event, payload)
      }, 3000);
    }

  })
}
