import settingsMutations from './mutations'
import globalGetters from '../../../store/global/getters'
import globalActions from '../../../store/global/actions'
import pageGetters from './getters'
import axios from 'axios'

const ACTION_TYPES = {
  CREATE_USER: 'AddEmployee/FETCH_DATA',
  CREATE_EMPLOYEE: 'AddEmployee/UPDATE_USER'

}

export default ACTION_TYPES

export const actions = {
  async [ACTION_TYPES.FETCH_DATA] ({ dispatch, commit, state, getters }, item) {
    // await dispatch(globalActions.FETCH_USER)
    // let user = _.cloneDeep(getters[globalGetters.GET_USER])
    // let employee = await new EmployeesRepository().getOne(user.employee_id)
    // commit(settingsMutations.SET_USER, user)
    // commit(settingsMutations.SET_EMPLOYEE, employee)
  },
  async [ACTION_TYPES.CREATE_EMPLOYEE] ({ commit, state, getters }, item) {



    const response = await axios.post(`/api/update`, employee)

  },
  async [ACTION_TYPES.CREATE_USER] ({ commit, state, getters }, item) {

    let email = getters[pageGetters.GET_EMAIL]
    let password = getters[pageGetters.GET_PASSWORD]
    let user = {
      email: email,
      password: password
    }

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
    let employee = {
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

    }

    // const response = await axios.patch(`/api/update`, user)

  }

}
