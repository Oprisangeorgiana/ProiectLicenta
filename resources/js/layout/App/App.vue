<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            app
            color="teal lighten-2"
        >
            <v-list dense>
                <!--                bag ceva poza? -->
                <v-list-item link>
                    <v-list-item-action>
                        <router-link :to="{ name: 'home' }">
                            <v-icon large color="white">mdi-home</v-icon>
                        </router-link>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-action>
                        <router-link :to="{ name: 'settings' }">
                            <v-icon large color="white">mdi-account-cog</v-icon>
                        </router-link>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-action>
                        <router-link :to="{ name: 'workspaces' }">
                            <v-icon large color="white">mdi-earth</v-icon>
                        </router-link>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Workspaces</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-action>
                        <router-link :to="{ name: 'help' }">
                            <v-icon large color="white">mdi-help</v-icon>
                        </router-link>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Help</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!--                <v-list-item link>-->
                <!--                    <v-list-item-action>-->
                <!--                        <v-icon large color="white">mdi-home</v-icon>-->
                <!--                    </v-list-item-action>-->
                <!--                    <v-list-item-content>-->
                <!--                        <v-list-item-title>Google</v-list-item-title>-->
                <!--                    </v-list-item-content>-->
                <!--                </v-list-item>-->

                <!--                Poate pun un dark mode -->

            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="teal"
        >
            <v-row
                align="center"
            >
                <v-col cols="4">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
                    <!--                    <v-toolbar-title color="white">Application</v-toolbar-title>-->
                </v-col>
                <v-col cols="6">
                    <v-btn-toggle
                        background-color="teal lighten"
                    >
                        <v-btn>
                            <router-link :to="{ name: 'calendar' }">
                                Calendar
                            </router-link>
                        </v-btn>

                        <v-btn>
                            <router-link :to="{ name: 'board' }">
                                Board
                            </router-link>
                        </v-btn>
                    </v-btn-toggle>
                </v-col>

                <v-col cols="2" align="right">
                    <router-link :to="{name: 'login'}">Log in</router-link>
                    <v-menu bottom offset-y>
                        <template v-slot:activator="{ on }">
                            <v-badge
                                :content="1"
                                color=#ff3300
                                overlap
                            >
                                <v-icon large color="white">mdi-bell</v-icon>
                            </v-badge>
                        </template>
                        <v-list>
                            <v-list-title

                            >

                            </v-list-title>
                        </v-list>
                    </v-menu>
                </v-col>

            </v-row>

        </v-app-bar>

        <v-content>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col class="text-center">
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>

        <v-footer
            color="teal"
            app
        >
            <v-layout justify-center>
                <span class="white--text">&copy; 2019-2020</span>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
    import {mapGetters} from 'vuex'
    import globalGetters from '../../store/global/getters'
    import globalActions from '../../store/global/actions'

    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,

        }),

        computed: {
            getDate() {
                const toTwoDigits = num => num < 10 ? '0' + num : num;
                let today = new Date();
                let year = today.getFullYear();
                let month = toTwoDigits(today.getMonth() + 1);
                let day = toTwoDigits(today.getDate());
                return `${year}-${month}-${day}`;
            },

            ...mapGetters({
                listProjects: globalGetters.GET_PROJECTS
            }),

        },
        async mounted() {
            await this.$store.dispatch(globalActions.FETCH_DETAILS)
        },
    }
</script>

<style>

</style>
