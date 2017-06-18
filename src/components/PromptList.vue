<template>
    <v-card>
        <v-card-title>
            Propostas
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Pesquisar" single-line hide-details v-model="search">        </v-text-field>
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
                <td>{{ props.item.date | moment('YYYY/MM') }}</td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.description | makeBrief }}</td>
                <td>
                    <router-link :to="{ path: '/essay', query: { filterPrompt: props.item.uid } }">
                        Ver redações
                    </router-link>
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
                { text: 'Enunciado', left: true, value: 'description' },
                { text: 'Ações', sortable: false, value: 'actions' }
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
            return this.$store.state.prompts;
        }
    }
}
</script>


<style>

</style>
