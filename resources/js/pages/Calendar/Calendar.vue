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
<!--      <v-btn-->
<!--      @click="seeTasks"-->
<!--      >See Tasks</v-btn>-->
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
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        v-for="item in listTasks"
        :key="item.id"
        :event-name="item.task"
        :start="`${item.start_date} ${item.start_hour}`"
        :end="`${item.deadline} ${item.end_hour}`"
         ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>

  import AddTask from '../../../../resources/js/layout/UI-kit/AddTask'
  import { mapGetters } from "vuex";
  import calendarGetters from '../../pages/Calendar/store/getters'
  import calendarActions from '../../pages/Calendar/store/actions'
  import globalGetters from '../../store/global/getters'
  import globalActions from '../../store/global/actions'

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
    }),

    computed: {
      ...mapGetters({
        listTasks: globalGetters.GET_TASKS,
      }),

      // tasks () {
      //   this.events.push({
      //     name: this.listTasks.type,
      //     start: `${this.listTasks.start_date} ${this.listTasks.start_hour}`,
      //     end: `${this.listTasks.deadline} ${this.listTasks.end_hour}`,
      //   });
      //
      // }

    },
    methods: {
      seeTasks: function () {

        let list = globalGetters.GET_TASKS
        let events =[];
        list.forEach( item =>{
          console.log('item', item)

          });


        // for (item in this.listTasks)
        // this.events.push({
        //   name: item.task,
        //   start: `${item.start_date} ${item.start_hour}`,
        //   end: `${item.deadline} ${item.end_hour}`,
        // });
      }

    },
    async mounted () {
      this.seeTasks(),
      await this.$store.dispatch(calendarActions.FETCH_PAGE_TASKS)
    },
  }
</script>
