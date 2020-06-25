const GETTER_TYPES = {
  GET_PROJECTS: 'global/GET_PROJECTS',
  GET_TOKEN: 'global/GET_TOKEN',
  GET_USER: 'global/GET_USER',
  GET_TASKS: 'global/GET_TASKS'

}
export default GETTER_TYPES

export const getters = {
  [GETTER_TYPES.GET_PROJECTS]: (state, getters) => {
    return state.projects
  },

  [GETTER_TYPES.GET_TOKEN]: (state, getters) => {
    return state.token
  },

  [GETTER_TYPES.GET_USER]: (state, getters) => {
    return state.user
  },
  [GETTER_TYPES.GET_TASKS]: (state, getters) => {
    return state.tasks
  }
}



