<template>
    <v-card v-if="essay != false">
        <v-card-title class="blue darken-1 white--text mt-3">
            Redação: {{ getPrompt(essay).date | moment('YYYY/MM') }} - {{ essay.title }}
        </v-card-title>
    </v-card>
    <v-card v-else>
        <v-alert error value="true">
            A redação {{ uid }} não foi encontrada.
        </v-alert>
    </v-card>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        props: ['uid'],
        computed: {
            ...mapState(['essaysById', 'promptsById']),
            essay() {
                if (typeof(this.essaysById[this.uid]) === 'undefined') {
                    return false;
                }
                return this.essaysById[this.uid];
            }
        },
        methods: {
            getPrompt(essay) {
                if (typeof (this.promptsById[essay.prompt.uid]) === 'undefined') {
                    return { date: '1990-01-01' };
                }
                return this.promptsById[essay.prompt.uid];
            }
        }
    }
</script>


<style>

</style>
