import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import VueMoment from 'vue-moment'

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
    essaysById: [],
    prompts: [],
    promptsById: {},
    loaded: false
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  methods: {
    loadData() {
      if (!this.$store.state.loaded) {
        this.$resource('essays{/id}.json?limitToFirst=50&orderBy="key"').get().then(response => {
          this.$store.state.essays = response.body
          let essays = {};
          for (let key in this.$store.state.essays) {
            let essay = this.$store.state.essays[key];
            essays[essay.uid] = essay;
          }
          this.$store.state.essaysById = essays;
        }), response => {
          alert('Couldn\'t connect with server.')
        }
        this.$resource('prompts{/id}.json').get().then(response => {
          this.$store.state.prompts = response.body
          let prompts = {};
          for (let key in this.$store.state.prompts) {
            let prompt = this.$store.state.prompts[key];
            prompts[prompt.uid] = prompt;
          }
          this.$store.state.promptsById = prompts;
        }), response => {
          alert('Couldn\'t connect with server.')
        }
        this.$store.state.loaded = true
      }
    }
  },
  created() {
    this.loadData()
  }
})

Vue.filter('makeBrief', value => {
  if (value.length < 100) {
    return value
  }
  return value.substr(0, 100) + '...'
})

Vue.use(VueMoment)