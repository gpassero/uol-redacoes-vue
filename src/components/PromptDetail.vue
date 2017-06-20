<template>
    <v-card v-if="prompt != false">
        <v-card-title class="blue darken-1 white--text mt-3">
            Proposta: {{ prompt.date | moment('YYYY/MM') }} - {{ prompt.title }}
        </v-card-title>
        <v-card-text>
            <h6>Enunciado:</h6>
            <div>
                {{ prompt.description }}
            </div>
        </v-card-text>
        <v-card-text>
            <h6>Textos Motivadores:</h6>
            <div class="backing-text-markdown">
                <v-markdown>{{ prompt.backing_text }}</v-markdown>
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <essay-list :prompt-uid="prompt.uid" :inline="true"></essay-list>
        </v-card-text>
    </v-card>
    <v-card v-else>
        <v-alert error value="true">
            A proposta {{ uid }} não foi encontrada.
        </v-alert>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex';
    import VueMarkdown from 'vue-markdown';
    import EssayList from './EssayList.vue';

    export default {
        props: ['uid'],
        components: {
            'v-markdown': VueMarkdown,
            EssayList
        },
        computed: {
            ...mapState(['promptsById']),
            prompt() {
                if (typeof this.promptsById[this.uid] === 'undefined') {
                    return false;
                }
                return this.promptsById[this.uid];
            }
        }
    }
</script>


<style>

</style>
