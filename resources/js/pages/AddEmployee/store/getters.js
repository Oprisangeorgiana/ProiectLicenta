const GETTER_TYPES = {
  GET_EMAIL: 'addEmployee/GET_EMAIL',
  GET_PASSWORD: 'addEmployee/GET_PASSWORD',
  GET_CNP: 'addEmployee/GET_CNP',
  GET_FIRST_NAME: 'addEmployee/GET_FIRST_NAME',
  GET_LAST_NAME: 'addEmployee/GET_LAST_NAME',
  GET_BIRTHDAY: 'addEmployee/GET_BIRTHDAY',
  GET_SEX: 'addEmployee/GET_SEX',
  GET_PHONE_NUMBER: 'addEmployee/GET_PHONE_NUMBER',
  GET_HIRE_DATE: 'addEmployee/GET_HIRE_DATE',
  GET_PERSONAL_EMAIL: 'addEmployee/GET_PERSONAL_EMAIL',
  GET_AUTHORISATION: 'addEmployee/GET_AUTHORISATION',
  GET_DEPARTMENT: 'addEmployee/GET_DEPARTMENT',
}
export default GETTER_TYPES

export const getters = {
  [GETTER_TYPES.GET_EMAIL]: (state, getters) => {
    return state.email
  },

  [GETTER_TYPES.GET_PASSWORD]: (state, getters) => {
    return state.password
  },
  [GETTER_TYPES.GET_CNP]: (state, getters) => {
    return state.CNP
  },

  [GETTER_TYPES.GET_FIRST_NAME]: (state, getters) => {
    return state.first_name
  },

  [GETTER_TYPES.GET_LAST_NAME]: (state, getters) => {
    return state.last_name
  },

  [GETTER_TYPES.GET_BIRTHDAY]: (state, getters) => {
    return state.birthday
  },

  [GETTER_TYPES.GET_SEX]: (state, getters) => {
    return state.sex
  },
  [GETTER_TYPES.GET_PHONE_NUMBER]: (state, getters) => {
    return state.phone_number
  },
  [GETTER_TYPES.GET_HIRE_DATE]: (state, getters) => {
    return state.hire_date
  },
  [GETTER_TYPES.GET_PERSONAL_EMAIL]: (state, getters) => {
    return state.personal_email
  },
  [GETTER_TYPES.GET_AUTHORISATION]: (state, getters) => {
    return state.authorisation
  },
  [GETTER_TYPES.GET_DEPARTMENT]: (state, getters) => {
    return state.department
  },

}

