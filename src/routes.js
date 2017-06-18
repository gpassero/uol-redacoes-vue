import Home from './components/Home.vue'
import EssayList from './components/EssayList.vue'
import PromptList from './components/PromptList.vue'

export default [
    { path: '/', component: Home},
    { path: '/essay', component: EssayList},
    { path: '/prompt', component: PromptList}
]