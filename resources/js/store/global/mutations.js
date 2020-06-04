const MUTATION_TYPES = {
  SET_PROJECTS: 'global/SET_PROJECTS',
  SET_TOKEN: 'global/SET_TOKEN',
  SET_USER: 'global/SET_USER'
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
  }

}
