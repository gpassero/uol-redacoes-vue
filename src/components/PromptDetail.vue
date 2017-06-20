<template>
    <v-card v-if="prompt != false">
        <v-card-title class="blue darken-1 white--text mt-3">
            Proposta: {{ prompt.date | moment('YYYY/MM') }} - {{ prompt.title }}
        </v-card-title>
    </v-card>
    <v-card v-else>
        <v-alert error value="true">
            A proposta {{ uid }} não foi encontrada.
        </v-alert>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        props: ['uid'],
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
