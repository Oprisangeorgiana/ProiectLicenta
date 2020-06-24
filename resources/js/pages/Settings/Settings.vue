<template>
  <v-card width="100%" height="100%" >
    <v-card-title class="justify-end">
      <v-btn color="primary" >Save</v-btn>
    </v-card-title>
    <v-row align="center" class="">
      <v-col justify="space-around">
        <v-img max-height="400px" max-width="400px" src="https://picsum.photos/510/300?random" aspect-ratio="1"></v-img>
        <v-file-input multiple label="File input"></v-file-input>
      </v-col>
      <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[v => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>

        <v-btn
          color="warning"
          @click="resetValidation"
        >
          Reset Validation
        </v-btn>
      </v-form>
    </v-row>
  </v-card>
</template>

<script>

  import pageActions from './store/actions'
  import pageGetters from './store/getters'
  import pageMutations from './store/mutations'

  export default {
    name: 'Settings',
    computed: {

      firstName: {

        get () {
          return this.$store.getters[pageGetters.GET_FIRST_NAME]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_FIRST_NAME, value)
        }
      },
      lastName: {
        get () {
          return this.$store.getters[pageGetters.GET_LAST_NAME]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_LAST_NAME, value)
        }
      },
      password: {
        get () {
          return this.$store.getters[pageGetters.GET_PASSWORD]
        },

        set (value) {
          this.$store.commit(pageMutations.SET_PASSWORD, value)
        }
      }
    },
    methods: {
      init () {
        this.$store.dispatch(pageActions.FETCH_DATA)
      },
      submitFirstName () {
        this.$store.dispatch(pageActions.UPDATE_FIRST_NAME)
      },
      submitLastName () {
        this.$store.dispatch(pageActions.UPDATE_LAST_NAME)
      },
      submitPassword () {
        this.$store.dispatch(pageActions.UPDATE_PASSWORD)
      }
    },
    mounted () {
      this.init()
    }
  }


</script>

<style scoped>

</style>
