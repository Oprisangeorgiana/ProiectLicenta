<template>
    <div>
        <v-row class="mb-8">
            <v-expansion-panels popout>
                <v-expansion-panel>
                    <v-expansion-panel-header>
                        <v-layout justify-center>
                            <v-avatar
                                color="teal"
                                size="100px"
                            >
                                <v-icon large>mdi-account-circle</v-icon>
                            </v-avatar>
                        </v-layout>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Change your photo"
                            prepend-icon="mdi-camera"
                        >
                        </v-file-input>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>


        <v-row class="mb-6">
            <v-col cols="3">
                <v-label>First Name</v-label>
            </v-col>
            <v-col cols="7">
                <v-text-field placeholder="First Name"></v-text-field>
            </v-col>
            <v-col class="2">
                <v-btn
                    v-model="firstName"
                    v-on:click="submitFirstName"
                    color="teal"
                >
                    SUBMIT
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="mb-6">
            <v-col cols="3">
                <v-label>Last Name</v-label>
            </v-col>
            <v-col cols="7">
                <v-text-field placeholder="Last Name"></v-text-field>
            </v-col>
            <v-col class="2">
                <v-btn
                    v-model="lastName"
                    v-on:click="submitLastName"
                    color="teal"
                >
                    SUBMIT
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="mb-6">
            <v-col cols="3">
                <v-label>New Password</v-label>
            </v-col>
            <v-col cols="7">
                <v-text-field placeholder="password"></v-text-field>
            </v-col>
            <v-col class="2">
                <v-btn>
<!--                    v-model ="password"-->
<!--                    v-on:click="submitPassword"-->
<!--                    color="teal" >-->
                    SUBMIT
                </v-btn>
            </v-col>
        </v-row>

    </div>
</template>

<script>

    import settingsActions from './store/actions'
    import settingsGetters from './store/getters'
    import settingsMutations from './store/mutations'

    export default {

        name: "Settings",


        computed: {

            firstName: {

                get() {
                    return this.$store.getters[settingsGetters.GET_FIRST_NAME]
                },

                set(value) {
                    this.$store.commit(settingsMutations.SET_FIRST_NAME, value)
                }
            },
            lastName: {
                get() {
                    return this.$store.getters[settingsGetters.GET_LAST_NAME]
                },

                set(value) {
                    this.$store.commit(settingsMutations.SET_LAST_NAME, value)
                }
            },
            // password: {
            //     get () {
            //         return this.$store.getters[settingsGetters.GET_PASSWORD]
            //     },
            //
            //     set (value) {
            //         this.$store.commit(settingsMutations.SET_PASSWORD, value)
            //     }
            // },
        },


        methods: {
            submitFirstName() {
                this.$store.dispatch(settingsActions.UPDATE_FIRST_NAME)
            },
            submitLastName() {
                this.$store.dispatch(settingsActions.UPDATE_LAST_NAME)
            },
            // submitPassword() {
            //     this.$store.dispatch(settingsActions.UPDATE_PASSWORD)
            // }
        },
    }


</script>

<style scoped>

</style>
