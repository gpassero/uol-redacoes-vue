<template>
    <v-app>
        <v-navigation-drawer temporary light v-model="drawer">
            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-tile value="true" router :to="item.to">
                        <v-list-tile-action>
                            <v-icon light v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar>
            <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <main>
            <v-container fluid>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </v-container>
        </main>
        <v-footer>
            <span>{{ footerText }}</span>
        </v-footer>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            drawer: true,
            items: [
                { icon: 'home', title: 'Início', to: '/' },
                { icon: 'assignment', title: 'Redações', to: '/essay' },
                { icon: 'book', title: 'Propostas', to: '/prompt' }
            ],
            title: 'UOL Redações Vue',
            footerText: 'uol-redacoes-vue'
        }
    }
}
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
