const MUTATIONS_TYPES = {
  SET_USER: 'settings/SET_USER',
  SET_EMPLOYEE: 'settings/SET_EMPLOYEE',
  SET_IMG: 'settings/SET_IMG',
  SET_NAME: 'settings/SET_NAME',
  SET_PASSWORD: 'settings/SET_PASSWORD',
  SET_EMAIL: 'settings/SET_EMAIL'
}

export default MUTATIONS_TYPES

export const mutations = {
  [MUTATIONS_TYPES.SET_USER]: (state, data) => {
    state.user = data
  },
  [MUTATIONS_TYPES.SET_EMPLOYEE]: (state, data) => {
    state.employee = data
  },

  [MUTATIONS_TYPES.SET_IMG]: (state, data) => {
    state.img = data
  },
  [MUTATIONS_TYPES.SET_NAME]: (state, data) => {
    state.user.name = data
  },
  [MUTATIONS_TYPES.SET_PASSWORD]: (state, data) => {
    state.password = data
  },
  [MUTATIONS_TYPES.SET_EMAIL]: (state, data) => {
    state.user.intern_email = data
  }
}
