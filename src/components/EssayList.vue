<template>
    <v-card>
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
                { text: 'Texto', left: true, value: 'text' }
            ],
            search: '',
            pagination: {
                rowsPerPage: 10,
                descending: true
            },
            loading: true
        }
    },
    computed: {
        items() {
            return this.$store.state.essays;
        },
        prompts() {
            let prompts = {};
            for (let key in this.$store.state.prompts) {
                let prompt = this.$store.state.prompts[key];
                prompts[prompt.uid] = prompt;
            }
            this.loading = false;
            return prompts;
        }
    },
    methods: {
        getPrompt(essay) {
            if (typeof this.prompts[essay.prompt.uid] === 'undefined'){
                return '';
            }
            return this.prompts[essay.prompt.uid];
        }
    }
}
</script>

<style>

</style>
