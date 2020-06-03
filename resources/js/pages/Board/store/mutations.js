const MUTATION_TYPES = {
    SET_TASKS: 'board/SET_TASKS',
    SET_DESCRIPTION: 'board/SET_DESCRIPTION',
    SET_DEADLINE: 'board/SET_DEADLINE',
    SET_TASK_TYPE: 'board/SET_TASK_TYPE'

}
export default MUTATION_TYPES

export const mutations = {
    [MUTATION_TYPES.SET_TASKS]: (state, data) => {
        state.tasks = data
    },

    [MUTATION_TYPES.SET_DESCRIPTION]: (state, data) => {
        state.description  = data
    },
    [MUTATION_TYPES.SET_DEADLINE]: (state, data) => {
        state.deadline  = data
    },
    [MUTATION_TYPES.SET_TASK_TYPE]: (state, data) => {
        state.task_type  = data
    },

}
