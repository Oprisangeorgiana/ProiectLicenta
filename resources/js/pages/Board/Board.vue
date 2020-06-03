<template>
    <v-container>
        <v-row>

            <v-col cols="3">
                <!--                <span class="badge badge-secondary">-->
                <!--                {{ TaskCount }}-->
                <!--                  1-->
                <!--            </span>-->
                <h1>COMING
                    <add-task>
                    </add-task>
                </h1>
            </v-col>

            <v-col cols="3">
                <h1>TO DO
                    <add-task>
                    </add-task>
                </h1>
            </v-col>

            <v-col cols="3">
                <h1>DOING
                    <add-task>
                    </add-task>
                </h1>
            </v-col>

            <v-col cols="3">
                <h1>FINISHED
                </h1>
            </v-col>

        </v-row>
        <v-row>

            <v-col cols="3">
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

            <v-col cols="3">
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

            <v-col cols="3">
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

            <v-col cols="3">
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



<!--            <rawDisplayer class="col-3" :value="list2" title="List 2"/>-->
        </v-row>
    </v-container>
</template>
<script>
    import draggable from "vuedraggable";
    import boardActions from "./store/actions";
    import boardGetters from "./store/getters";
    import {mapGetters} from "vuex";
    import AddTask from '../../../../resources/js/layout/UI-kit/AddTask'
    // import {DraggableTree} from 'vue-draggable-nested-tree'
    // import nestedDraggable from '';


    export default {
        name: "board",
        display: "Two Lists",
        order: 1,
        components: {
            draggable,
            AddTask,
        },
        data() {
            return {};

        },

        computed: {
            ...mapGetters({
                listTasks: boardGetters.GET_TASKS
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
