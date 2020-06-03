<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="700"
    >
        <template v-slot:activator="{on}">
            <v-btn fab dark small color="teal">
                <v-icon dark v-on="on">mdi-plus</v-icon>
            </v-btn>
        </template>
            <v-card>
                <v-card-title>
                    <span class="headline">New task</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Task*" required v-model="description"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select
                                    :items="['task', 'subtask']"
                                    label="Type*"
                                    required
                                    v-model="task_type"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-date-picker color="teal">
                                    <v-date-picker-header v-model="deadline">
                                        Deadline
                                    </v-date-picker-header>
                                </v-date-picker>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal" text @click="dialog = false">Close</v-btn>
                    <v-btn color="teal" text @click="register">Save</v-btn>
                </v-card-actions>
            </v-card>

    </v-dialog>
</template>

<script>

    import boardMutations from '../../pages/Board/store/mutations'
    import boardGetters from '../../pages/Board/store/getters'
    import boardActions from '../../pages/Board/store/actions'

    export default {
        name: "add-task",
        data() {
            return {
                dialog: false,
            };
    },
        computed: {

            description: {
                get () {
                    return this.$store.getters[boardGetters.GET_DESCRIPTION]
                },

                set (value) {
                    this.$store.commit(boardMutations.SET_DESCRIPTION, value)
                }
            },
            task_type: {
                get () {
                    return this.$store.getters[boardGetters.GET_TASK_TYPE]
                },

                set (value) {
                    this.$store.commit(boardMutations.SET_TASK_TYPE, value)
                }
            },
            deadline: {
                get () {
                    return this.$store.getters[boardGetters.GET_DEADLINE]
                },

                set (value) {
                    this.$store.commit(boardMutations.SET_DEADLINE, value)
                }
            },
        },

        mounted () {},

        methods: {
            async register () {
                await this.$store.dispatch(boardActions.CREATE_TASK)
                return this.dialog = false
            }
        }

    }
</script>

<style scoped>

</style>
