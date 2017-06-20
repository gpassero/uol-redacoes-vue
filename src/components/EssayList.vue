<template>
    <v-card>
        <v-card-title v-if="filterPrompt != false" class="blue darken-1 white--text mt-3" v-show="!inline">
            Proposta: {{ filterPrompt.date | moment('YYYY/MM') }} - {{ filterPrompt.title }}
        </v-card-title>
        <v-card-title>
            Redações
            <v-spacer></v-spacer>
            <v-text-field
                        append-icon="search"
                        label="Pesquisar"
                        single-line
                        hide-details
                        v-model="search"></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            :pagination.sync="pagination"
            :loading="loading"
            no-data-text="Nenhuma informação para exibir"
            no-results-text="Nenhum registro encontrado"
            class="elevation-1">
            <template slot="items" scope="props">
                <td>{{ getPrompt(props.item).date | moment('YYYY/MM') }}</td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.text | makeBrief }}</td>
                <td v-for="i in [1, 2, 3, 4, 5, 0]">
                    <v-chip class="white--text" :class="getScoreColor(props.item, i)">
                        {{ getScore(props.item, i).toFixed(1) }}
                        <v-icon v-if="i==0" right>{{ getFinalScoreIcon(props.item) }}</v-icon>
                    </v-chip>
                </td>
                <td class="text-xs-center">
                    <router-link :to="{ name: 'essayDetail', params: { uid: props.item.uid } }">
                        <v-btn primary floating small light title="Ver proposta">
                            <v-icon light>description</v-icon>
                        </v-btn>
                    </router-link>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        props: {
            promptUid: {
                type: String,
                default: ''
            },
            inline: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                headers: [
                    { text: 'Data', left: true, value: 'date' },
                    { text: 'Título', left: true, value: 'title' },
                    { text: 'Texto', left: true, value: 'text' },
                    { text: 'Nota 1', left: true, value: 'score1' },
                    { text: 'Nota 2', left: true, value: 'score2' },
                    { text: 'Nota 3', left: true, value: 'score3' },
                    { text: 'Nota 4', left: true, value: 'score4' },
                    { text: 'Nota 5', left: true, value: 'score5' },
                    { text: 'Nota final', left: true, value: 'score' },
                    { text: 'Ações', left: true, value: 'actions' }
                ],
                search: '',
                pagination: {
                    rowsPerPage: 10,
                    descending: true
                },
                loading: false,
                scoreColors: {
                    '2.0': 'green',
                    '1.5': 'blue',
                    '1.0': 'brown',
                    '0.5': 'orange',
                    '0.0': 'red'
                }
            }
        },
        computed: {
            ...mapState({
                prompts: 'promptsById',
                essays: 'essays'
            }),
            items() {
                if (this.filterPrompt == false) {
                    return this.$store.state.essays;
                } else {
                    let essays = [];
                    for (let key in this.$store.state.essays) {
                        let essay = this.$store.state.essays[key];
                        if (essay.prompt.uid == this.filterPrompt.uid) {
                            essays.push(essay);
                        }
                    }
                    return essays;
                }
            },
            filterPrompt() {
                if (typeof this.$route.query.filterPrompt === 'undefined') {
                    if (this['promptUid'] == '') {
                        return false;
                    } else {
                        return this.prompts[this['promptUid']];
                    }
                }
                if (typeof this.prompts[this.$route.query.filterPrompt] === 'undefined') {
                    return false;
                }
                return this.prompts[this.$route.query.filterPrompt];
            },
        },
        methods: {
            getPrompt(essay) {
                if (typeof (this.prompts[essay.prompt.uid]) === 'undefined') {
                    return { date: '1990-01-01' };
                }
                return this.prompts[essay.prompt.uid];
            },
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
        }
    }
</script>

<style>

</style>
