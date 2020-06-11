import pageMutations from './mutations'
import TasksRepository from '../../../repositories/TasksRepository'


const ACTION_TYPES = {
  FETCH_PAGE_DETAILS: 'calendar/FETCH_PAGE_DETAILS',

}

export default ACTION_TYPES

export const actions = {
  // async [ACTION_TYPES.FETCH_PAGE_DETAILS] ({ commit, state }) {
  //   let listTasks = await new TasksRepository().getAll()
  //   let list = []
  //   let item
  //   for (item in listTasks)
  //   list.push({
  //     name: item.task,
  //     // start: `${listTasks.start_date} ${listTasks.start_hour}`,
  //     // end: `${listTasks.deadline} ${listTasks.end_hour}`,
  //   });
  //
  //   //if
  //   console.log('events list', list),
  //   commit(pageMutations.SET_EVENTS, list)
  // },


}
