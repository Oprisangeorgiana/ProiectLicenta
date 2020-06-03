const MUTATION_TYPES = {
    SET_TASKS: 'board/SET_TASKS',
    SET_DESCRIPTION: 'board/SET_DESCRIPTION',
    SET_DEADLINE: 'board/SET_DEADLINE',
    SET_TASK_TYPE: 'board/SET_TASK_TYPE',
    SET_START_DATE: 'board/SET_START_DATE',
    SET_START_HOUR: 'board/SET_START_HOUR',
    SET_END_HOUR: 'board/SET_END_HOUR',
    SET_PROJECT_TASK: 'board/SET_PROJECT_TASK',

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
    [MUTATION_TYPES.SET_START_DATE]: (state, data) => {
        state.start_date  = data
    },
    [MUTATION_TYPES.SET_START_HOUR]: (state, data) => {
        state.start_hour  = data
    },
    [MUTATION_TYPES.SET_END_HOUR]: (state, data) => {
        state.end_hour  = data
    },
    [MUTATION_TYPES.SET_PROJECT_TASK]: (state, data) => {
        state.project_task  = data
    },

}
