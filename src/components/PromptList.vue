<template>
    <v-card>
        <v-card-title>
            Propostas
            <v-spacer></v-spacer>
            <v-text-field append-icon="search" label="Pesquisar" single-line hide-details v-model="search">        </v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search" hide-actions class="elevation-1">
            <template slot="items" scope="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.description }}</td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            headers: [
                { text: 'Título', left: true, value: 'title' },
                { text: 'Enunciado', left: true, value: 'description' }
            ],
            search: ''
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
