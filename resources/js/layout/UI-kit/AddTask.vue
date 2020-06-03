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
          </v-row>

            <v-row>
                <v-col>
                    <v-menu
                      ref="menuDate"
                      v-model="menuStartDate"
                      :close-on-content-click="false"
                      :return-value.sync="menuStartDate"
                      transition="scale-transition"
                      offset-y
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="start_date"
                              label="Pick start date*"
                              readonly
                              v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="start_date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuStartDate = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menuDate.save(start_date)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>

            <v-row>
                <v-col>
                    <v-menu
                      ref="menuEndDate"
                      v-model="menuDeadline"
                      :close-on-content-click="false"
                      :return-value.sync="menuDeadline"
                      transition="scale-transition"
                      offset-y
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="deadline"
                              label="Pick start date*"
                              readonly
                              v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="deadline" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuDeadline = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menuEndDate.save(deadline)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>

            <v-row>
                <v-col>
                    <v-menu
                      ref="menu1"
                      v-model="menuStartHour"
                      :close-on-content-click="false"
                      :return-value.sync="start_hour"
                      transition="scale-transition"
                      offset-y
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="start_hour"
                              label="Pick start hour*"
                              readonly
                              v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menuStartHour"
                          v-model="start_hour"
                          @click:minute="$refs.menu1.save(start_hour)"
                        ></v-time-picker>
                    </v-menu>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>

            <v-row>
                <v-col>
                    <v-menu
                      ref="menu"
                      v-model="menuEndHour"
                      :close-on-content-click="false"
                      :return-value.sync="end_hour"
                      transition="scale-transition"
                      offset-y
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="end_hour"
                              label="Pick end hour*"
                              readonly
                              v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menuEndHour"
                          v-model="end_hour"
                          @click:minute="$refs.menu.save(end_hour)"
                        ></v-time-picker>
                    </v-menu>
                </v-col>
                <v-spacer></v-spacer>
            </v-row>

          <v-row>
            <v-select
              v-model="project_task"
              :items="`${listProjects.id}-${listProjects.name}`"
              label="Project*"
              required
            ></v-select>
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
  import globalGetters from '../../store/global/getters'
  import boardActions from '../../pages/Board/store/actions'
  import globalActions from '../../store/global/actions'
  import { mapGetters } from 'vuex'

  export default {
    name: "add-task",
    data () {
      return {
        dialog: false,

          menuStartDate:false,
          menuDeadline:false,

        menuStartHour: false,
        menuEndHour: false,
      };
    },
    computed: {

      ...mapGetters({
        listProjects: globalGetters.GET_PROJECTS
      }),

      description: {
        get () {
          return this.$store.getters[globalGetters.GET_PROJECTS]
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
      start_date: {
        get () {
          return this.$store.getters[boardGetters.GET_START_DATE]
        },

        set (value) {
          this.$store.commit(boardMutations.SET_START_DATE, value)
        }
      },
      start_hour: {
        get () {
          return this.$store.getters[boardGetters.GET_START_HOUR]
        },

        set (value) {
          this.$store.commit(boardMutations.SET_START_HOUR, value)
        }
      },
      end_hour: {
        get () {
          return this.$store.getters[boardGetters.GET_END_HOUR]
        },

        set (value) {
          this.$store.commit(boardMutations.SET_END_HOUR, value)
        }
      },
      project_task: {
        get () {
          return this.$store.getters[boardGetters.GET_PROJECT_TASK]
        },

        set (value) {
          this.$store.commit(boardMutations.SET_PROJECT_TASK, value)
        }
      },
    },

    mounted () {},

    methods: {
      async register () {
        await this.$store.dispatch(boardActions.CREATE_TASK)
        return this.dialog = false
      },

      async mounted () {
        await this.$store.dispatch(globalActions.FETCH_DETAILS)
      },
    }

  }
</script>

<style scoped>

</style>
