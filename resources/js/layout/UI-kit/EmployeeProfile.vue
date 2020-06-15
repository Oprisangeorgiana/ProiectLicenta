<template>
  <div>
    <v-row class="mb-8">
      <v-card color="teal">
        <!--        <h1>Numele</h1>-->
      </v-card>
    </v-row>

    <v-row class="mb-8">
      // imaginea, daca nu are pun un avatar
    </v-row>


    <v-row class="mb-6">

      <v-card>
        <v-card-title>
          E-mail
        </v-card-title>
        <v-card-text>
          <!--                    {{this.user.intern_email}}-->
        </v-card-text>
      </v-card>
    </v-row>

    <v-row>
      <v-card>
        <v-card-title>
          Phone number
        </v-card-title>
        <v-card-text>
          <!--                    {{this.user.phone_number}}-->
        </v-card-text>
      </v-card>
    </v-row>

    <v-row>
      <v-card>
        <v-card-title>
          Department
        </v-card-title>
        <v-card-text>
          <!--                  departamentul-->
        </v-card-text>
      </v-card>
    </v-row>

    <v-row>
      <v-card>
        <v-card-title>
          Authorisation
        </v-card-title>
        <v-card-text>
          <!--                  autorizarea-->
        </v-card-text>
      </v-card>
    </v-row>


  </div>
</template>

<script>

  export default {

    name: "employee-profile",
    props: {
      selectedUser: Object,
    },

    data () {
      return {};

    },
    computed: {},

    methods: {},

    async mounted () {},
  }


</script>

<style scoped>

</style>
