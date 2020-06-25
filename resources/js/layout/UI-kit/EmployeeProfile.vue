<template>
  <v-container class="grey darken-3" >
    <v-container class="black pt-6 pb-6 pr-6 pl-6">
      <div>
      <v-row class="mb-8"
             align="center"
             justify="center"
      >
        <v-card color="grey darken-3">
          <h1 class="ma-8">
            {{`${employee.last_name} ${employee.first_name}`}}
          </h1>
        </v-card>

      </v-row>


      <v-row
        align="center"
        justify="center"
        class="mb-6"
      >
        <v-card
          color="grey darken-3"
          width="700"
          >
          <v-card-title>
            E-mail
          </v-card-title>
          <v-card-text>
           <h1> {{`${employee.last_name}.${employee.first_name}@intern.com`}} </h1>
          </v-card-text>
        </v-card>
      </v-row>

      <v-row
        align="center"
        justify="center"
        class="mb-8"
      >
        <v-card
          color="grey darken-3"
          width="700"
        >
          <v-card-title          >
            Phone number
          </v-card-title>
          <v-card-text>
            <h1>{{employee.phone_number}}</h1>
          </v-card-text>
        </v-card>
      </v-row>

      <v-row
        align="center"
        justify="center"
        class="mb-8"
      >
        <v-card
          color="grey darken-3"
          width="700"
        >
          <v-card-title>
            Department
          </v-card-title>
          <v-card-text
            v-for="department in departments"
            :key="department.id"
            v-if="department.id === employee.department_id"
          >
            <h1>{{department.department_name}}</h1>
          </v-card-text>
        </v-card>
      </v-row>

      <v-row
        align="center"
        justify="center"
        class="mb-8"
      >
        <v-card
          color="grey darken-3"
          width="700"
        >
          <v-card-title>
            Authorisation
          </v-card-title>
          <v-card-text
            v-for="auth in authorisations"
            :key="auth.id"
            v-if="auth.id === employee.authorisation_id"
          >
           <h1>{{auth.role}}</h1>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
    </v-container>

  </v-container>
</template>

<script>
  import globalActions from '../../../js/store/global/actions'
  import globalGetters from '../../../js/store/global/getters'
  import { mapGetters } from 'vuex'

  export default {

    name: "employee-profile",
    props: {},

    data () {
      return {
        selectedUserID: this.$route.params.id
      };

    },
    computed: {
      ...mapGetters({
        employee: globalGetters.GET_EMPLOYEE_PAGE,
        departments: globalGetters.GET_DEPARTMENTS,
        authorisations: globalGetters.GET_AUTHORISATIONS,

      }),

    },

    methods: {},

    async mounted () {

      // modifica fetch page task cu get page employee
      await this.$store.dispatch(globalActions.FETCH_EMPLOYEE_PAGE, this.selectedUserID)
      await this.$store.dispatch(globalActions.FETCH_AUTHORISATIONS)
    },
  }


</script>

<style scoped>

</style>
