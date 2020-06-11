const GETTER_TYPES = {
  GET_EVENTS: 'calendar/GET_EVENTS',
  GET_START: 'calendar/GET_START',
  GET_END: 'calendar/GET_END',
  GET_NAME: 'calendar/GET_NAME',
}
export default GETTER_TYPES

export const getters = {
  [GETTER_TYPES.GET_EVENTS]: (state, getters) => {
    return state.events
  },

  [GETTER_TYPES.GET_START]: (state, getters) => {
    return state.start
  },
  [GETTER_TYPES.GET_END]: (state, getters) => {
    return state.end
  },
  [GETTER_TYPES.GET_NAME]: (state, getters) => {
    return state.name
  },

}



