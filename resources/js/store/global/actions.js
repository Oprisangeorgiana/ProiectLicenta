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

}

export default ACTION_TYPES

export const actions = {
  async [ACTION_TYPES.FETCH_PROJECTS] ({ commit, state, getters }) {
    let projects = await new ProjectsRepository().getAll()
    let user = getters[pageGetters.GET_USER]
    let employees = await new EmployeesRepository().getAll()
    let dept = null
    let projectsList = []
    //din ce departamnent face parte user-ul curent
    Object.keys(employees).forEach(key => {
      if (employees[key].id === user.employee_id) {
        dept = employees[key].department
      }
    })

    Object.keys(projects).forEach(key => {
      if (projects[key].department_id === dept.id) {
        projectsList.push(projects[key])
      }
    })

    commit(pageMutations.SET_PROJECTS, projectsList)
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
        // console.log('verificare', auth)
      }
    })
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

    // console.log('tasksListactions', tasksList)
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
    commit(pageMutations.SET_SUBTASKS, subtasks)
  },
  async [ACTION_TYPES.FETCH_AUTHORISATIONS] ({ commit, state }) {
    let auth = await new AuthorisationsRepository().getAll()
    commit(pageMutations.SET_AUTHORISATIONS, auth)
  },
  async [ACTION_TYPES.CREATE_PROJECT] ({ commit, state, getters }) {
    const project_name = getters[pageGetters.GET_PROJECT_NAME]
    const project_deadline = getters[pageGetters.GET_PROJECT_DEADLINE]
    const project_department = getters[pageGetters.GET_PROJECT_DEPARTMENT]

    console.log('project_name', project_name)
    console.log('project_deadline', project_deadline)
    console.log('project_department', project_department)

    const registerResponse = await axios.post('http://192.168.10.10/api/projects',
      {
        name: project_name,
        deadline: project_deadline,
        department_id: project_department.id

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
    // console.log('selected_employee', selected_employee)
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
  }

}
