<template>
    <v-card>
        <v-card-title v-if="filterPrompt != false" class="blue darken-1 white--text mt-3">
            Proposta: {{ filterPrompt.date | moment('YYYY/MM') }} - {{ filterPrompt.title }}
        </v-card-title>
        <v-card-title>
            Redações
            <v-spacer></v-spacer>
            <v-text-field append-icon="search"
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
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
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
                { text: 'Nota final', left: true, value: 'score' }
            ],
            search: '',
            pagination: {
                rowsPerPage: 10,
                descending: true
            },
            loading: true,
            scoreColors: {
                '2.0': 'green',
                '1.5': 'blue',
                '1.0': 'yellow',
                '0.5': 'orange',
                '0.0': 'red'
            }
        }
    },
    computed: {
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
        prompts() {
            let prompts = {};
            for (let key in this.$store.state.prompts) {
                let prompt = this.$store.state.prompts[key];
                prompts[prompt.uid] = prompt;
            }
            this.loading = false;
            return prompts;
        },
        filterPrompt() {
            if (typeof(this.$route.query.filterPrompt) === 'undefined') {
                return false;
            }
            return this.prompts[this.$route.query.filterPrompt];
        },
    },
    methods: {
        getPrompt(essay) {
            if (typeof this.prompts[essay.prompt.uid] === 'undefined'){
                return { date: '' };
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
