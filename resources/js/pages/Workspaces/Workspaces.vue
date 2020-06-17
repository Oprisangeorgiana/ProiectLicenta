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
          <v-list-item-group v-model="selectedProject" >
            <v-list-item
              v-for="(currentProject,index) in filteredProjects"
              :key="currentProject.id"
              :value="currentProject.id"

            >
              <v-list-item-content>
                <v-list-item-title v-html="currentProject.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card-actions
        v-if="userAuthorisation>1"
        >
          <add-project></add-project>
        </v-card-actions>
      </v-card>

      <v-card width="700">
        <v-toolbar color="teal">
          <v-toolbar-title class="align-content-center">TASKS</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list>
          <v-list-item
            v-for="task in tasksList"
            v-if="task.project === selectedProject"
            :key="task.id"
          >
            <v-list-item-content>
              <v-list-item-title v-html="task.task"></v-list-item-title>
              <v-list-item-subtitle v-html="task.state"> </v-list-item-subtitle>
              <v-list-item-subtitle v-html="`Deadline: ${task.deadline} `"></v-list-item-subtitle>
              <v-list-item-subtitle
                v-for="prj in projectsList"
                :key="prj.id"
                v-if="prj.id===task.project"
                v-html="`Project: ${prj.name} `">
              </v-list-item-subtitle>
              <v-btn

                v-for="currentEmployee in employeesList"
                :key="currentEmployee.id"
                v-if="currentEmployee.id === task.employee"
                v-html="`${currentEmployee.last_name} ${currentEmployee.first_name}`"
                @click="goToEmployee(currentEmployee)"
              >
              </v-btn>
            </v-list-item-content>
            <v-list-item-action>
              <add-task
                :currentTask="task">
              </add-task>
              <modify-task
                v-if="userAuthorisation > 1"
                :currentTask="task"
              >
              </modify-task>
              <delete-task
                v-if="userAuthorisation > 1"
                :currentTask="task"
              >
              </delete-task>
            </v-list-item-action>
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
  import AddTask from '../../../js/layout/UI-kit/AddTask'
  import ModifyTask from '../../../js/layout/UI-kit/ModifyTask'
  import DeleteTask from '../../../js/layout/UI-kit/DeleteTask'
  import EmployeeProfile from '../../../js/layout/UI-kit/EmployeeProfile'

  import { mapGetters } from 'vuex'

  export default {
    name: "Workspaces",
    components: {
      AddProject,
      AddTask,
      ModifyTask,
      DeleteTask,
      EmployeeProfile,
    },
    data () {
      return {
        search: '',
        authorisation:null,
      };
    },

    computed: {

      ...mapGetters({
        projectsList: globalGetters.GET_PROJECTS,
        tasksList: globalGetters.GET_TASKS,
        user: globalGetters.GET_USER,
        employeesList: globalGetters.GET_EMPLOYEES,
        userAuthorisation: globalGetters.GET_USER_AUTH,
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
      },

      userAuthorisation(){
        let employees = this.employeesList
        let user = this.user
        let auth = null
        Object.keys(employees).forEach(key =>{
          if(employees[key].id === this.user.employee_id){
            auth = employees[key].authorisation_id
          }
        })
        return auth
      }

    },

    methods: {
      goToEmployee(employee){
        let route= '/workspaces/:id'
        route = route.replace(/:[a-zA-Z]+/, employee.id)
        console.log('route', route)
        this.$router.push(route)
      },

      clear () {
        return this.search = ''
      },
    },
    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_PAGE_TASKS)
      await this.$store.dispatch(globalActions.FETCH_PROJECTS)
      await this.$store.dispatch(globalActions.FETCH_USER_AUTH)
      await this.$store.dispatch(globalActions.FETCH_EMPLOYEES)

    },

  }
</script>

<style scoped>


</style>
