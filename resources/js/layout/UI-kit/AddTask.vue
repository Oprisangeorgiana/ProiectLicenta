<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="700"
  >
    <template v-slot:activator="{on}">

        <v-icon x-large v-on="on">mdi-plus-circle-outline</v-icon>

    </template>
    <v-card>
      <v-card-title class="grey darken-3">
        <span class="headline">New task</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row>
            <v-col cols="12">
              <v-text-field label="Task*" v-model="description"></v-text-field>
            </v-col>
          </v-row>

<!--          <v-row>-->
<!--            <v-col>-->
<!--              <v-select-->
<!--                :items="['task']"-->
<!--                label="Type*"-->
<!--                required-->
<!--                v-model="task_type"-->
<!--              ></v-select>-->
<!--            </v-col>-->
<!--          </v-row>-->

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
                    label="Pick end date*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="deadline" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDeadline = false">Cancel</v-btn>
                  <router-link :to="{ name: 'board' }">
                    <v-btn text color="primary" @click="$refs.menuEndDate.save(deadline)">OK</v-btn>
                  </router-link>
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
                  use-seconds
                  v-if="menuStartHour"
                  v-model="start_hour"
                  @click:second="$refs.menu1.save(start_hour)"
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
                  use-seconds
                  v-if="menuEndHour"
                  v-model="end_hour"
                  @click:second="$refs.menu.save(end_hour)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                v-model="project_task"
                label="Project*"
                required
                :items="listProjects"
                item-text="name"
                return-object
              >
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                required
                :items="correctList()"
                item-text="name"
                label="Employee*"
                v-model="employee_assigned"
                return-object
              >
              </v-select>
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
  import globalGetters from '../../store/global/getters'
  import boardActions from '../../pages/Board/store/actions'
  import globalActions from '../../store/global/actions'
  import { mapGetters } from 'vuex'

  export default {
    name: "add-task",
    data () {
      return {
        dialog: false,

        menuStartDate: false,
        menuDeadline: false,

        menuStartHour: false,
        menuEndHour: false,
      };
    },
    computed: {

      ...mapGetters({
        listProjects: globalGetters.GET_PROJECTS,
        employees: globalGetters.GET_FILTERED_EMPLOYEES,
        departments: globalGetters.GET_DEPARTMENTS,
        auth: globalGetters.GET_USER_AUTH,
        currentEmployee: globalGetters.GET_CURRENT_EMPLOYEE,

      }),

      description: {
        get () {
          return this.$store.getters[boardGetters.GET_DESCRIPTION]
        },

        set (value) {
          this.$store.commit(boardMutations.SET_DESCRIPTION, value)
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
          return this.$store.getters[boardGetters.GET_TASK_PROJECT]
        },

        set (value) {
          this.$store.commit(boardMutations.SET_TASK_PROJECT, value)
        }
      },
      employee_assigned: {
        get () {
          return this.$store.getters[boardGetters.GET_EMPLOYEE_ASSIGNED]
        },

        set (value) {
          this.$store.commit(boardMutations.SET_EMPLOYEE_ASSIGNED, value)
        }
      },

    },

    mounted () {},

    methods: {
      correctList(){
        let list =[]
        let employee = this.employees
        Object.keys(employee).forEach(key =>{
          let item
          item = {
            id: employee[key].id,
            name: `${employee[key].last_name} ${employee[key].first_name}`
          }
          list.push(item)
        })
        return list
      },

      async register () {
        await this.$store.dispatch(boardActions.CREATE_TASK)
        return this.dialog = false
      },
    },
    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_EMPLOYEES)
      await this.$store.dispatch(globalActions.FETCH_FILTERED_EMPLOYEES)
    },

  }
</script>

<style scoped>

</style>
