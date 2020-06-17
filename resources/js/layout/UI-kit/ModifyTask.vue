<template>
  <v-dialog
    v-model="dialog"
    persistent
    keydown="KeyboardEvent"
    max-width="700"
  >
    <template v-slot:activator="{on}">
      <v-icon v-on="on"> mdi-pen</v-icon>
    </template>
    <v-card>
      <v-card-title class="teal">
        <span class="headline">Modify task</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="currentTask.task"
                clearable
              >
              </v-text-field>
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
                    v-model="currentTask.start_date"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="startDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuStartDate = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menuDate.save(startDate)">OK</v-btn>
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
                    v-model="currentTask.deadline"
                    label="Pick end date*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="currentTask.deadline" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDeadline = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menuEndDate.save(currentTask.deadline)">OK</v-btn>
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
                :return-value.sync="currentTask.start_hour"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="currentTask.start_hour"
                    label="Pick start hour*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  use-seconds
                  v-if="menuStartHour"
                  v-model="currentTask.start_hour"
                  @click:minute="$refs.menu1.save(currentTask.start_hour)"
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
                :return-value.sync="currentTask.end_hour"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="currentTask.end_hour"
                    label="Pick end hour*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  use-seconds
                  v-if="menuEndHour"
                  v-model="currentTask.end_hour"
                  @click:minute="$refs.menu.save(currentTask.end_hour)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-col>

              <v-select
                required
                :items="listProjects"
                item-text="name"
                return-object
                v-model="currentTask.project"
              >
              </v-select>

            </v-col>
          </v-row>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" text @click="dialog = false">Close</v-btn>
        <v-btn color="teal" text @click="modifyTask">Save</v-btn>
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
    name: "modify-task",
    data () {
      return {
        dialog: false,
        menuStartDate: false,
        menuDeadline: false,
        menuStartHour: false,
        menuEndHour: false,
        startDate: null,
      };
    },
    props: {
      currentTask: Object,
    },
    computed: {
      ...mapGetters({
        listProjects: globalGetters.GET_PROJECTS,
        user: globalGetters.GET_USER,
      }),

    },
    mounted () {},
    methods: {
      modifyTask () {
        let updated = {
          id: this.currentTask.id,
          task: this.currentTask.task,
          task_type: 'task',
          employee: this.user.employee_id,
          deadline: this.currentTask.deadline,
          start_date: this.currentTask.start_date,
          start_hour: this.currentTask.start_hour,
          end_hour: this.currentTask.end_hour,
          project: this.currentTask.project.id,
        }

        this.$store.dispatch(boardActions.UPDATE_TASK, updated)

        return this.dialog = false
      },
    },
    async mounted () {
    }
  }
</script>

<style scoped>
</style>