
const GETTER_TYPES = {
    GET_IMG: 'settings/GET_IMG',
    GET_FIRST_NAME: 'settings/GET_FIRST_NAME',
    GET_LAST_NAME: 'settings/GET_LAST_NAME',
    GET_PASSWORD: 'settings/GET_PASSWORD',
}
export default GETTER_TYPES

export const getters = {
    [GETTER_TYPES.GET_IMG]: state => {
        return state.img
    },
    [GETTER_TYPES.GET_FIRST_NAME]: state => {
        return state.first_name
    },
    [GETTER_TYPES.GET_LAST_NAME]: state => {
        return state.last_name
    },
    [GETTER_TYPES.GET_PASSWORD]: state => {
        return state.password
    },
}
