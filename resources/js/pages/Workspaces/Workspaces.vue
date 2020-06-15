<template>
  <v-container>
    <v-layout align-content-center justify-start>

      <v-card width="400" class="mr-8">
        <v-toolbar color="teal">
          <v-toolbar-title class="align-content-center">PROJECTS</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-text-field
            v-model="search"
            clearable
            @click:clear="clear"
            placeholder="Type keyword...">
          </v-text-field>
        </v-toolbar>
        <v-list>
          <v-list-item-group v-model="selectedProject">
            <v-list-item
              v-for="currentProject in filteredProjects"
              :key="currentProject.id"
            >
              <v-list-item-content>
                <v-list-item-title v-html="currentProject.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-actions>
          <add-project></add-project>
        </v-card-actions>
      </v-card>

      <v-card width="700">
        <v-toolbar color="teal">
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
        </v-list>
      </v-card>

    </v-layout>
  </v-container>
</template>

<script>

  import globalGetters from '../../../js/store/global/getters'
  import globalActions from '../../../js/store/global/actions'
  import workspaceGetters from '../../../js/pages/Workspaces/store/getters'
  import workspaceMutations from '../../../js/pages/Workspaces/store/mutations'
  import workspaceActions from '../../../js/pages/Workspaces/store/actions'
  import AddProject from '../../../js/layout/UI-kit/AddProject'

  import { mapGetters } from 'vuex'

  export default {
    name: "Workspaces",
    components: {
      AddProject,
    },
    data () {
      return {
        search: '',
        projectID: this.$store.getters[workspaceGetters.GET_CURRENT_PROJECT],
      };
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
        if (!this.search) return this.projectsList;
        return this.projectsList.filter((project) => {
          return project.name.toLowerCase().match(this.search)

        })
      }
    },

    methods: {

      clear () {
        return this.search = ''
      },
    },
    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_PAGE_TASKS)
    },

  }
</script>

<style scoped>

</style>
