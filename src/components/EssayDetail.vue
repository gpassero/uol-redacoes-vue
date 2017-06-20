<template>
    <v-card v-if="essay != false">
        <v-card-title class="blue darken-1 white--text mt-3">
            Redação: {{ prompt.date | moment('YYYY/MM') }} - {{ essay.title }}
        </v-card-title>
        <v-card-text>
            <div style="white-space: pre-line;">
                {{ essay.text }}
            </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
            <h6>Comentários do Avaliador:</h6>
            <div class="backing-text-markdown">
                <v-markdown>{{ sanitizedComments(essay) }}</v-markdown>
            </div>
        </v-card-text>
        <v-card-text>
            <h6>Notas:</h6>
            <div>
                <v-list>
                    <v-list-group v-for="i in [1, 2, 3, 4, 5, 0]" :value="true">
                        <v-list-tile slot="item">
                            <v-list-tile-title>
                                <strong>{{ i != 0 ? 'Competência '+i : 'Nota final'}}:</strong>
                                <v-chip class="white--text" :class="getScoreColor(essay, i)">
                                    {{ getScore(essay, i).toFixed(1) }}
                                    <v-icon v-if="i==0" right>{{ getFinalScoreIcon(essay) }}</v-icon>
                                </v-chip>
                            </v-list-tile-title>
                        </v-list-tile>
                    </v-list-group>
                </v-list>
            </div>
        </v-card-text>
        <v-card-title class="blue darken-1 white--text mt-3">
            Proposta: {{ prompt.title }}
        </v-card-title>
        <v-card-text>
            <h6>Enunciado:</h6>
            <div>
                {{ prompt.description }}
            </div>
            <router-link to="{ name: 'promptDetail', params: { uid: prompt.uid } }">
                Ver proposta completa
            </router-link>
        </v-card-text>
    </v-card>
    <v-card v-else>
        <v-alert error value="true">
            A redação {{ uid }} não foi encontrada.
        </v-alert>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex';
    import VueMarkdown from 'vue-markdown';

    export default {
        props: ['uid'],
        data() {
            return {
                scoreColors: {
                    '2.0': 'green',
                    '1.5': 'blue',
                    '1.0': 'brown',
                    '0.5': 'orange',
                    '0.0': 'red'
                }
            }
        },
        components: {
            'v-markdown': VueMarkdown
        },
        computed: {
            ...mapState(['essaysById', 'promptsById']),
            essay() {
                if (typeof(this.essaysById[this.uid]) === 'undefined') {
                    return false;
                }
                return this.essaysById[this.uid];
            },
            prompt() {
                return this.getPrompt(this.essay);
            }
        },
        methods: {
            getPrompt(essay) {
                if (typeof (this.promptsById[essay.prompt.uid]) === 'undefined') {
                    return { date: '1990-01-01' };
                }
                return this.promptsById[essay.prompt.uid];
            },
            // TODO sanitize comments in origin
            sanitizedComments(essay) {
                return essay.comments.replace('<comments>', '').replace('</comments>', '');
            },
            // TODO merge with EssayList.vue same methodds
            getScore(essay, number) {
                if (number != 0) {
                    return essay.scores['Competência '+number];
                }
                return essay.total_score;
            },
            getScoreColor(essay, number) {
                let score = this.getScore(essay, number);
                if (number == 0) {
                    score = Math.round(2 * score / 5) / 2;
                }
                return this.scoreColors[score.toFixed(1)];
            },
            getFinalScoreIcon(essay) {
                let score = this.getScore(essay, 0).toFixed(1);
                if (score == 10) {
                    return 'star';
                }
                if (score == 0) {
                    return 'block';
                }
            }
        },
    }
</script>


<style>

</style>
