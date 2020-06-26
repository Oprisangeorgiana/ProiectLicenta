<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Task Management
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <router-link :to="{ name: 'home' }" style="text-decoration: none">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to="{ name: 'workspaces' }" style="text-decoration: none">
          <v-list-item link v-if="user">
            <v-list-item-action>
              <v-icon>mdi-earth</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Workspaces</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to="{ name: 'board' }" style="text-decoration: none">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Board</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to="{ name: 'calendar' }" style="text-decoration: none">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Calendar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to="{ name: 'settings' }" style="text-decoration: none">

          <v-list-item link v-if="user">
            <v-list-item-action>
              <v-icon>mdi-account-cog</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to="{ name: 'help' }" style="text-decoration: none">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-help</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Help</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to="{ name: 'admin' }" style="text-decoration: none">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-plus-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Add Employee</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-menu
        v-if="user"
        offset-y>
        <template v-slot:activator="{ on }">
          <v-badge
            v-if="countNotifications !==0"
            color="red"
            left
          >
            <v-icon
              @click="setCountToZero"
              large color="white"
              v-on="on" >mdi-bell</v-icon>
            <template v-slot:badge>
              <span>{{countNotifications}}</span>
            </template>
          </v-badge>
        </template>
        <v-list>
          <v-list-item
            v-for="item in notificationsList"
            :key="item.id"


          >
            <v-list-item-content>
              {{ item.name }} is going to end on {{item.end_date}} at {{item.end_hour}}
            </v-list-item-content>
          </v-list-item>
          <v-spacer></v-spacer>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>

      <v-menu offset-y v-if="user">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
          >
            {{user_name}}
          </v-btn>

        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="actionPressed(item.action)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-else
        v-on="on"
        :to="'/login'"
      >
        Log in
      </v-btn>

    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height pa-10"
        fluid
      >
        <v-row>
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      app
    >
      <v-layout justify-center>
        <span class="white--text">Universitatea Politehnica Bucuresti &copy; 2019-2020</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import globalGetters from '../../store/global/getters'
  import globalActions from '../../store/global/actions'
  import globalMutations from '../../store/global/mutations'

  export default {
    props: {
      source: String
    },
    data: () => ({
      drawer: null,
      items: [
        {
          title: 'Profile',
          action: 'profile'
        },
        {
          title: 'Log out',
          action: 'logout'
        }
      ],

    }),

    computed: {


      ...mapGetters({
        user: globalGetters.GET_USER,
        user_name: globalGetters.GET_USER_NAME,
        projectList: globalGetters.GET_PROJECTS,
        tasksList: globalGetters.GET_TASKS,
        employeesList: globalGetters.GET_EMPLOYEES,
        notificationsList: globalGetters.GET_NOTIFICATIONS,
        countNotifications: globalGetters.GET_COUNT_NOTIFICATIONS,
        userAuth: globalGetters.GET_USER_AUTH,
      }),


    },
    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_USER)
      await this.$store.dispatch(globalActions.FETCH_PAGE_TASKS)
      await this.$store.dispatch(globalActions.FETCH_EMPLOYEES)
      await this.$store.dispatch(globalActions.FETCH_DEPARTMENTS)
      await this.$store.dispatch(globalActions.FETCH_SUBTASKS)
      await this.$store.dispatch(globalActions.FETCH_PROJECTS)
      await this.$store.dispatch(globalActions.FETCH_USER_NAME)
      await this.$store.dispatch(globalActions.FETCH_CURRENT_EMPLOYEE)
      await this.$store.dispatch(globalActions.FETCH_FILTERED_EMPLOYEES)
      await this.$store.dispatch(globalActions.FETCH_NOTIFICATIONS)
      await this.$store.dispatch(globalActions.FETCH_COUNT_NOTIFICATIONS)
      await this.$store.dispatch(globalActions.FETCH_AUTHORISATIONS)

      console.log('notif', this.notificationsList)
      console.log('count', this.countNotifications)


    },

    methods: {

      setCountToZero(){
        this.$store.commit(globalMutations.SET_COUNT_NOTIFICATIONS, 0)
      },
      actionPressed (action) {
        switch (action) {
          case 'profile': {
            this.$router.push('/settings')
            break
          }
          case 'logout': {
            this.$store.dispatch(globalActions.DESTROY_TOKEN)
            break
          }
          default:
            break
        }
      }
    }
  }
</script>

<style>

</style>
