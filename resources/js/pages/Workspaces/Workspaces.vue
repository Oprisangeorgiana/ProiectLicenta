<template>
  <v-container>
    <v-layout align-content-start justify-start>

      <v-card width="300" class="mr-8">
        <v-toolbar color="teal">
          <v-toolbar-title>PROJECTS</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="currentProject in projectList"
              :key="currentProject.id"

            >
              <v-list-item-content>
                <v-list-item-title v-html="currentProject.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>

      <v-card width="700">
        <v-toolbar color="teal">
          <v-toolbar-title>DETAILS</v-toolbar-title>
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
  export default {
    name: "Workspaces",

    data () {
      return {
        projectList: [
          {
            title: "Proiect 1",
            id: 1,
          },
          {
            title: "Proiect 2",
            id: 2,
          },
          {
            title: "Proiect 3",
            id: 3,
          }],
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

    methods: {

      projectTasks (currentProject, currentUser) {

      }
    }

  }
</script>

<style scoped>

</style>
