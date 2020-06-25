<template>
  <v-container>
    <v-row>
      <v-col class="col-sm-6 col-lg-4">
        <v-card>
          <v-toolbar color="secondary">
            <v-toolbar-title class="align-content-center">PROJECTS</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon class="px-3">mdi-magnify</v-icon>
            <v-text-field
              v-model="search"
              clearable
              @click:clear="clear"
              placeholder="Type keyword..."
              class="pt-3">
            </v-text-field>
          </v-toolbar>
          <v-list :three-line="true">
            <v-list-item-group v-model="selectedProject">
              <v-list-item
                v-for="currentProject in filteredProjects"
                :key="currentProject.id"
              >
                <v-list-item-content>
                  <v-list-item-title v-html="currentProject.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                v-if="!selectedProject"
                disabled
              >
                <v-list-item-content>
                  <v-list-item-title>
                    There are no projects
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col class="col-sm-6 col-lg-8">
        <v-card>
          <v-toolbar color="secondary">
            <v-toolbar-title class="align-content-center">TASKS</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-list :three-line="true">
            <v-list-item
              v-for="task in tasksList"
              v-if="task.project ===selectedProject + 1"
              :key="task.id"
            >
              <v-list-item-content>
                <v-list-item-title v-html="task.task"></v-list-item-title>
                <v-list-item-subtitle v-html="task.deadline"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="task.project"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-if="!(Array.isArray(tasksList) && tasksList.length)"
              disabled>
              <v-list-item-content>
                <v-list-item-title>
                  There are no tasks
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import globalGetters from '../../../js/store/global/getters'
  import globalActions from '../../../js/store/global/actions'
  import workspaceGetters from '../../../js/pages/Workspaces/store/getters'
  import workspaceMutations from '../../../js/pages/Workspaces/store/mutations'
  import workspaceActions from '../../../js/pages/Workspaces/store/actions'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Workspaces',

    data () {
      return {
        search: '',
        projectID: this.$store.getters[workspaceGetters.GET_CURRENT_PROJECT]
      }
    },

    computed: {

      ...mapGetters({
        projectsList: globalGetters.GET_PROJECTS,
        tasksList: globalGetters.GET_TASKS,
        user: globalGetters.GET_USER
      }),

      selectedProject: {
        get () {
          return this.$store.getters[workspaceGetters.GET_CURRENT_PROJECT]
        },
        set (value) {
          this.$store.commit(workspaceMutations.SET_CURRENT_PROJECT, value)
        }
      },

      filteredProjects () {
        if (!this.search) return this.projectsList
        return this.projectsList.filter((project) => {
          return project.name.toLowerCase().match(this.search)

        })
      }
    },

    methods: {

      clear () {
        return this.search = ''
      }
    },
    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_PAGE_TASKS)
    }

  }
</script>

<style scoped>

</style>
