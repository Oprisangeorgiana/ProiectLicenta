const MUTATION_TYPES = {
  SET_PROJECTS: 'global/SET_PROJECTS',
  SET_TOKEN: 'global/SET_TOKEN',
  SET_USER: 'global/SET_USER',
  SET_TASKS: 'global/SET_TASKS'
}
export default MUTATION_TYPES

export const mutations = {
  [MUTATION_TYPES.SET_PROJECTS]: (state, data) => {
    state.projects = data
  },

  [MUTATION_TYPES.SET_TOKEN]: (state, data) => {
    state.token = data
  },

  [MUTATION_TYPES.SET_USER]: (state, data) => {
    state.user = data
  },
[MUTATION_TYPES.SET_TASKS]: (state, data) => {
    state.tasks = data
  }

}
