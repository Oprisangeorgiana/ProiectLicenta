<template>


  <v-container>
    <v-row>
      <v-col cols="3">
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
        <v-card v-if="user">
          <draggable
            ghost-class="ghost"
            group="tasks"
            @add="onAddComing($event)">
            <transition-group type="transition">
              <div
                v-for="listTask in listTasks"
                v-if="listTask.state === 'COMING' "
                :key="listTask.id"
                :data-id="listTask.id"
              >
                <v-card
                  outlined
                  class="ma-2"
                >
                  {{ listTask.task }}
                </v-card>
              </div>
            </transition-group>
          </draggable>
        </v-card>

      </v-col>

      <v-col cols="3">
        <v-card tile flat color="teal lighten-4">
          <h1>TO DO
            <add-task v-if="user">
            </add-task>
          </h1>
        </v-card>
        <v-card v-if="user">
          <draggable
            ghost-class="ghost"
            group="tasks"
            @add="onAddToDo($event)">
            <div
              v-for="listTask in listTasks"
              v-if="listTask.state === 'TO DO' "
              :key="listTask.id"
              :data-id="listTask.id"
            >
              <v-card
                outlined
                class="ma-2"
              >
                {{ listTask.task }}
              </v-card>
            </div>
          </draggable>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card tile flat color="teal lighten-3">
          <h1>FINISHED
          </h1>
        </v-card>
        <v-card v-if="user">
          <draggable
            ghost-class="ghost"
            group="tasks"
            @add="onAddFinished($event)">
            <div
              v-for="listTask in listTasks"
              v-if="listTask.state === 'FINISHED' "
              :key="listTask.id"
              :data-id="listTask.id"
            >
              <v-card
                outlined
                class="ma-2"
              >
                {{ listTask.task }}
              </v-card>
            </div>
          </draggable>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card tile flat color="teal lighten-4">
          <h1>CANCELED
          </h1>
        </v-card>
        <v-card v-if="user">
          <draggable
            class="list-group-item"
            group="tasks"
            @add="onAddCanceled($event)"
            ghost-class="ghost"
          >
            <div
              v-for="listTask in listTasks"
              v-if="listTask.state === 'CANCELED' "
              :key="listTask.id"
              :data-id="listTask.id"
            >
              <v-card
                outlined
                class="ma-2"
              >
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import draggable from "vuedraggable";
  import boardActions from "./store/actions";
  import boardGetters from "./store/getters";
  import { mapGetters } from "vuex";
  import AddTask from '../../../../resources/js/layout/UI-kit/AddTask'
  import ModifyTask from '../../../../resources/js/layout/UI-kit/ModifyTask'
  import DeleteTask from '../../../../resources/js/layout/UI-kit/DeleteTask'
  import globalGetters from '../../../js/store/global/getters'
  import axios from 'axios'
  import TasksRepository from '../../repositories/TasksRepository'
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
    data () {
      return {
        listComing: null,
      };

    },

    computed: {
      ...mapGetters({
        listTasks: boardGetters.GET_TASKS,
        user: globalGetters.GET_USER
      }),
    },
    methods: {
      onAddComing: async function (item) {
        console.log('onAddComing', item.item.getAttribute('data-id'))
        let ID = item.item.getAttribute('data-id')
        let modifyStateTask = {
          id:ID,
          state:'COMING'
        }
        await new TasksRepository().update(modifyStateTask)
      },
      onAddToDo: async function (item) {
        let ID = item.item.getAttribute('data-id')
        let modifyStateTask = {
          id:ID,
          state:'TO DO'
        }
        await new TasksRepository().update(modifyStateTask)
        // console.log('onAddToDo', item.item.getAttribute('data-id'))
      },
      onAddFinished: async function (item) {
        let ID = item.item.getAttribute('data-id')
        let modifyStateTask = {
          id:ID,
          state:'FINISHED'
        }
        await new TasksRepository().update(modifyStateTask)
        // console.log('onAddFinished', item.item.getAttribute('data-id'))
      },
      onAddCanceled: async function (item) {
        let ID = item.item.getAttribute('data-id')
        let modifyStateTask = {
          id:ID,
          state:'CANCELED'
        }
        await new TasksRepository().update(modifyStateTask)
        // console.log('onAddCanceled', item.item.getAttribute('data-id'))
      },
      // replace: function () {
      //   this.list = [this.listTasks.task];
      // },
      // clone: function (el) {
      //   return {
      //     name: this.el.task + " cloned"
      //   };
      // },
      // log: function (evt) {
      //   window.console.log(evt);
      // }
    },
    async mounted () {
      await this.$store.dispatch(boardActions.FETCH_PAGE_DETAILS)
    },

  };
</script>
<style scoped>
  .ghost {
    opacity: 0.4;
    border-left: teal solid 6px;
  }
</style>
