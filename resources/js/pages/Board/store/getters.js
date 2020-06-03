const GETTER_TYPES = {
    GET_TASKS: 'board/GET_TASKS',
    GET_TASK_TYPE: 'board/GET_TASK_TYPE',
    GET_DESCRIPTION: 'board/GET_DESCRIPTION',
    GET_DEADLINE: 'board/GET_DEADLINE',
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

}



