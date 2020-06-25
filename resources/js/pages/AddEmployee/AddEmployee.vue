<template>
  <v-card  width="100%" max-width="800" height="100%" class="pa-4 mx-auto">
    <v-card-title collor="secondary">
      <h2>Add New Employee</h2>
    </v-card-title>
    <v-spacer></v-spacer>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
      >
        <!-- pentru partea de user-->
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

        <!--        pentru partea de employee-->

        <v-text-field
          v-model="CNP"
          label="CNP"
          required
        ></v-text-field>

        <v-text-field
          v-model="first_name"
          label="First Name"
          :rules="nameRules"
          required
        ></v-text-field>

        <v-text-field
          v-model="last_name"
          label="Last Name"
          :rules="nameRules"
          required
        ></v-text-field>

        <v-row>
          <v-col>
            <v-menu
              ref="menuB"
              v-model="menuBirthday"
              :close-on-content-click="false"
              :return-value.sync="menuBirthday"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="birthday"
                  label="Pick birthday*"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="birthday" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuBirthday = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menuB.save(birthday)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              :items="['M','F']"
              label="Sex"
              required
              v-model="sex"
            ></v-select>
          </v-col>
        </v-row>

        <v-text-field
          v-model="phone_number"
          label="Phone number"
          required
        ></v-text-field>

        <v-row>
          <v-col>
            <v-menu
              ref="menuH"
              v-model="menuHireDate"
              :close-on-content-click="false"
              :return-value.sync="menuHireDate"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="hire_date"
                  label="Pick hire date*"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="hire_date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menuHireDate = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menuH.save(hire_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

        <v-text-field
          v-model="personal_email"
          label="Personal e-mail"
          :rules="emailRules"
          required
        ></v-text-field>

        <v-select
          v-model="authorisation"
          label="Authorisations"
          required
          :items="authorisationsList"
          item-text="role"
          return-object
        >
        </v-select>

        <v-select
          v-model="department"
          label="Department"
          required
          :items="departmentsList"
          item-text="department_name"
          return-object
        >
        </v-select>

        <v-btn color="blue" @click="register">Create</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>

  import { mapGetters } from 'vuex'
  import globalGetters from '../../../js/store/global/getters'
  import globalActions from '../../../js/store/global/actions'
  import pageActions from './store/actions'
  import pageGetters from './store/getters'
  import pageMutations from './store/mutations'

  export default {

    name: "AddEmployee",

    data: () => ({
      menuBirthday: false,
      menuHireDate: false,
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
        departmentsList: globalGetters.GET_DEPARTMENTS,
        authorisationsList: globalGetters.GET_AUTHORISATIONS,
      }),

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
      },

      CNP: {
        get () {
          return this.$store.getters[pageGetters.GET_CNP]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_CNP, value)
        }
      },
      first_name: {
        get () {
          return this.$store.getters[pageGetters.GET_FIRST_NAME]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_FIRST_NAME, value)
        }
      },
      last_name: {
        get () {
          return this.$store.getters[pageGetters.GET_LAST_NAME]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_LAST_NAME, value)
        }
      },
      birthday: {
        get () {
          return this.$store.getters[pageGetters.GET_BIRTHDAY]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_BIRTHDAY, value)
        }
      },
      sex: {
        get () {
          return this.$store.getters[pageGetters.GET_SEX]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_SEX, value)
        }
      },
      phone_number: {
        get () {
          return this.$store.getters[pageGetters.GET_PHONE_NUMBER]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_PHONE_NUMBER, value)
        }
      },
      hire_date: {
        get () {
          return this.$store.getters[pageGetters.GET_HIRE_DATE]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_HIRE_DATE, value)
        }
      },
      personal_email: {
        get () {
          return this.$store.getters[pageGetters.GET_PERSONAL_EMAIL]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_PERSONAL_EMAIL, value)
        }
      },
      authorisation: {
        get () {
          return this.$store.getters[pageGetters.GET_AUTHORISATION]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_AUTHORISATION, value)
        }
      },
      department: {
        get () {
          return this.$store.getters[pageGetters.GET_DEPARTMENT]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_DEPARTMENT, value)
        }
      },

    },

    methods: {

      async init () {
        await this.$store.dispatch(pageActions.FETCH_DATA)
        console.log('authorisationsList',this.authorisationsList)

      },
      async validate () {
        await this.$refs.form.validate()
      },

      async register () {
        if (await this.$refs.form.validate()) {
          await this.$store.dispatch(pageActions.CREATE_USER)
          await this.$router.push('/')
        }
      }
    },

    async mounted () {
      this.init()
    },
  }


</script>

<style scoped>

</style>
