import pageGetters from './getters'
import axios from 'axios'
import EmployeesRepository from '../../../repositories/EmployeesRepository'

const ACTION_TYPES = {
  CREATE_EMPLOYEE: 'AddEmployee/CREATE_EMPLOYEE',
  CREATE_USER: 'AddEmployee/CREATE_USER'

}

export default ACTION_TYPES

export const actions = {

  async [ACTION_TYPES.CREATE_EMPLOYEE] ({ commit, state, getters }, item) {
    let CNP = getters[pageGetters.GET_CNP]
    let first_name = getters[pageGetters.GET_FIRST_NAME]
    let last_name = getters[pageGetters.GET_LAST_NAME]
    let birthday = getters[pageGetters.GET_BIRTHDAY]
    let sex = getters[pageGetters.GET_SEX]
    let phone_number = getters[pageGetters.GET_PHONE_NUMBER]
    let hire_date = getters[pageGetters.GET_HIRE_DATE]
    let personal_email = getters[pageGetters.GET_PERSONAL_EMAIL]
    let authorisation = getters[pageGetters.GET_AUTHORISATION]
    let department = getters[pageGetters.GET_DEPARTMENT]

    const registerResponse = await axios.post('http://192.168.10.10/api/employees',
      {
        CNP: CNP,
        first_name: first_name,
        last_name: last_name,
        birthday: birthday,
        sex: sex,
        phone_number: phone_number,
        hire_date: hire_date,
        personal_email: personal_email,
        authorisation: authorisation.id,
        department: department.id
      })
  },


  async [ACTION_TYPES.CREATE_USER] ({ commit, state, getters }, item) {
    let employees = await new EmployeesRepository().getAll()
    let email = getters[pageGetters.GET_EMAIL]
    let password = getters[pageGetters.GET_PASSWORD]
    let employee_id
    employees = employees.reverse()
    let user = {
      email: email,
      password: password,
      employee_id:employee_id[0]
    }

    const response = await axios.patch(`/api/update`, user)

  }

}
