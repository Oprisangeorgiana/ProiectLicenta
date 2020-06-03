import pageMutations from './mutations'
import TasksRepository from "../../../repositories/TasksRepository"
import pageGetters from './getters'
import axios from 'axios'


const ACTION_TYPES = {
    FETCH_PAGE_DETAILS: 'board/FETCH_PAGE_DETAILS',
    CREATE_TASK: 'board/CREATE_TASK',
}

export default ACTION_TYPES

export const actions = {
    async [ACTION_TYPES.FETCH_PAGE_DETAILS] ({ commit, state }) {
        let tasks = await new TasksRepository().getAll()
        console.log("tasks",tasks),
        commit(pageMutations.SET_TASKS, tasks)
    },

    async [ACTION_TYPES.CREATE_TASK] ({ commit, state, getters }) {
        const description = getters[pageGetters.GET_DESCRIPTION]
        const deadline = getters[pageGetters.GET_DEADLINE]
        const task_type = getters[pageGetters.GET_TASK_TYPE]
        const start_date = getters[pageGetters.GET_START_DATE]
        const start_hour = getters[pageGetters.GET_START_HOUR]
        const end_hour = getters[pageGetters.GET_END_HOUR]
        const project = getters[pageGetters.GET_PROJECT_TASK]


            const registerResponse = await axios.post( 'http://192.168.10.10/api/tasks',
                {
                    task: description,
                    deadline: deadline,
                    task_type: task_type,
                    start_date: start_date,
                    start_hour: start_hour,
                    end_hour:end_hour,
                    project:project
                })

        }


}
