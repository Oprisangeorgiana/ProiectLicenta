<template>
    <v-container>
        <v-row>
            <v-col cols ="3">
                <v-card tile flat color="teal lighten-3">
                    <!--                <span class="badge badge-secondary">-->
                    <!--                {{ TaskCount }}-->
                    <!--                  1-->
                    <!--            </span>-->
                    <h1>COMING
                        <add-task v-if="user">
                        </add-task>
                    </h1>
                </v-card>
            </v-col>

            <v-col cols ="3">
                <v-card tile flat color="teal lighten-4">
                    <h1>TO DO
                        <add-task v-if="user">
                        </add-task>
                    </h1>
                </v-card>
            </v-col>

            <v-col cols ="3">
                <v-card tile flat color="teal lighten-3">
                    <h1>FINISHED
                    </h1>
                </v-card>
            </v-col>

            <v-col cols ="3">
                <v-card tile flat color="teal lighten-4">
                    <h1>CANCELED
                    </h1>
                </v-card>
            </v-col>

        </v-row>

        <v-row v-if="user">

            <v-col cols ="3">
                <draggable class="list-group"  group="people" @change="log">
                    <div
                        class="list-group-item"
                        v-for="listTask in listTasks"
                        v-if="listTask.task_type === 'subtask' "
                        :key="listTask.task"


                    >
                        <v-card
                            outlined
                            class="mr-10"
                        >
                            {{ listTask.task }}
                        </v-card>
                    </div>
                </draggable>
            </v-col>

            <v-col cols ="3">
                <draggable class="list-group"  group="people" @change="log">
                    <div
                        class="list-group-item"
                        v-for="listTask in listTasks"
                        v-if="listTask.task_type === 'task' "
                        :key="listTask.task"

                    >
                        <v-card
                            outlined
                            class="mr-10"
                        >
                            {{ listTask.task }}
                        </v-card>
                    </div>
                </draggable>
            </v-col>

            <v-col cols ="3">
                <draggable class="list-group"  group="people" @change="log">
                    <div
                        class="list-group-item"
                        v-for="listTask in listTasks"
                        v-if="listTask.task_type === 'task' "
                        :key="listTask.task"

                    >
                        <v-card
                            outlined
                            class="mr-10"
                        >
                            {{ listTask.task }}
                        </v-card>
                    </div>
<!--                    <div-->
<!--                    class="list-group-item"-->
<!--                    v-for="listTask in listTasks"-->
<!--                    v-else-->
<!--                    :key="listTask.task"-->
<!--                    >-->
<!--                        <v-card-->
<!--                            outlined-->
<!--                            class="pa-2"-->
<!--                        >-->
<!--                            {{ listTask.task }}-->
<!--                        </v-card>-->
<!--                    </div>-->
                </draggable>
            </v-col>

            <v-col cols ="3">
                <draggable class="list-group"  group="people" @change="log">
                    <div
                        class="list-group-item"
                        v-for="listTask in listTasks"
                        v-if="listTask.task_type === 'task' "
                        :key="listTask.task"

                    >
                        <v-card>

                            <v-card-text>
                                Task: {{ listTask.task }}
                            </v-card-text>
                            <v-card-subtitle>
                                Deadline: {{listTask.deadline}}
                            </v-card-subtitle>
                            <v-card-actions>
                                <modify-task
                                :currentTask="listTask"
                                ></modify-task>
                                <delete-task
                                  :currentTask="listTask"
                                >
                                </delete-task>
                            </v-card-actions>
                        </v-card>
                    </div>
                </draggable>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import draggable from "vuedraggable";
    import boardActions from "./store/actions";
    import boardGetters from "./store/getters";
    import {mapGetters} from "vuex";
    import AddTask from '../../../../resources/js/layout/UI-kit/AddTask'
    import ModifyTask from '../../../../resources/js/layout/UI-kit/ModifyTask'
    import DeleteTask from '../../../../resources/js/layout/UI-kit/DeleteTask'
    import globalGetters from'../../../js/store/global/getters'
    // import {DraggableTree} from 'vue-draggable-nested-tree'
    // import nestedDraggable from '';


    export default {
        name: "board",
        display: "Two Lists",
        order: 1,
        components: {
            draggable,
            AddTask,
            ModifyTask,
            DeleteTask,
        },
        data() {
            return {};

        },

        computed: {
            ...mapGetters({
                listTasks: boardGetters.GET_TASKS,
                user: globalGetters.GET_USER
            }),
        },
        methods: {
            add: function () {
                this.list.push(this.listTasks.task);
            },
            replace: function () {
                this.list = [this.listTasks.task];
            },
            clone: function (el) {
                return {
                    name: this.el.task + " cloned"
                };
            },
            log: function (evt) {
                window.console.log(evt);
            }
        },
        async mounted() {
            await this.$store.dispatch(boardActions.FETCH_PAGE_DETAILS)
        },

    };
</script>
