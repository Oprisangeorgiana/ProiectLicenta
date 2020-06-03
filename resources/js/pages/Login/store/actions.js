//
// import pageMutations from './mutations'
// import EmployeesRepository from "../../../repositories/EmployeesRepository";
//
// const ACTION_TYPES = {
//     FETCH_PAGE_DETAILS: 'login/FETCH_PAGE_DETAILS',
//     LOGIN_USER: 'login/LOGIN_USER',
//     LOGOUT_USER: 'login/LOGOUT_USER'
// }
// export default ACTION_TYPES
//
// export const actions = {
//     async [ACTION_TYPES.FETCH_PAGE_DETAILS] ({ commit, state, getters }) {
//         let user = getters[globalGetters.GET_USER]
//         commit(pageMutations.SET_USER, user)
//     },
//     async [ACTION_TYPES.LOGIN_USER] ({ commit, state, dispatch }) {
//
//         let employees = await new EmployeesRepository().getAll()
//
//         let employee = employees.find((user) => userCredentials.email === user.intern_mail)
//         if (employee.password === userCredentials.password) {
//             commit(pageMutations.SET_USER, user)
//         }
//         else
//             commit(pageMutations.SET_USER, null)
//
//         let user = await dispatch(globalActions.LOGIN_USER, { username: this.username, password: this.password })
//         state.commit(pageMutations.SET_USER, user)
//     },
//     async [ACTION_TYPES.LOGOUT_USER] ({ commit, state, dispatch }) {
//         await dispatch(globalActions.LOGOUT_USER)
//         state.commit(pageMutations.UNSET_USER)
//     }
// }
