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
                <td class="text-xs-center">
                    <router-link :to="{ name: 'promptDetail', params: { uid: props.item.uid } }">
                        <v-btn primary floating small light title="Ver proposta">
                            <v-icon light>description</v-icon>
                        </v-btn>
                    </router-link>
                    <router-link :to="{ path: '/essays', query: { filterPrompt: props.item.uid } }">
                        <v-btn info floating small light title="Ver redações">
                            <v-icon light>list</v-icon>
                        </v-btn>
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
                    { text: 'Ações', left: true, value: 'actions' }
                ],
                search: '',
                pagination: {
                    rowsPerPage: 10,
                    descending: true
                },
                loading: false
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
