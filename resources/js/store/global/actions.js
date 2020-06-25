import pageMutations from './mutations'
import ProjectsRepository from '../../repositories/ProjectsRepository'
import pageGetters, { getters } from './getters'
import TasksRepository from '../../repositories/TasksRepository'
import axios from 'axios'
import DepartmentsRepository from '../../repositories/DepartmentsRepository'
import EmployeesRepository from '../../repositories/EmployeesRepository'
import SubtasksRepository from '../../repositories/SubtasksRepository'
import AuthorisationsRepository from '../../repositories/AuthorisationsRepository'

const ACTION_TYPES = {
  FETCH_PROJECTS: 'global/FETCH_PROJECTS',
  FETCH_TOKEN: 'global/FETCH_TOKEN',
  FETCH_USER: 'global/FETCH_USER',
  FETCH_USER_NAME: 'global/FETCH_USER_NAME',
  FETCH_USER_AUTH: 'global/FETCH_USER_AUTH',
  DESTROY_TOKEN: 'global/DESTROY_TOKEN',
  FETCH_PAGE_TASKS: 'global/FETCH_PAGE_TASKS',
  FETCH_DEPARTMENTS: 'global/FETCH_DEPARTMENTS',
  FETCH_EMPLOYEES: 'global/FETCH_EMPLOYEES',
  CREATE_PROJECT: 'global/CREATE_PROJECT',
  FETCH_SUBTASKS: 'global/FETCH_SUBTASKS',
  FETCH_CURRENT_EMPLOYEE: 'global/FETCH_CURRENT_EMPLOYEE',
  FETCH_EMPLOYEE_PAGE: 'global/FETCH_EMPLOYEE_PAGE',
  FETCH_AUTHORISATIONS: 'global/FETCH_AUTHORISATIONS',
  FETCH_FILTERED_EMPLOYEES: 'board/FETCH_FILTERED_EMPLOYEES',
  FETCH_NOTIFICATIONS: 'board/FETCH_NOTIFICATIONS',
  FETCH_COUNT_NOTIFICATIONS: 'board/FETCH_COUNT_NOTIFICATIONS'

}

export default ACTION_TYPES

