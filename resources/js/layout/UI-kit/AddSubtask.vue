<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="700"
  >
    <template v-slot:activator="{on}">
<!--      <v-btn fab dark x-small color="grey">-->
        <v-icon v-on="on">mdi-plus-thick</v-icon>
<!--      </v-btn>-->
    </template>
    <v-card>
      <v-card-title class="teal">
        <span class="headline">New subtask</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row>
            <v-col cols="12">
              <v-text-field label="Subask*" v-model="description"></v-text-field>
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
                    v-model="start_subtask_date"
                    v-on="on"
                    label="Pick start date*"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="start_subtask_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuStartDate = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menuDate.save(start_subtask_date)">OK</v-btn>
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
                    v-model="end_subtask_date"
                    label="Pick end date*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="end_subtask_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDeadline = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menuEndDate.save(end_subtask_date)">OK</v-btn>
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
                :return-value.sync="start_subtask_hour"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="start_subtask_hour"
                    label="Pick start hour*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  use-seconds
                  v-if="menuStartHour"
                  v-model="start_subtask_hour"
                  @click:second="$refs.menu1.save(start_subtask_hour)"
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
                :return-value.sync="end_subtask_hour"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="end_subtask_hour"
                    label="Pick end hour*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  use-seconds
                  v-if="menuEndHour"
                  v-model="end_subtask_hour"
                  @click:second="$refs.menu.save(end_subtask_hour)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

        </v-container>
        <small>*indicates required field</small>
        <v-spacer></v-spacer>
        <small>**Subtask deadline must be smaller or equal with task date</small>
        <v-spacer></v-spacer>
        <small>***Subtask end hour must be smaller or equal with task end hour</small>
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
    name: "add-subtask",
    data () {
      return {
        dialog: false,

        menuStartDate: false,
        menuDeadline: false,

        menuStartHour: false,
        menuEndHour: false,

        description:null,
        start_subtask_date:null,
        end_subtask_date:null,
        start_subtask_hour:null,
        end_subtask_hour:null,


      };
    },
    props: {
      currentTask: Object,
    },
    computed: {

      ...mapGetters({
        listProjects: globalGetters.GET_PROJECTS,
        user: globalGetters.GET_USER
      }),

    },

    mounted () {},

    methods: {
      async register () {
        let newSubtask = {

          description: this.description,
          start_subtask_date: this.start_subtask_date,
          end_subtask_date: this.end_subtask_date,
          start_subtask_hour: this.start_subtask_hour,
          end_subtask_hour: this.end_subtask_hour,
          task_id: this.currentTask.id,
          subtask_state: 'TO DO'
        }
        await this.$store.dispatch(boardActions.CREATE_SUBTASK,newSubtask)
        return this.dialog = false

      },

      async mounted () {
      },
    }

  }
</script>

<style scoped>
small{
  color: red;
}
</style>
