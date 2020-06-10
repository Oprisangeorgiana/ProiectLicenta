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
          <v-list-item-group>
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
      </v-card>

      <v-card width="700">
        <v-toolbar color="teal">
          <v-toolbar-title class="align-content-center">TASKS</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list :three-line="true">
          <v-list-item
            v-for="task in taskList"
            :key="task.id"
          >
            <v-list-item-content>
              <v-list-item-title v-html="task.title"></v-list-item-title>
              <v-list-item-subtitle v-html="task.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>

    </v-layout>
  </v-container>
</template>

<script>

  import globalGetters from '../../../js/store/global/getters'
  import { mapGetters } from 'vuex'


  export default {
    name: "Workspaces",

    data () {
      return {

        search: '',

        taskList: [
          {
            title: "asdfghjkl qwertyui 1",
            subtitle: "qwertyuioplkjhgfdsazxcvbnm 1",
            id: 1,
          },
          {
            title: "asdfghjnbvfdsadfgh 2",
            subtitle: "qwertyuiqwertyuioplkjhgfdsazxcvbnmoplkjhgfdsazxcvbnm 1",
            id: 2,
          },
          {
            title: "asfdghjg  qwertyui ftrhutjhgnfgn  3",
            subtitle: "qwe[poiuytrewqlkjhgfdsa,mnbvcxzrtyuiqwertyuioplkjhgfdsazxcvbnmoplkjhgfdsazxcvbnm 1",
            id: 3,
          }]
      };
    },

    computed: {

      ...mapGetters({
        projectsList: globalGetters.GET_PROJECTS
      }),

      filteredProjects() {
        if(!this.search) return this.projectsList;
        return this.projectsList.filter((project) =>{
          return project.name.toLowerCase().match(this.search)
        })
      }
    },

    methods: {

      projectTasks (currentProject, currentUser) {

      },
      clear(){
        return this.search=''
      },
    }

  }
</script>

<style scoped>

</style>
