import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import App from './App.vue'
import routes from './routes'

Vue.use(Vuetify)

Vue.use(VueResource)
Vue.http.options.root = 'http://uol-redacoes.firebaseio.com/';

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    essays: [],
    prompts: [],
    loaded: false
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  methods: {
    load_data() {
      if (!this.$store.state.loaded) {
        this.$resource('essays{/id}.json').get().then(response => {
          this.$store.state.essays = response.body
        }), response => {
          alert('Couldn\'t connect with server.')
        }
        this.$resource('prompts{/id}.json').get().then(response => {
          this.$store.state.prompts = response.body
        }), response => {
          alert('Couldn\'t connect with server.')
        }
        this.$store.state.loaded = true
      }
    }
  },
  created() {
    this.load_data()
  }
})