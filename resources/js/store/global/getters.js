const GETTER_TYPES = {
  GET_PROJECTS: 'global/GET_PROJECTS',
  GET_TOKEN: 'global/GET_TOKEN',
  GET_USER: 'global/GET_USER',
  GET_USER_NAME: 'global/GET_USER_NAME',
  GET_USER_AUTH: 'global/GET_USER_AUTH',
  GET_TASKS: 'global/GET_TASKS',
  GET_DEPARTMENTS: 'global/GET_DEPARTMENTS',
  GET_PROJECT_NAME: 'global/GET_PROJECT_NAME',
  GET_PROJECT_DEADLINE: 'global/GET_PROJECT_DEADLINE',
  GET_EMPLOYEES: 'global/GET_EMPLOYEES',
  GET_SUBTASKS: 'global/GET_SUBTASKS',
  GET_CURRENT_EMPLOYEE: 'global/GET_CURRENT_EMPLOYEE',
  GET_EMPLOYEE_PAGE: 'global/GET_EMPLOYEE_PAGE',
  GET_AUTHORISATIONS: 'global/GET_AUTHORISATIONS',
  GET_FILTERED_EMPLOYEES: 'board/GET_FILTERED_EMPLOYEES',
  GET_NOTIFICATIONS: 'board/GET_NOTIFICATIONS',
  GET_COUNT_NOTIFICATIONS: 'board/GET_COUNT_NOTIFICATIONS',


}
export default GETTER_TYPES

export const getters = {
  [GETTER_TYPES.GET_PROJECTS]: (state, getters) => {
    return state.projects
  },

  [GETTER_TYPES.GET_TOKEN]: (state, getters) => {
    return state.token
  },

  [GETTER_TYPES.GET_USER]: (state, getters) => {
    return state.user
  },
  [GETTER_TYPES.GET_USER_NAME]: (state, getters) => {
    return state.user_name
  },
  [GETTER_TYPES.GET_USER_AUTH]: (state, getters) => {
    return state.user_auth
  },
  [GETTER_TYPES.GET_TASKS]: (state, getters) => {
    return state.tasks
  },
  [GETTER_TYPES.GET_DEPARTMENTS]: (state, getters) => {
    return state.departments
  },
  [GETTER_TYPES.GET_PROJECT_NAME]: (state, getters) => {
    return state.project_name
  },
  [GETTER_TYPES.GET_PROJECT_DEADLINE]: (state, getters) => {
    return state.project_deadline
  },
  [GETTER_TYPES.GET_EMPLOYEES]: (state, getters) => {
    return state.employees
  },
  [GETTER_TYPES.GET_SUBTASKS]: (state, getters) => {
    return state.subtasks
  },
  [GETTER_TYPES.GET_CURRENT_EMPLOYEE]: (state, getters) => {
    return state.currentEmployee
  },
  [GETTER_TYPES.GET_EMPLOYEE_PAGE]: (state, getters) => {
    return state.employee_page
  },
  [GETTER_TYPES.GET_AUTHORISATIONS]: (state, getters) => {
    return state.authorisations
  },
  [GETTER_TYPES.GET_FILTERED_EMPLOYEES]: (state, getters) => {
    return state.filtered_employees
  },
  [GETTER_TYPES.GET_NOTIFICATIONS]: (state, getters) => {
    return state.notifications
  },
  [GETTER_TYPES.GET_COUNT_NOTIFICATIONS]: (state, getters) => {
    return state.countNotifications
  },
}



