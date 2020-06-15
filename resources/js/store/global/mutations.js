const MUTATION_TYPES = {
  SET_PROJECTS: 'global/SET_PROJECTS',
  SET_TOKEN: 'global/SET_TOKEN',
  SET_USER: 'global/SET_USER',
  SET_TASKS: 'global/SET_TASKS',
  SET_DEPARTMENTS: 'global/SET_DEPARTMENTS',
  SET_PROJECT_NAME: 'global/SET_PROJECT_NAME',
  SET_PROJECT_DEADLINE: 'global/SET_PROJECT_DEADLINE',
  SET_PROJECT_DEPARTMENT: 'global/SET_PROJECT_DEPARTMENT',
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
  }

}
