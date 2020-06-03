import settingsMutations from "./mutations"
import EmployeesRepository from "../../../repositories/EmployeesRepository";

const ACTION_TYPES = {
    UPDATE_IMG: 'settings/UPDATE_IMG',
    UPDATE_FIRST_NAME: 'settings/UPDATE_FIRST_NAME',
    UPDATE_LAST_NAME: 'settings/UPDATE_LAST_NAME',
    UPDATE_PASSWORD: 'settings/UPDATE_PASSWORD',

}

export default ACTION_TYPES

export const actions = {
    async [ACTION_TYPES.UPDATE_IMG]({commit, state}, item) {
        let data = await new EmployeesRepository().update(item)
        commit(settingsMutations.SET_IMG, data)
    },
    async [ACTION_TYPES.UPDATE_FIRST_NAME]({commit, state}, item) {
        let data = await new EmployeesRepository().update(item)
        commit(settingsMutations.SET_FIRST_NAME, data)
    },
    async [ACTION_TYPES.UPDATE_LAST_NAME]({commit, state}, item) {
        let data = await new EmployeesRepository().update(item)
        commit(settingsMutations.SET_LAST_NAME, data)
    },
    async [ACTION_TYPES.UPDATE_PASSWORD]({commit, state}, item) {
        let data = await new EmployeesRepository().update(item)
        commit(settingsMutations.SET_PASSWORD, data)
    },
}
