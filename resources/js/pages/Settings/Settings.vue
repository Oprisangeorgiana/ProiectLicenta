<template>
  <div>
    <v-row class="mb-8" justify="center">
      <v-card color="teal">
        <h1>{{this.user.name}}</h1>
      </v-card>
    </v-row>

    <v-row class="mb-8">
      <v-expansion-panels popout>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-layout justify-center>
              <v-avatar
                color="teal"
                size="100px"
              >
                <v-icon large>mdi-account-circle</v-icon>
              </v-avatar>
            </v-layout>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Change your photo"
              prepend-icon="mdi-camera"
            >
            </v-file-input>
            <v-btn color="teal">
              SUBMIT
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>


    <v-row class="mb-6">

        <v-col cols="3">
          <v-label>Phone number</v-label>
        </v-col>
        <v-col cols="7">
          <v-text-field placeholder="password" v-model="phone_number"></v-text-field>
        </v-col>
      <v-col cols="2">
        <v-btn


          color="teal">
          SUBMIT
        </v-btn>

      </v-col>
    </v-row>


    <v-row class="mb-6">
      <v-col cols="3">
        <v-label>New Password</v-label>
      </v-col>
      <v-col cols="7">
        <v-text-field placeholder="password" v-model="newPassword"></v-text-field>
      </v-col>

    </v-row>
    <v-row class="mb-6">
      <v-col cols="3">
        <v-label>Confirm New Password</v-label>
      </v-col>
      <v-col cols="7">
        <v-text-field placeholder="password" v-model="confirmNewPassword" required></v-text-field>
      </v-col>
      <v-col class="2">
        <v-btn


          color="teal">
          SUBMIT
        </v-btn>
      </v-col>
    </v-row>

  </div>
</template>

<script>

  import settingsActions from './store/actions'
  import settingsGetters from './store/getters'
  import settingsMutations from './store/mutations'
  import { mapGetters } from 'vuex'
  import globalGetters from '../../../js/store/global/getters'

  export default {

    name: "Settings",

    data () {
      return {

        newPassword: null,
        confirmNewPassword: null,

      };

    },
    computed: {

      ...mapGetters({
        user: globalGetters.GET_USER,

      }),

        phone_number: {
            get () {
                return this.$store.getters[settingsGetters.GET_PHONE_NUMBER]
            },
            set (value) {
                this.$store.commit(settingsMutations.SET_PHONE_NUMBER, value)
            }
        },

    },

    methods: {},

    async mounted () {
      console.log('settings', this.user)
    },
  }


</script>

<style scoped>

</style>
