<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="teal"
    >
      <v-list dense>
        <!--               ceva poza? -->
        <v-list-item link>
          <v-list-item-action>
            <router-link :to="{ name: 'home' }">
              <v-icon large color="white">mdi-home</v-icon>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="user">
          <v-list-item-action>
            <router-link :to="{ name: 'settings' }">
              <v-icon large color="white">mdi-account-cog</v-icon>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="user">
          <v-list-item-action>
            <router-link :to="{ name: 'workspaces' }">
              <v-icon large color="white">mdi-earth</v-icon>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Workspaces</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <router-link :to="{ name: 'help' }">
              <v-icon large color="white">mdi-help</v-icon>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--                <v-list-item link>-->
        <!--                    <v-list-item-action>-->
        <!--                        <v-icon large color="white">mdi-home</v-icon>-->
        <!--                    </v-list-item-action>-->
        <!--                    <v-list-item-content>-->
        <!--                        <v-list-item-title>Google</v-list-item-title>-->
        <!--                    </v-list-item-content>-->
        <!--                </v-list-item>-->

        <!--                Poate pun un dark mode -->

      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      app
      color="teal"
    >
      <v-row
        align="center"
      >
        <v-col cols="4">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
          <!--                    <v-toolbar-title color="white">Application</v-toolbar-title>-->
        </v-col>
        <v-col cols="5">
          <v-btn-toggle
            background-color="teal lighten"
          >
            <v-btn>
              <router-link :to="{ name: 'calendar' }">
                Calendar
              </router-link>
            </v-btn>

            <v-btn>
              <router-link :to="{ name: 'board' }">
                Board
              </router-link>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-col
          cols="1"
          v-if="user"
        >
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-badge
                v-if="countNotifications !==0"
                color="red"
                left
              >
                <v-icon large color="white" v-on="on">mdi-bell</v-icon>
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

        </v-col>
        <v-col cols="2">
          <v-menu offset-y v-if="user">
            <template v-slot:activator="{ on }">

              <v-btn
                color="primary"
                dark
                v-on="on"
              >
                {{user.name}}
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
            color="primary"
            dark
            v-on="on"
            :to="'/login'"
          >
            Log in
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height pa-10"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer
      color="teal"
      app
    >
      <v-layout justify-center>
        <span class="white--text">&copy; 2019-2020</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import globalGetters from '../../store/global/getters'
  import globalActions from '../../store/global/actions'

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

      countNotifications () {
        let count = 0
        let tomorrow = new Date()
        tomorrow.setDate(new Date().getDate() + 1)
        const toTwoDigits = num => num < 10 ? '0' + num : num
        let year = tomorrow.getFullYear()
        let month = toTwoDigits(tomorrow.getMonth() + 1)
        let day = toTwoDigits(tomorrow.getDate())
        // console.log('tomorrow', `${year}-${month}-${day}`)
        let notificationsList = []
        let list = this.tasksList
        Object.keys(this.tasksList).forEach(key => {
          let data = {}
          const item = this.tasksList[key]
          if (list[key].deadline === `${year}-${month}-${day}`) {
            count = count + 1

            data.id = list[key].id
            data.task_type = list[key].task_type
            data.name = list[key].task
            data.start = `${list[key].start_date} ${list[key].start_hour}`
            data.end_date = list[key].deadline
            data.end_hour = list[key].end_hour
            notificationsList.push(data)
          }
        })
        this.notificationsList = notificationsList
        // console.log('item.deadline', notificationsList)

        return count
      },

      ...mapGetters({
        user: globalGetters.GET_USER,
        projectList: globalGetters.GET_PROJECTS,
        tasksList: globalGetters.GET_TASKS
      })

    },
    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_DETAILS)
      await this.$store.dispatch(globalActions.FETCH_USER)
      await this.$store.dispatch(globalActions.FETCH_PAGE_TASKS)
    },

    methods: {
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
