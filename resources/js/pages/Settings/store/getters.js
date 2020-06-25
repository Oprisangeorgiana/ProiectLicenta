
const GETTER_TYPES = {
    GET_USER: 'settings/GET_USER',
    GET_EMPLOYEE: 'settings/GET_EMPLOYEE',
    GET_IMG: 'settings/GET_IMG',
    GET_NAME: 'settings/GET_NAME',
    GET_PASSWORD: 'settings/GET_PASSWORD',
    GET_EMAIL: 'settings/GET_EMAIL',
}
export default GETTER_TYPES

export const getters = {

    [GETTER_TYPES.GET_USER]: state => {
        return state.user
    },
    [GETTER_TYPES.GET_EMPLOYEE]: state => {
        return state.employee
    },

    [GETTER_TYPES.GET_IMG]: state => {
        return state.img
    },
    [GETTER_TYPES.GET_NAME]: state => {
        return state.user.name
    },
    [GETTER_TYPES.GET_PASSWORD]: state => {
        return state.password
    },
    [GETTER_TYPES.GET_EMAIL]: state => {
        return state.user.intern_email
    },
}
