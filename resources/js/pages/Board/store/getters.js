const GETTER_TYPES = {
    GET_TASKS: 'board/GET_TASKS',
    GET_TASK_TYPE: 'board/GET_TASK_TYPE',
    GET_DESCRIPTION: 'board/GET_DESCRIPTION',
    GET_DEADLINE: 'board/GET_DEADLINE',
    GET_START_DATE: 'board/GET_START_DATE',
    GET_START_HOUR: 'board/GET_START_HOUR',
    GET_END_HOUR: 'board/GET_END_HOUR',
    GET_PROJECT_TASK: 'board/GET_PROJECT_TASK',
}
export default GETTER_TYPES

export const getters = {
    [GETTER_TYPES.GET_TASKS]: (state, getters) => {
        return state.tasks
    },

    [GETTER_TYPES.GET_DESCRIPTION]: (state, getters) => {
        return state.description
    },
    [GETTER_TYPES.GET_DEADLINE]: (state, getters) => {
        return state.deadline
    },
    [GETTER_TYPES.GET_TASK_TYPE]: (state, getters) => {
        return state.task_type
    },

   [GETTER_TYPES.GET_START_DATE]: (state, getters) => {
        return state.start_date
    },

   [GETTER_TYPES.GET_START_HOUR]: (state, getters) => {
        return state.start_hour
    },

   [GETTER_TYPES.GET_END_HOUR]: (state, getters) => {
        return state.end_hour
    },

   [GETTER_TYPES.GET_PROJECT_TASK]: (state, getters) => {
        return state.project_task
    },

}



