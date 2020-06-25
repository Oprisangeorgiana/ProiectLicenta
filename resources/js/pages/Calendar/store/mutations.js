const MUTATION_TYPES = {
  SET_EVENTS: 'calendar/SET_EVENTS',
  SET_START: 'calendar/SET_START',
  SET_END: 'calendar/SET_END',
  SET_NAME: 'calendar/SET_NAME',


}
export default MUTATION_TYPES

export const mutations = {
  [MUTATION_TYPES.SET_EVENTS]: (state, data) => {
    state.events = data
  },

  [MUTATION_TYPES.SET_START]: (state, data) => {
    state.start = data
  },
  [MUTATION_TYPES.SET_END]: (state, data) => {
    state.end = data
  },
  [MUTATION_TYPES.SET_NAME]: (state, data) => {
    state.name = data
  },


}
