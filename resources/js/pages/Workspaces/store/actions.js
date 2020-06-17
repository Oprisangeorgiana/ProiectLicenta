import pageMutations from './mutations'
import TasksRepository from '../../../repositories/TasksRepository'
import pageGetters from './getters'
import axios from 'axios'
import ProjectsRepository from '../../../repositories/ProjectsRepository'
import globalGetters from '../../../store/global/getters'

const ACTION_TYPES = {
  FETCH_PAGE_DETAILS: 'workspace/FETCH_PAGE_DETAILS'

}

export default ACTION_TYPES

export const actions = {
  // async [ACTION_TYPES.FETCH_PAGE_DETAILS] ({ commit, state, getters }) {
  //   let tasks = globalGetters.GET_TASKS
  //   let projects = globalGetters.GET_PROJECTS
  //   let selectedProject = pageGetters.GET_CURRENT_PROJECT
  //   let currentProjectTasks = []
  //
  //     let projectID = null
  //     Object.keys(projects).forEach(keyprj => {
  //       if (keyprj === selectedProject) {
  //         projectID = projects[keyprj].id
  //       }
  //     })
  //     Object.keys(tasks).forEach(keytsk => {
  //       if (tasks[keytsk].project === projectID) {
  //         currentProjectTasks.push(tasks[keytsk])
  //       }
  //     })
  //
  //
  //   commit(pageMutations.SET_TASKS_FILTERED, currentProjectTasks)
  // },

}
