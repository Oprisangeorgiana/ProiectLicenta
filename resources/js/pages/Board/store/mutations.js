const MUTATION_TYPES = {
  SET_TASKS: 'board/SET_TASKS',
  SET_DESCRIPTION: 'board/SET_DESCRIPTION',
  SET_DEADLINE: 'board/SET_DEADLINE',
  SET_TASK_TYPE: 'board/SET_TASK_TYPE',
  SET_START_DATE: 'board/SET_START_DATE',
  SET_START_HOUR: 'board/SET_START_HOUR',
  SET_END_HOUR: 'board/SET_END_HOUR',
  SET_TASK_PROJECT: 'board/SET_TASK_PROJECT',
  SET_TASK_CREATED_BY: 'board/SET_TASK_CREATED_BY',
  SET_EMPLOYEE_ASSIGNED: 'board/SET_EMPLOYEE_ASSIGNED',


}
export default MUTATION_TYPES

export const mutations = {
  [MUTATION_TYPES.SET_TASKS]: (state, data) => {
    state.tasks = data
  },

  [MUTATION_TYPES.SET_DESCRIPTION]: (state, data) => {
    state.description = data
  },
  [MUTATION_TYPES.SET_DEADLINE]: (state, data) => {
    state.deadline = data
  },
  [MUTATION_TYPES.SET_TASK_TYPE]: (state, data) => {
    state.task_type = data
  },
  [MUTATION_TYPES.SET_START_DATE]: (state, data) => {
    state.start_date = data
  },
  [MUTATION_TYPES.SET_START_HOUR]: (state, data) => {
    state.start_hour = data
  },
  [MUTATION_TYPES.SET_END_HOUR]: (state, data) => {
    state.end_hour = data
  },
  [MUTATION_TYPES.SET_TASK_PROJECT]: (state, data) => {
    state.task_project = data
  },
  [MUTATION_TYPES.SET_TASK_CREATED_BY]: (state, data) => {
    state.created_by = data
  },
  [MUTATION_TYPES.SET_EMPLOYEE_ASSIGNED]: (state, data) => {
    state.employee_assigned = data
  },


}
