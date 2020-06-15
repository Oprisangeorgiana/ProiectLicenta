
const MUTATIONS_TYPES = {
    SET_IMG: 'settings/SET_IMG',
    SET_PHONE_NUMBER: 'settings/SET_PHONE_NUMBER',
    SET_LAST_NAME: 'settings/SET_LAST_NAME',
    SET_PASSWORD: 'settings/SET_PASSWORD',
}

export default MUTATIONS_TYPES

export const mutations = {
    [MUTATIONS_TYPES.SET_IMG]: (state, data) => {
        state.img = data
    },
    [MUTATIONS_TYPES.SET_PHONE_NUMBER]: (state, data) => {
        state.phone_number = data
    },
    [MUTATIONS_TYPES.SET_LAST_NAME]: (state, data) => {
        state.last_name = data
    },
    [MUTATIONS_TYPES.SET_PASSWORD]: (state, data) => {
        state.password = data
    },
}
