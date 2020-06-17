<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="300"
  >
    <template v-slot:activator="{on}">

        <v-icon v-on="on">mdi-trash-can-outline</v-icon>

    </template>
    <v-card>
      <v-card-text>
        Are you sure you want to delete the subtask?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="teal" text @click="dialog = false">NO</v-btn>
        <v-btn color="teal" text @click="deleteSubtask">YES</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>

  import boardMutations from '../../pages/Board/store/mutations'
  import boardGetters from '../../pages/Board/store/getters'
  import globalGetters from '../../store/global/getters'
  import boardActions from '../../pages/Board/store/actions'
  import globalActions from '../../store/global/actions'
  import { mapGetters } from 'vuex'

  export default {
    name: "delete-subtask",
    data () {
      return {
        dialog: false,

      };
    },

    props: {
      currentSubtask: Object,
    },

    computed: {},

    mounted () {},

    methods: {
      async deleteSubtask () {
        await this.$store.dispatch(boardActions.DELETE_SUBTASK,this.currentSubtask)
        return this.dialog = false
      },

    }

  }
</script>

<style scoped>

</style>
