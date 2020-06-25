<template>
  <v-form
    ref="form"
    v-model="valid"
    class="ma-auto"
    style="max-width: 600px;"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[passwordRules.required, passwordRules.min]"
      :type="showPassword ? 'text' : 'password'"
      name="input-10-1"
      label="Password"
      hint="At least 8 characters"
      counter
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-btn
      color="primary"
      class="mt-10"
      block
      @click="login"
    >
      LogIn
    </v-btn>
  </v-form>

</template>

<script>

  import globalActions from '../../store/global/actions'
  import globalGetters from '../../store/global/getters'
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      valid: true,
      showPassword: false,
      password: '',
      passwordRules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
      },
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }),

    computed: {
      ...mapGetters({
        token: globalGetters.GET_TOKEN,
      }),
    },

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },

      async login () {
        if (!await this.$refs.form.validate())
          return
        await this.$store.dispatch(globalActions.FETCH_TOKEN, {
          username: this.email,
          password: this.password
        })
        await this.$store.dispatch(globalActions.FETCH_USER)
        if (this.$store.getters[globalGetters.GET_TOKEN]) {
          await this.$router.push('/')
        }
      }
    },
    async mounted () {
      if (this.$store.getters[globalGetters.GET_TOKEN]) {
        await this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
