import pageMutations from './mutations'
import ProjectsRepository from "../../repositories/ProjectsRepository";


const ACTION_TYPES = {
    FETCH_DETAILS: 'global/FETCH_DETAILS',
}

export default ACTION_TYPES

export const actions = {
    async [ACTION_TYPES.FETCH_DETAILS] ({ commit, state }) {
        let projects = await new ProjectsRepository().getAll()
            commit(pageMutations.SET_PROJECTS, projects)
    },


}
