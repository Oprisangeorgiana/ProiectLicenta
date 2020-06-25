import settingsMutations from './mutations'
import globalGetters from '../../../store/global/getters'
import EmployeesRepository from '../../../repositories/EmployeesRepository'
import globalActions from '../../../store/global/actions'
import localGetters from './getters'
import UsersRepository from '../../../repositories/UsersRepository'
import axios from 'axios'

const ACTION_TYPES = {
  FETCH_DATA: 'settings/FETCH_DATA',

  UPDATE_USER: 'settings/UPDATE_USER',

  UPDATE_IMG: 'settings/UPDATE_IMG',
  UPDATE_FIRST_NAME: 'settings/UPDATE_FIRST_NAME',
  UPDATE_LAST_NAME: 'settings/UPDATE_LAST_NAME',
  UPDATE_PASSWORD: 'settings/UPDATE_PASSWORD'

}

export default ACTION_TYPES

export const actions = {
  async [ACTION_TYPES.FETCH_DATA] ({ dispatch, commit, state, getters }, item) {
    await dispatch(globalActions.FETCH_USER)
    let user = _.cloneDeep(getters[globalGetters.GET_USER])
    let employee = await new EmployeesRepository().getOne(user.employee_id)
    commit(settingsMutations.SET_USER, user)
    commit(settingsMutations.SET_EMPLOYEE, employee)
  },

  async [ACTION_TYPES.UPDATE_USER] ({ commit, state, getters }, item) {

    let user = getters[localGetters.GET_USER]

    console.log('user', user)

    if (getters[localGetters.GET_PASSWORD]) {
      user['password'] = getters[localGetters.GET_PASSWORD]
    }

    const response = await axios.patch(`/api/update`, user)

  }
}
