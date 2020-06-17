<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="700"
  >
    <template v-slot:activator="{on}">
      <v-btn fab dark x-small color="grey">
        <v-icon dark v-on="on">mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="teal">
        <span class="headline">New project</span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row>
            <v-col cols="12">
              <v-text-field label="Project name*" v-model="project_name"></v-text-field>
            </v-col>
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
                    v-model="project_deadline"
                    label="Pick deadline*"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="project_deadline" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menuDeadline = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menuEndDate.save(project_deadline)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>


          <v-row>
            <v-col>
              <v-select
                v-model="project_department"
                label="Department*"
                required
                :items="departmentsList"
                item-text="department_name"
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
        <v-btn color="teal" text @click="create_project">Save</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>


  import globalGetters from '../../store/global/getters'
  import globalMutations from '../../store/global/mutations'
  import globalActions from '../../store/global/actions'
  import { mapGetters } from 'vuex'

  export default {
    name: "add-project",
    data () {
      return {
        dialog: false,
        menuDeadline: false,

      };
    },
    computed: {

      ...mapGetters({
        departmentsList: globalGetters.GET_DEPARTMENTS

      }),

      project_name: {
        get () {
          return this.$store.getters[globalGetters.GET_PROJECT_NAME]
        },

        set (value) {
          this.$store.commit(globalMutations.SET_PROJECT_NAME, value)
        }
      },

      project_deadline: {
        get () {
          return this.$store.getters[globalGetters.GET_PROJECT_DEADLINE]
        },

        set (value) {
          this.$store.commit(globalMutations.SET_PROJECT_DEADLINE, value)
        }
      },
      project_department: {
        get () {
          return this.$store.getters[globalGetters.GET_PROJECT_DEPARTMENT]
        },

        set (value) {
          this.$store.commit(globalMutations.SET_PROJECT_DEPARTMENT, value)
        }
      },

    },

    mounted () {},

    methods: {
      async create_project () {
        await this.$store.dispatch(globalActions.CREATE_PROJECT)
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
