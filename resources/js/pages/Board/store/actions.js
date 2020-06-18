import pageMutations from './mutations'
import TasksRepository from '../../../repositories/TasksRepository'
import pageGetters from './getters'
import axios from 'axios'
import ProjectsRepository from '../../../repositories/ProjectsRepository'
import globalGetters from '../../../store/global/getters'
import SubtasksRepository from '../../../repositories/SubtasksRepository'

const ACTION_TYPES = {
  FETCH_PAGE_DETAILS: 'board/FETCH_PAGE_DETAILS',
  CREATE_TASK: 'board/CREATE_TASK',
  CREATE_SUBTASK: 'board/CREATE_SUBTASK',
  UPDATE_TASK: 'board/UPDATE_TASK',
  DELETE_TASK: 'board/DELETE_TASK',
  DELETE_SUBTASK: 'board/DELETE_SUBTASK',
  UPDATE_SUBTASK: 'board/UPDATE_SUBTASK',

}

export default ACTION_TYPES

export const actions = {
  async [ACTION_TYPES.FETCH_PAGE_DETAILS] ({ commit, state }) {
    let tasks = await new TasksRepository().getAll()
    //console.log('tasks', tasks),
    commit(pageMutations.SET_TASKS, tasks)
  },

  async [ACTION_TYPES.CREATE_TASK] ({ commit, state, getters }) {
    const description = getters[pageGetters.GET_DESCRIPTION]
    const deadline = getters[pageGetters.GET_DEADLINE]
    const task_type = getters[pageGetters.GET_TASK_TYPE]
    const start_date = getters[pageGetters.GET_START_DATE]
    const start_hour = getters[pageGetters.GET_START_HOUR]
    const end_hour = getters[pageGetters.GET_END_HOUR]
    const project_data = getters[pageGetters.GET_TASK_PROJECT]
    const user = getters[globalGetters.GET_USER]
    const employee_assigned = getters[pageGetters.GET_EMPLOYEE_ASSIGNED]

    const registerResponse = await axios.post('http://192.168.10.10/api/tasks',
      {
        task: description,
        task_type: task_type,
        employee: employee_assigned.id,
        deadline: deadline,
        start_date: start_date,
        start_hour: start_hour,
        end_hour: end_hour,
        project: project_data.id,
        state: 'COMING'
      })
  },
  async [ACTION_TYPES.CREATE_SUBTASK] ({ commit, state, getters }, newSubtask) {
    const registerResponse = await axios.post('http://192.168.10.10/api/subtasks', newSubtask
    )
  },
  async [ACTION_TYPES.UPDATE_TASK] ({ commit, state, getters }, updated) {
    const updateResponse = await new TasksRepository().update(updated)
    // console.log('updatetask',updated)
  },
  async [ACTION_TYPES.UPDATE_SUBTASK] ({ commit, state, getters }, updatedTask) {
    const updateResponse = await new SubtasksRepository().update(updatedTask)

  },
  async [ACTION_TYPES.DELETE_TASK] ({ commit, state, getters }, deletedTask) {
    const updateResponse = await new TasksRepository().delete(deletedTask)
  },
  async [ACTION_TYPES.DELETE_SUBTASK] ({ commit, state, getters }, deletedTask) {
    const updateResponse = await new SubtasksRepository().delete(deletedTask)
  },


}
