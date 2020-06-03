const MUTATION_TYPES = {
    SET_PROJECTS: 'global/SET_PROJECTS',
}
export default MUTATION_TYPES

export const mutations = {
    [MUTATION_TYPES.SET_PROJECTS]: (state, data) => {
        state.projects = data
    },


}
