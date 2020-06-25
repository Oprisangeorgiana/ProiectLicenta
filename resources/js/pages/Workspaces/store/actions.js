import pageMutations from './mutations'
import TasksRepository from '../../../repositories/TasksRepository'
import pageGetters from './getters'
import axios from 'axios'
import ProjectsRepository from '../../../repositories/ProjectsRepository'
import globalGetters from '../../../store/global/getters'

const ACTION_TYPES = {
  FETCH_PAGE_DETAILS: 'workspace/FETCH_PAGE_DETAILS',


}

export default ACTION_TYPES

export const actions = {
  async [ACTION_TYPES.FETCH_PAGE_DETAILS] ({ commit, state }) {
    let tasks = await new TasksRepository().getAll()
    let currentProject = pageGetters.GET_CURRENT_PROJECT
    let task
    let list =[]



    if(currentProject === null)
      return null
    else
    console.log('task.project', tasks)
    for (task in tasks)

    if (currentProject === task.project)
    this.list.push(task)

    commit(pageMutations.SET_TASKS_FILTERED, tasks)
  },


}
