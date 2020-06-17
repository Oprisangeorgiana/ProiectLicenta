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
        <span class="headline">Modify subtask</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="currentSubtask.description"
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
                    v-model="currentSubtask.start_subtask_date"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="currentSubtask.start_subtask_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuStartDate = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menuDate.save(currentSubtask.start_subtask_date)">OK</v-btn>
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
                    v-model="currentSubtask.end_subtask_date"
                    label="Pick end date*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="currentSubtask.end_subtask_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDeadline = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menuEndDate.save(currentSubtask.end_subtask_date)">OK</v-btn>
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
                :return-value.sync="currentSubtask.start_subtask_hour"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="currentSubtask.start_subtask_hour"
                    label="Pick start hour*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  use-seconds
                  v-if="menuStartHour"
                  v-model="currentSubtask.start_subtask_hour"
                  @click:minute="$refs.menu1.save(currentSubtask.start_subtask_hour)"
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
                :return-value.sync="currentSubtask.end_subtask_hour"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="currentSubtask.end_subtask_hour"
                    label="Pick end hour*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  use-seconds
                  v-if="menuEndHour"
                  v-model="currentSubtask.end_subtask_hour"
                  @click:minute="$refs.menu.save(currentSubtask.end_subtask_hour)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
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
    name: "modify-subtask",
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
      currentSubtask: Object,
    },
    computed: {

      ...mapGetters({
        listProjects: globalGetters.GET_PROJECTS,
        user: globalGetters.GET_USER,
        employees: globalGetters.GET_EMPLOYEES
      }),

    },

    mounted () {},

    methods: {

      modifyTask () {

        let updatedTask = {
          id: this.currentSubtask.id,
          description: this.currentSubtask.description,
          end_subtask_date: this.currentSubtask.end_subtask_date,
          start_subtask_date: this.currentSubtask.start_subtask_date,
          start_subtask_hour: this.currentSubtask.start_subtask_hour,
          end_subtask_hour: this.currentSubtask.end_subtask_hour,

        }
        this.$store.dispatch(boardActions.UPDATE_SUBTASK, updatedTask)

        return this.dialog = false

      },

    },
    async mounted () {

    }
  }
</script>

<style scoped>

</style>
