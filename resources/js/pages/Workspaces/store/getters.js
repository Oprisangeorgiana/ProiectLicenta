
const GETTER_TYPES = {

  GET_CURRENT_PROJECT: 'workspaces/GET_CURRENT_PROJECT',
  GET_TASKS_FILTERED: 'workspaces/GET_TASKS_FILTERED',


}
export default GETTER_TYPES

export const getters = {

  [GETTER_TYPES.GET_CURRENT_PROJECT]: state => {
    return state.current_project
  },
  [GETTER_TYPES.SET_CURRENT_PROJECT]: state => {
    return state.tasks_filtered
  },

}
