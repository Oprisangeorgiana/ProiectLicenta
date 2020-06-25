<template>
  <v-card v-if="loaded" width="100%" max-width="800" height="100%" class="pa-4 mx-auto">
    <v-card-title collor="secondary">
      <h2>Edit Profile</h2>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
      >

<!--        <v-text-field-->
<!--          v-model="name"-->
<!--          label="Name"-->
<!--          :rules="nameRules"-->
<!--          required-->
<!--        ></v-text-field>-->

        <v-text-field
          v-model="email"
          label="E-mail"
          :rules="emailRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          ref="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :rules="passwordRules"
          data-vv-name="pass"
          @click:append="showPassword = !showPassword"
          label="Password"
          required
        ></v-text-field>

        <v-text-field
          v-model="rePassword"
          :append-icon="showRePassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showRePassword ? 'text' : 'password'"
          :rules="[passwordConfirmationRule]"
          @click:append="showRePassword = !showRePassword"
          label="Retype password"
          required
        ></v-text-field>

        <v-text-field
          v-model="employee.phone_number"
          label="Phone number"
          required
        ></v-text-field>

        <v-btn color="blue" @click="onSaveClick">Save</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

  import { mapGetters } from 'vuex'
  import globalGetters from '../../../js/store/global/getters'
  import globalActions from '../../../js/store/global/actions'
  import EmployeesRepository from '../../repositories/EmployeesRepository'
  import pageActions from './store/actions'
  import pageGetters from './store/getters'
  import pageMutations from './store/mutations'

  export default {

    name: "Settings",

    data: () => ({
      loaded: false,
      valid: true,
      showPassword: false,
      showRePassword: false,
      rePassword: null,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      passwordRules: [
        v => (!v || v.length >= 6) || 'Password must be more than 6 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }),
    computed: {

      ...mapGetters({
        user: globalGetters.GET_USER,
        employee: globalGetters.GET_CURRENT_EMPLOYEE,

      }),

      name: {
        get () {
          return this.$store.getters[pageGetters.GET_NAME]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_NAME, value)
        }
      },
      password: {
        get () {
          return this.$store.getters[pageGetters.GET_PASSWORD]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_PASSWORD, value)
        }
      },
      email: {
        get () {
          return this.$store.getters[pageGetters.GET_EMAIL]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_EMAIL, value)
        }
      },
      passwordConfirmationRule () {
        if (!this.password)
          return true
        return () => (this.password === this.rePassword) || 'Password must match'
      }

    },

    methods: {
      // modifyPhoneNumber: async function () {
      //   let modifyPhoneNumber = {
      //     id: this.employee.id,
      //     phone_number: this.employee.phone_number
      //   }
      //   await new EmployeesRepository().update(modifyPhoneNumber)
      // },

      async init () {
        await this.$store.dispatch(pageActions.FETCH_DATA)
        this.loaded = true
      },
      async validate () {
        await this.$refs.form.validate()
      },

      async onSaveClick () {
        if (await this.$refs.form.validate()) {
          await this.$store.dispatch(pageActions.UPDATE_USER)
          await this.$store.dispatch(pageActions.FETCH_DATA)
          let modifyPhoneNumber = {
            id: this.employee.id,
            phone_number: this.employee.phone_number
          }
          await new EmployeesRepository().update(modifyPhoneNumber)
          await this.$router.push('/')
        }
      }
    },

    async mounted () {
      await this.$store.dispatch(globalActions.FETCH_CURRENT_EMPLOYEE)
      this.init()
    },
  }


</script>

<style scoped>

</style>