export const actions = {
  async [ACTION_TYPES.FETCH_PROJECTS] ({ commit, state, getters }) {
    let projects = await new ProjectsRepository().getAll()
    let tasksList = getters[pageGetters.GET_TASKS]
    let user = getters[pageGetters.GET_USER]
    let currentEmployee = getters[pageGetters.GET_CURRENT_EMPLOYEE]
    let employees = await new EmployeesRepository().getAll()
    let authorisation = getters[pageGetters.GET_USER_AUTH]
    let dept = null
    let idProjectsList = []
    let projectsList = []
    //din ce departamnent face parte user-ul curent

    if (authorisation === 1) {
      Object.keys(tasksList).forEach(key1 => {
        idProjectsList.push(tasksList[key1].project)
      })
      idProjectsList = _.uniq(idProjectsList)
      idProjectsList.forEach(function (id) {
        // for(let id in idProjectsList){
        Object.keys(projects).forEach(key2 => {
          if (id === projects[key2].id) {
            projectsList.push(projects[key2])
          }
        })
      })
    }
    // console.log('projectsList', projectsList)
    // console.log('idProjectsList', idProjectsList)

    if (authorisation === 2) {
      Object.keys(projects).forEach(key => {
        projectsList.push(projects[key])
      })
    }

    if (authorisation === 3) {
      Object.keys(projects).forEach(key => {
        projectsList.push(projects[key])
      })
    }

    commit(pageMutations.SET_PROJECTS, projectsList)
  },

  async [ACTION_TYPES.FETCH_TOKEN] ({ state, commit, dispatch, getters }, { username, password }) {
    await axios.post('/api/login', {
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
    await  axios.get('/api/user', {}).then(
      response => {
        commit(pageMutations.SET_USER, response.data)
      }
    )
  },
  async [ACTION_TYPES.FETCH_USER_NAME] ({ state, commit, dispatch, getters }) {

    let employees = await new EmployeesRepository().getAll()
    let user = getters[pageGetters.GET_USER]
    let name = null
    Object.keys(employees).forEach(key => {
      if (employees[key].id === user.employee_id) {
        name = `${employees[key].last_name} ${employees[key].first_name}`
        // name = employees[key].last_name
      }
    })
    commit(pageMutations.SET_USER_NAME, name)

  },
  async [ACTION_TYPES.FETCH_USER_AUTH] ({ state, commit, dispatch, getters }) {

    let employeesList = await new EmployeesRepository().getAll()
    let currentUser = getters[pageGetters.GET_USER]
    let auth = null
    Object.keys(employeesList).forEach(key => {
      if (employeesList[key].id === currentUser.employee_id) {
        auth = employeesList[key].authorisation_id
      }
    })
    commit(pageMutations.SET_USER_AUTH, auth)

  },

  async [ACTION_TYPES.DESTROY_TOKEN] ({ state, commit, dispatch, getters }) {
    localStorage.removeItem('access_token')
    commit(pageMutations.SET_USER, null)
    commit(pageMutations.SET_TOKEN, null)
  },

  async [ACTION_TYPES.FETCH_PAGE_TASKS] ({ commit, state, getters }) {
    let tasks = await new TasksRepository().getAll()
    let employees = await new EmployeesRepository().getAll()
    let user = getters[pageGetters.GET_USER]
    let tasksList = []
    // aflam autorizarea user-ului curent
    let auth = null
    let dept = null

    Object.keys(employees).forEach(key => {
      if (employees[key].id === user.employee_id) {
        auth = employees[key].authorisation_id
        dept = employees[key].department_id
      }
    })
    console.log('dept', dept)
    //aduc task-urile userului curent

    Object.keys(tasks).forEach(key => {
      if (tasks[key].employee === user.employee_id) {
        tasksList.push(tasks[key])
      }
    })
    // aduc task-urile celor care au autorizare mai mica
    Object.keys(employees).forEach(key2 => {
      if (auth === 2) {
        if (employees[key2].authorisation_id < auth) {
          if (employees[key2].department_id === dept) {
            Object.keys(tasks).forEach(key1 => {
              if (employees[key2].id === tasks[key1].employee) {
                tasksList.push(tasks[key1])
              }
            })
          }
        }
      }
      if (auth === 3) {
        if (employees[key2].authorisation_id < auth) {
          Object.keys(tasks).forEach(key1 => {
            if (employees[key2].id === tasks[key1].employee) {
              tasksList.push(tasks[key1])
            }
          })
        }
      }
    })
    commit(pageMutations.SET_TASKS, tasksList)
  },
  async [ACTION_TYPES.FETCH_DEPARTMENTS] ({ commit, state }) {
    let departments = await new DepartmentsRepository().getAll()
    commit(pageMutations.SET_DEPARTMENTS, departments)
  },
  async [ACTION_TYPES.FETCH_EMPLOYEES] ({ commit, state }) {
    let employees = await new EmployeesRepository().getAll()
    commit(pageMutations.SET_EMPLOYEES, employees)
  },
  async [ACTION_TYPES.FETCH_SUBTASKS] ({ commit, state }) {
    let subtasks = await new SubtasksRepository().getAll()
    let tasks = getters[pageGetters.GET_TASKS]
    let currentEmployee = getters[pageGetters.GET_CURRENT_EMPLOYEE]
    let listSubtasks = []

    Object.keys(tasks).forEach(key1 =>{
      Object.keys(subtasks).forEach(key2=>{
        if(subtasks[key2].task_id === tasks[key1].id)
          listSubtasks.push(subtasks[key])
      })
    })

    commit(pageMutations.SET_SUBTASKS, listSubtasks)
  },

  async [ACTION_TYPES.FETCH_AUTHORISATIONS] ({ commit, state }) {
    let auth = await new AuthorisationsRepository().getAll()
    commit(pageMutations.SET_AUTHORISATIONS, auth)
  },

  async [ACTION_TYPES.CREATE_PROJECT] ({ commit, state, getters }) {
    const project_name = getters[pageGetters.GET_PROJECT_NAME]
    const project_deadline = getters[pageGetters.GET_PROJECT_DEADLINE]

    const registerResponse = await axios.post('http://192.168.10.10/api/projects',
      {
        name: project_name,
        deadline: project_deadline,
      })
  },
  async [ACTION_TYPES.FETCH_CURRENT_EMPLOYEE] ({ commit, state, getters }) {
    let employees = await new EmployeesRepository().getAll()
    let user = getters[pageGetters.GET_USER]
    let current_employee = null
    Object.keys(employees).forEach(key => {
      if (employees[key].id === user.employee_id) {
        current_employee = employees[key]
      }
    })
    commit(pageMutations.SET_CURRENT_EMPLOYEE, current_employee)
  },
  async [ACTION_TYPES.FETCH_EMPLOYEE_PAGE] ({ commit, state, getters }, selected) {
    let allEmployees = await new EmployeesRepository().getAll()
    // let allUsers = await new UserRepository().getAll()
    let selected_employee = {}
    Object.keys(allEmployees).forEach(key => {
      if (parseInt(selected) === allEmployees[key].id) {
        // console.log('allEmployees', allEmployees[key])
        selected_employee = allEmployees[key]
      }
    })
    // console.log('allUsers', allUsers)
    commit(pageMutations.SET_EMPLOYEE_PAGE, selected_employee)
  },
  async [ACTION_TYPES.FETCH_FILTERED_EMPLOYEES] ({ commit, state, getters }) {
    const auth = getters[pageGetters.GET_USER_AUTH]
    const employees = await new EmployeesRepository().getAll()
    const currentEmployee = getters[pageGetters.GET_CURRENT_EMPLOYEE]
    let list = []

    if (auth === 2) {
      Object.keys(employees).forEach(key => {
        if (employees[key].department_id === currentEmployee.department_id) {
          list.push(employees[key])
        }
      })
    }
    if (auth === 3) {
      Object.keys(employees).forEach(key => {
        list.push(employees[key])
      })
    }
    // console.log('list',list)
    commit(pageMutations.SET_FILTERED_EMPLOYEES, list)
  },
  async [ACTION_TYPES.FETCH_NOTIFICATIONS] ({ commit, state, getters }) {
    let tasksList = getters[pageGetters.GET_TASKS]
    let count = 0
    let tomorrow = new Date()
    tomorrow.setDate(new Date().getDate() + 1)
    const toTwoDigits = num => num < 10 ? '0' + num : num
    let year = tomorrow.getFullYear()
    let month = toTwoDigits(tomorrow.getMonth() + 1)
    let day = toTwoDigits(tomorrow.getDate())
    // console.log('tomorrow', `${year}-${month}-${day}`)
    let notificationsList = []
    let list = tasksList
    Object.keys(tasksList).forEach(key => {
      // console.log('item.deadline', list[key].deadline)
      let data = {}
      if (tasksList[key].deadline === `${year}-${month}-${day}`) {
        count = count + 1
        data.id = tasksList[key].id
        data.task_type = tasksList[key].task_type
        data.name = tasksList[key].task
        data.start = `${tasksList[key].start_date} ${tasksList[key].start_hour}`
        data.end_date = tasksList[key].deadline
        data.end_hour = tasksList[key].end_hour
        notificationsList.push(data)
      }
    })
    console.log('notificationsList', notificationsList)
    commit(pageMutations.SET_NOTIFICATIONS, notificationsList)
  },
  async [ACTION_TYPES.FETCH_COUNT_NOTIFICATIONS] ({ commit, state, getters }) {
    let notifications = getters[pageGetters.GET_NOTIFICATIONS]
    let count = 0
    Object.keys(notifications).forEach(key =>{
      count = count + 1;
    })

    console.log('count', count)

    commit(pageMutations.SET_COUNT_NOTIFICATIONS, count)
  }

}

