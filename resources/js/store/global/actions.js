import pageMutations from './mutations'
import ProjectsRepository from '../../repositories/ProjectsRepository'
import pageGetters from './getters'
import TasksRepository from '../../repositories/TasksRepository'

const ACTION_TYPES = {
  FETCH_DETAILS: 'global/FETCH_DETAILS',
  FETCH_TOKEN: 'global/FETCH_TOKEN',
  FETCH_USER: 'global/FETCH_USER',
  DESTROY_TOKEN: 'global/DESTROY_TOKEN',
  FETCH_PAGE_TASKS: 'global/FETCH_PAGE_TASKS'
}

export default ACTION_TYPES

export const actions = {
  async [ACTION_TYPES.FETCH_DETAILS] ({ commit, state }) {
    let projects = await new ProjectsRepository().getAll()
    console.log('projects', projects)
    commit(pageMutations.SET_PROJECTS, projects)
  },

  async [ACTION_TYPES.FETCH_TOKEN] ({ state, commit, dispatch, getters }, { username, password }) {
    axios.post('/api/login', {
      username: username,
      password: password
    }).then(
      response => {
        const token = response.data.access_token

        localStorage.setItem('access_token', token)
        commit(pageMutations.SET_TOKEN, token)
      }
    )
  },

  async [ACTION_TYPES.FETCH_USER] ({ state, commit, dispatch, getters }) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + getters[pageGetters.GET_TOKEN]
    axios.get('/api/user', {}).then(
      response => {
        commit(pageMutations.SET_USER, response.data)
      }
    )
  },

  async [ACTION_TYPES.DESTROY_TOKEN] ({ state, commit, dispatch, getters }) {
    localStorage.removeItem('access_token')
    commit(pageMutations.SET_USER, null)
    commit(pageMutations.SET_TOKEN, null)
  },

  async [ACTION_TYPES.FETCH_PAGE_TASKS] ({ commit, state }) {
    let tasks = await new TasksRepository().getAll()
    console.log('lista intreaga de taskuri', tasks)
    commit(pageMutations.SET_TASKS, tasks)
  },

}
