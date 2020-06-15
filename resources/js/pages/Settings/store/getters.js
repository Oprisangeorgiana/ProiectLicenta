
const GETTER_TYPES = {
    GET_IMG: 'settings/GET_IMG',
    GET_PHONE_NUMBER: 'settings/GET_PHONE_NUMBER',
    GET_LAST_NAME: 'settings/GET_LAST_NAME',
    GET_PASSWORD: 'settings/GET_PASSWORD',
}
export default GETTER_TYPES

export const getters = {
    [GETTER_TYPES.GET_IMG]: state => {
        return state.img
    },
    [GETTER_TYPES.GET_PHONE_NUMBER]: state => {
        return state.phone_number
    },
    [GETTER_TYPES.GET_LAST_NAME]: state => {
        return state.last_name
    },
    [GETTER_TYPES.GET_PASSWORD]: state => {
        return state.password
    },
}
