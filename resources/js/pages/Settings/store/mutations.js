
const MUTATIONS_TYPES = {
    SET_USER: 'settings/SET_USER',
    SET_IMG: 'settings/SET_IMG',
    SET_FIRST_NAME: 'settings/SET_FIRST_NAME',
    SET_LAST_NAME: 'settings/SET_LAST_NAME',
    SET_PASSWORD: 'settings/SET_PASSWORD',
}

export default MUTATIONS_TYPES

export const mutations = {
    [MUTATIONS_TYPES.SET_USER]: (state, data) => {
        state.user = data
    },

    [MUTATIONS_TYPES.SET_IMG]: (state, data) => {
        state.img = data
    },
    [MUTATIONS_TYPES.SET_FIRST_NAME]: (state, data) => {
        state.first_name = data
    },
    [MUTATIONS_TYPES.SET_LAST_NAME]: (state, data) => {
        state.last_name = data
    },
    [MUTATIONS_TYPES.SET_PASSWORD]: (state, data) => {
        state.password = data
    },
}
