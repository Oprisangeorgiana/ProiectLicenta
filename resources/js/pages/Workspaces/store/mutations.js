const MUTATION_TYPES = {

  SET_CURRENT_PROJECT: 'products/SET_CURRENT_PROJECT',
  SET_TASKS_FILTERED: 'products/SET_TASKS_FILTERED',

}
export default MUTATION_TYPES

export const mutations = {

  [MUTATION_TYPES.SET_CURRENT_PROJECT]: (state, data) => {

    state.current_project = data
  },
  [MUTATION_TYPES.SET_TASKS_FILTERED]: (state, data) => {

    state.tasks_filtered = data
  },
}




