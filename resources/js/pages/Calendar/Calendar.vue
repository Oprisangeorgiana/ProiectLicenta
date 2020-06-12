<template>
  <div>
    <v-sheet
      tile
      height="54"
      color="teal lighten-4"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>

      <add-task>
      </add-task>

      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        v-if="user"
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-color="color[0]"
         ></v-calendar>


      <v-calendar
      v-else
      ref="calendar"
      v-model="value"
      :weekdays="weekday"
      :type="type"
      >
      </v-calendar>
    </v-sheet>
  </div>
</template>

<script>

  import AddTask from '../../../../resources/js/layout/UI-kit/AddTask'
  import { mapGetters } from "vuex";
  import calendarGetters from '../../pages/Calendar/store/getters'
  import calendarActions from '../../pages/Calendar/store/actions'
  import globalGetters from '../../../js/store/global/getters'
  import globalActions from '../../../js/store/global/actions'

  export default {

    components: {
      AddTask,
    },

    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: '',
      events:[],
      color: [ 'teal'],
    }),

    computed: {
      ...mapGetters({
        listTasks:globalGetters.GET_TASKS,
        user: globalGetters.GET_USER,
      }),



    },
    methods: {

      // getEventColor (event) {
      //   return event.color
      // },



       seeTasks () {

        let list = this.listTasks
        let events =[];
        Object.keys(list).forEach( key  =>{
          const item = list[key]
          // console.log('item', item)
          let data = {}
          data.name = item.task
          data.start = `${item.start_date} ${item.start_hour}`
          data.end = `${item.deadline} ${item.end_hour}`
          events.push(data)
          });
          this.events = events

         console.log('user', this.user)


       }
    },
    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_PAGE_TASKS)
      this.seeTasks();

    },
  }
</script>
