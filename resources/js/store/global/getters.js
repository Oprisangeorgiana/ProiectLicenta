const GETTER_TYPES = {
    GET_PROJECTS: 'global/GET_PROJECTS',

}
export default GETTER_TYPES

export const getters = {
    [GETTER_TYPES.GET_PROJECTS]: (state, getters) => {
        return state.projects
    },


}



