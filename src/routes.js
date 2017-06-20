import Home from './components/Home.vue'
import EssayList from './components/EssayList.vue'
import EssayDetail from './components/EssayDetail.vue'
import PromptList from './components/PromptList.vue'
import PromptDetail from './components/PromptDetail.vue'

export default [
    { path: '/', component: Home},
    { path: '/essays', component: EssayList},
    { name: 'essayDetail', path: '/essays/:uid', component: EssayDetail, props: true},
    { path: '/prompts', component: PromptList},
    { name: 'promptDetail', path: '/prompts/:uid', component: PromptDetail, props: true}
]