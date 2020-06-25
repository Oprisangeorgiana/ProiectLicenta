<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Fake Clickup
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

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
      count: 0,
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

      notificationsList: []
    }),

    computed: {
      // getDate () {
      //   const toTwoDigits = num => num < 10 ? '0' + num : num;
      //   let today = new Date();
      //   let year = today.getFullYear();
      //   let month = toTwoDigits(today.getMonth() + 1);
      //   let day = toTwoDigits(today.getDate());
      //   return `${year}-${month}-${day}`;
      // },

      // countNotifications () {
      //   let count = 0
      //   let tomorrow = new Date()
      //   tomorrow.setDate(new Date().getDate() + 1)
      //   const toTwoDigits = num => num < 10 ? '0' + num : num
      //   let year = tomorrow.getFullYear()
      //   let month = toTwoDigits(tomorrow.getMonth() + 1)
      //   let day = toTwoDigits(tomorrow.getDate())
      //   // console.log('tomorrow', `${year}-${month}-${day}`)
      //   let notificationsList = []
      //   let list = this.tasksList
      //   Object.keys(this.tasksList).forEach(key => {
      //     let data = {}
      //     const item = this.tasksList[key]
      //     if (list[key].deadline === `${year}-${month}-${day}`) {
      //       count = count + 1
      //
      //       data.id = list[key].id
      //       data.task_type = list[key].task_type
      //       data.name = list[key].task
      //       data.start = `${list[key].start_date} ${list[key].start_hour}`
      //       data.end_date = list[key].deadline
      //       data.end_hour = list[key].end_hour
      //       notificationsList.push(data)
      //     }
      //   })
      //   this.notificationsList = notificationsList
      //   // console.log('item.deadline', notificationsList)
      //
      //   return count
      // },

      ...mapGetters({
        user: globalGetters.GET_USER,
        user_name: globalGetters.GET_USER_NAME,
        projectList: globalGetters.GET_PROJECTS,
        tasksList: globalGetters.GET_TASKS
      })
        tasksList: globalGetters.GET_TASKS,
        employeesList: globalGetters.GET_EMPLOYEES,
        notificationsList: globalGetters.GET_NOTIFICATIONS,
        countNotifications: globalGetters.GET_COUNT_NOTIFICATIONS,
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
