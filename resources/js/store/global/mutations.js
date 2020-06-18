const MUTATION_TYPES = {
  SET_PROJECTS: 'global/SET_PROJECTS',
  SET_TOKEN: 'global/SET_TOKEN',
  SET_USER: 'global/SET_USER',
  SET_USER_NAME: 'global/SET_USER_NAME',
  SET_USER_AUTH: 'global/SET_USER_AUTH',
  SET_TASKS: 'global/SET_TASKS',
  SET_DEPARTMENTS: 'global/SET_DEPARTMENTS',
  SET_PROJECT_NAME: 'global/SET_PROJECT_NAME',
  SET_PROJECT_DEADLINE: 'global/SET_PROJECT_DEADLINE',
  SET_PROJECT_DEPARTMENT: 'global/SET_PROJECT_DEPARTMENT',
  SET_EMPLOYEES: 'global/SET_EMPLOYEES',
  SET_SUBTASKS: 'global/SET_SUBTASKS',
  SET_CURRENT_EMPLOYEE: 'global/SET_CURRENT_EMPLOYEE',
  SET_EMPLOYEE_PAGE: 'global/SET_EMPLOYEE_PAGE',
  SET_AUTHORISATIONS: 'global/SET_AUTHORISATIONS',
  SET_FILTERED_EMPLOYEES: 'board/SET_FILTERED_EMPLOYEES',

}
export default MUTATION_TYPES

export const mutations = {
  [MUTATION_TYPES.SET_PROJECTS]: (state, data) => {
    state.projects = data
  },

  [MUTATION_TYPES.SET_TOKEN]: (state, data) => {
    state.token = data
  },

  [MUTATION_TYPES.SET_USER]: (state, data) => {
    state.user = data
  },
  [MUTATION_TYPES.SET_USER_NAME]: (state, data) => {
    state.user_name = data
  },
  [MUTATION_TYPES.SET_USER_AUTH]: (state, data) => {
    state.user_auth = data
  },
  [MUTATION_TYPES.SET_TASKS]: (state, data) => {
    state.tasks = data
  },
  [MUTATION_TYPES.SET_DEPARTMENTS]: (state, data) => {
    state.departments = data
  },
  [MUTATION_TYPES.SET_PROJECT_NAME]: (state, data) => {
    state.project_name = data
  },
  [MUTATION_TYPES.SET_PROJECT_DEADLINE]: (state, data) => {
    state.project_deadline = data
  },
  [MUTATION_TYPES.SET_PROJECT_DEPARTMENT]: (state, data) => {
    state.project_department = data
  },
  [MUTATION_TYPES.SET_EMPLOYEES]: (state, data) => {
    state.employees = data
  },
  [MUTATION_TYPES.SET_SUBTASKS]: (state, data) => {
    state.subtasks = data
  },
  [MUTATION_TYPES.SET_CURRENT_EMPLOYEE]: (state, data) => {
    state.currentEmployee = data
  },
  [MUTATION_TYPES.SET_EMPLOYEE_PAGE]: (state, data) => {
    state.employee_page = data
  },
  [MUTATION_TYPES.SET_AUTHORISATIONS]: (state, data) => {
    state.authorisations = data
  },
  [MUTATION_TYPES.SET_FILTERED_EMPLOYEES]: (state, data) => {
    state.filtered_employees = data
  },

}
