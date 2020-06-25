const MUTATION_TYPES = {
  SET_EMAIL: 'addEmployee/SET_EMAIL',
  SET_PASSWORD: 'addEmployee/SET_PASSWORD',
  SET_CNP: 'addEmployee/SET_CNP',
  SET_FIRST_NAME: 'addEmployee/SET_FIRST_NAME',
  SET_LAST_NAME: 'addEmployee/SET_LAST_NAME',
  SET_BIRTHDAY: 'addEmployee/SET_BIRTHDAY',
  SET_SEX: 'addEmployee/SET_SEX',
  SET_PHONE_NUMBER: 'addEmployee/SET_PHONE_NUMBER',
  SET_HIRE_DATE: 'addEmployee/SET_HIRE_DATE',
  SET_PERSONAL_EMAIL: 'addEmployee/SET_PERSONAL_EMAIL',
  SET_AUTHORISATION: 'addEmployee/SET_AUTHORISATION',
  SET_DEPARTMENT: 'addEmployee/SET_DEPARTMENT'

}
export default MUTATION_TYPES

export const mutations = {
  [MUTATION_TYPES.SET_EMAIL]: (state, data) => {
    state.email = data
  },

  [MUTATION_TYPES.SET_PASSWORD]: (state, data) => {
    state.password = data
  },
  [MUTATION_TYPES.SET_CNP]: (state, data) => {
    state.CNP = data
  },
  [MUTATION_TYPES.SET_FIRST_NAME]: (state, data) => {
    state.first_name = data
  },
  [MUTATION_TYPES.SET_LAST_NAME]: (state, data) => {
    state.last_name = data
  },
  [MUTATION_TYPES.SET_BIRTHDAY]: (state, data) => {
    state.birthday = data
  },
  [MUTATION_TYPES.SET_SEX]: (state, data) => {
    state.sex = data
  },
  [MUTATION_TYPES.SET_PHONE_NUMBER]: (state, data) => {
    state.phone_number = data
  },
  [MUTATION_TYPES.SET_HIRE_DATE]: (state, data) => {
    state.hire_date = data
  },
  [MUTATION_TYPES.SET_PERSONAL_EMAIL]: (state, data) => {
    state.personal_email = data
  },
  [MUTATION_TYPES.SET_AUTHORISATION]: (state, data) => {
    state.authorisation = data
  },
  [MUTATION_TYPES.SET_DEPARTMENT]: (state, data) => {
    state.department = data
  }

}
