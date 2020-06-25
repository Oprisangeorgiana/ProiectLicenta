<template>


  <v-container>
    <v-row>
      <v-col cols="3">
        <v-card tile flat color="teal lighten-1">
          <h1>COMING
            <add-task v-if="userAuthorisation > 1">
            </add-task>
          </h1>
        </v-card>
        <v-card
          color="grey lighten-2"
          v-if="user"
        >
          <draggable
            ghost-class="ghost"
            group="tasks"
            @add="onAddComing($event)">
            <transition-group type="transition">
              <v-card
                color="teal lighten-4"
                v-for="listTask in listTasks"
                v-if="listTask.state === 'COMING' "
                :key="listTask.id"
                :data-id="listTask.id"
                outlined
                class="ma-2"
              >
                <v-card-title>
                  {{listTask.task}}
                </v-card-title>
                <v-card-subtitle>
                  Last modified by: {{listTask.task_type}}
                </v-card-subtitle>
                <div>
                  <v-card

                    v-for="item in listSubtasks"
                    :key="item.id"
                    v-if="item.task_id === listTask.id"
                    outlined
                    class="ma-2">

                    <v-card-title>
                      {{ item.description }}
                    </v-card-title>
                    <v-card-subtitle>
                      Deadline: {{item.end_subtask_date}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                      <h2>
                        {{item.subtask_state}}
                      </h2>
                    </v-card-subtitle>
                    <v-card-actions>

                      <modify-subtask
                        :currentSubtask="item"
                      ></modify-subtask>

                      <delete-subtask
                        :currentSubtask="item"
                      >
                      </delete-subtask>
                      <v-chip
                        outlined
                        color="teal"
                        small
                        v-if="item.subtask_state ==='TO DO'"
                        @click="fromToDoTOFinished(item)"
                      >
                        Finished
                      </v-chip>
                      <v-chip
                        v-else
                        outlined
                        color="teal"
                        small
                        @click="fromFinishedToToDo(item)"
                      >
                        To do
                      </v-chip>
                    </v-card-actions>
                  </v-card>
                </div>

                <v-card-actions>

                  <v-icon
                    v-if="userAuthorisation > 1"
                    @click="taskFinished(listTask)"
                  >
                    mdi-check-bold
                  </v-icon>

                  <v-icon
                    v-if="userAuthorisation > 1"
                    @click="taskCanceled(listTask)"
                  >
                    mdi-cancel
                  </v-icon>

                  <add-subtask
                    :currentTask="listTask"
                  >
                  </add-subtask>

                  <modify-task
                    v-if="userAuthorisation > 1"
                    :currentTask="listTask"
                  >
                  </modify-task>

                  <delete-task
                    v-if="userAuthorisation > 1"
                    :currentTask="listTask"
                  >
                  </delete-task>

                </v-card-actions>
              </v-card>

            </transition-group>
          </draggable>
        </v-card>

      </v-col>

      <v-col cols="3">
        <v-card tile flat color="teal lighten-2">
          <h1>TO DO
          </h1>
        </v-card>
        <v-card
          color="grey lighten-2"
          v-if="user"
        >
          <draggable
            ghost-class="ghost"
            group="tasks"
            @add="onAddToDo($event)">
            <v-card
              color="teal lighten-4"
              v-for="listTask in listTasks"
              v-if="listTask.state === 'TO DO' "
              :key="listTask.id"
              :data-id="listTask.id"
              outlined
              class="ma-2"
            >
              <v-card-title>
                {{listTask.task}}
              </v-card-title>
              <div>
                <v-card-subtitle>
                  Last modified by: {{listTask.task_type}}
                </v-card-subtitle>
                <v-card

                  v-for="item in listSubtasks"
                  :key="item.id"
                  v-if="item.task_id === listTask.id"
                  outlined
                  class="ma-2">

                  <v-card-title>
                    {{ item.description }}
                  </v-card-title>
                  <v-card-subtitle>
                    Deadline: {{item.end_subtask_date}}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    <h2>{{item.subtask_state}}</h2>
                  </v-card-subtitle>

                  <v-card-actions>

                    <modify-subtask
                      :currentSubtask="item"
                    ></modify-subtask>

                    <delete-subtask
                      :currentSubtask="item"
                    >
                    </delete-subtask>
                    <v-chip
                      outlined
                      color="teal"
                      small
                      v-if="item.subtask_state ==='TO DO'"
                      @click="fromToDoTOFinished(item)"
                    >
                      Finished
                    </v-chip>
                    <v-chip
                      v-else
                      outlined
                      color="teal"
                      small
                      @click="fromFinishedToToDo(item)"
                    >
                      To do
                    </v-chip>

                  </v-card-actions>
                </v-card>
              </div>

              <v-card-actions>

                <v-icon
                  v-if="userAuthorisation > 1"
                  @click="taskFinished(listTask)"
                >
                  mdi-check-bold
                </v-icon>
                <v-icon
                  v-if="userAuthorisation > 1"
                  @click="taskCanceled(listTask)"
                >
                  mdi-cancel
                </v-icon>

                <add-subtask
                  :currentTask="listTask"
                >

                </add-subtask>
                <modify-task
                  v-if="userAuthorisation > 1"
                  :currentTask="listTask"
                >
                </modify-task>
                <delete-task
                  v-if="userAuthorisation > 1"
                  :currentTask="listTask"
                >
                </delete-task>
              </v-card-actions>
            </v-card>
          </draggable>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card tile flat color="teal lighten-1">
          <h1>FINISHED
          </h1>
        </v-card>
        <v-card
          color="grey lighten-2"
          v-if="user"
        >
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
                color="teal lighten-4"
              >
                <v-card-title>
                  {{ listTask.task }}
                </v-card-title>
                <v-card-subtitle>
                  Last modified by: {{listTask.task_type}}
                </v-card-subtitle>

                <v-card

                  v-for="item in listSubtasks"
                  :key="item.id"
                  v-if="item.task_id === listTask.id"
                  outlined
                  class="ma-2">

                  <v-card-title>
                   {{ item.description }}
                  </v-card-title>
                  <v-card-subtitle>
                    Deadline: {{item.end_subtask_date}}
                  </v-card-subtitle>
                  <v-card-subtitle>
                    <h2>{{item.subtask_state}}</h2>
                  </v-card-subtitle>

                  <v-card-actions>

                    <modify-subtask
                      :currentSubtask="item"
                    ></modify-subtask>

                    <delete-subtask
                      :currentSubtask="item"
                    >
                    </delete-subtask>
                    <v-chip
                      outlined
                      color="teal"
                      small
                      v-if="item.subtask_state ==='TO DO'"
                      @click="fromToDoTOFinished(item)"
                    >
                      Finished
                    </v-chip>
                    <v-chip
                      v-else
                      outlined
                      color="teal"
                      small
                      @click="fromFinishedToToDo(item)"
                    >
                      To do
                    </v-chip>

                  </v-card-actions>
                </v-card>
              </v-card>
            </div>
          </draggable>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card tile flat color="teal lighten-2">
          <h1>CANCELED
          </h1>
        </v-card>
        <v-card
          v-if="user"
          color="grey lighten-2"
        >
          <draggable
            class="list-group-item"

            @add="onAddCanceled($event)"
            ghost-class="ghost"
          >
            <v-card
              color="teal lighten-4"
              v-for="listTask in listTasks"
              v-if="listTask.state === 'CANCELED' "
              :key="listTask.id"
              :data-id="listTask.id"
              outlined
              class="ma-2"
            >
              <v-card-title>
                {{listTask.task}}
              </v-card-title>
              <div>
                <v-card-subtitle>
                  Last modified by: {{listTask.task_type}}
                </v-card-subtitle>
                <v-card
                  v-for="item in listSubtasks"
                  :key="item.id"
                  v-if="item.task_id === listTask.id"
                  outlined
                  class="ma-2">

                  <v-card-title>
                     {{ item.description }}
                  </v-card-title>
                  <v-card-subtitle>
                    Deadline: {{item.end_subtask_date}}
                  </v-card-subtitle>
                  <v-card-actions>

                    <modify-subtask
                      :currentSubtask="item"
                    ></modify-subtask>

                    <delete-subtask
                      :currentSubtask="item"
                    >
                    </delete-subtask>

                  </v-card-actions>
                </v-card>
              </div>
              <v-card-actions
                v-if="userAuthorisation > 1"
              >
                <delete-task
                  :currentTask="listTask"
                >
                </delete-task>
              </v-card-actions>
            </v-card>
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
  import AddSubtask from '../../../../resources/js/layout/UI-kit/AddSubtask'
  import ModifyTask from '../../../../resources/js/layout/UI-kit/ModifyTask'
  import ModifySubtask from '../../../../resources/js/layout/UI-kit/ModifySubtask'
  import DeleteTask from '../../../../resources/js/layout/UI-kit/DeleteTask'
  import DeleteSubtask from '../../../../resources/js/layout/UI-kit/DeleteSubtask'
  import globalGetters from '../../../js/store/global/getters'
  import globalActions from '../../../js/store/global/actions'
  import axios from 'axios'
  import TasksRepository from '../../repositories/TasksRepository'
  import SubtasksRepository from '../../repositories/SubtasksRepository'

  export default {
    name: "board",
    display: "Two Lists",
    order: 1,
    components: {
      draggable,
      AddTask,
      AddSubtask,
      ModifyTask,
      ModifySubtask,
      DeleteTask,
      DeleteSubtask,
    },
    data () {
      return {
        listComing: null,

      };

    },

    computed: {
      ...mapGetters({
        listTasks: globalGetters.GET_TASKS,
        listSubtasks: globalGetters.GET_SUBTASKS,
        user: globalGetters.GET_USER,
        userAuthorisation: globalGetters.GET_USER_AUTH,
        employeesList: globalGetters.GET_EMPLOYEES
      }),

      myTasks () {
        let myListTasks = []
        Object.keys(this.listTasks).forEach(key => {
          if (this.listTasks[key].employee === this.user.employee_id) {
            myListTasks.push(this.listTasks[key])
          }
        })
        return myListTasks
      }
      // userAuthorisation(){
      //   let employees = this.employeesList
      //   let user = this.user
      //   let auth = null
      //   Object.keys(employees).forEach(key =>{
      //     if(employees[key].id === this.user.employee_id){
      //       auth = employees[key].authorisation_id
      //     }
      //   })
      //   return auth
      // }

    },
    methods: {
      taskFinished: async function (item) {
        let ID = item.id
        console.log('onAddComing', item.id)

        let modifyStateTask = {
          id: ID,
          state: 'FINISHED'
        }
        await new TasksRepository().update(modifyStateTask)
      },
      taskCanceled: async function (item) {
        let ID = item.id
        let modifyStateTask = {
          id: ID,
          state: 'CANCELED'
        }
        await new TasksRepository().update(modifyStateTask)
      },
      onAddComing: async function (item) {
        // console.log('onAddComing', item.item.getAttribute('data-id'))
        let ID = item.item.getAttribute('data-id')
        let modifyStateTask = {
          id: ID,
          state: 'COMING'
        }
        await new TasksRepository().update(modifyStateTask)
      },
      onAddToDo: async function (item) {
        let ID = item.item.getAttribute('data-id')
        let modifyStateTask = {
          id: ID,
          state: 'TO DO'
        }
        await new TasksRepository().update(modifyStateTask)
        // console.log('onAddToDo', item.item.getAttribute('data-id'))
      },
      onAddFinished: async function (item) {
        let ID = item.item.getAttribute('data-id')
        let modifyStateTask = {
          id: ID,
          state: 'FINISHED'
        }
        await new TasksRepository().update(modifyStateTask)
        // console.log('onAddFinished', item.item.getAttribute('data-id'))
      },
      onAddCanceled: async function (item) {
        let ID = item.item.getAttribute('data-id')
        let modifyStateTask = {
          id: ID,
          state: 'CANCELED'
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
      fromToDoTOFinished: async function (item) {
        let ID = item.id
        let modifyState = {
          id: ID,
          subtask_state: 'FINISHED'
        }
        await new SubtasksRepository().update(modifyState)
      },

      fromFinishedToToDo: async function (item) {
        let ID = item.id
        let modifyState = {
          id: ID,
          subtask_state: 'TO DO'
        }
        await new SubtasksRepository().update(modifyState)
      },

    },
    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_PAGE_TASKS)
      await this.$store.dispatch(globalActions.FETCH_SUBTASKS)
      await this.$store.dispatch(globalActions.FETCH_USER)
      await this.$store.dispatch(globalActions.FETCH_EMPLOYEES)
      await this.$store.dispatch(globalActions.FETCH_USER_AUTH)

      // await console.log('myTasks', this.myTasks)
    },

  };
</script>
<style scoped>
  .ghost {
    opacity: 0.4;
    border-left: teal solid 6px;
  }
</style>
