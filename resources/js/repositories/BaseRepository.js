import axios from 'axios'

class BaseRepository {

    constructor (resource) {
        this.baseURL = `/api/${resource}`
    }

    async getOne (id) {
      const response = await axios.get(`${this.baseURL}/${id}`)
      return response.data
    }

    async getAll () {
        const response = await axios.get(`${this.baseURL}`)
        console.log(response.data)
        console.log(this.baseURL)
        return response.data

    }

    // async get (id) {
    //     let idsList = id
    //     if (!Array.isArray(idsList)) {
    //         idsList = [id]
    //     }
    //     let filterURL = idsList.map(currentID => `id=${currentID}`).join('&')
    //     const response = await axios.get(`${this.baseURL}?${filterURL}`)
    //
    //     return (response.data.length === 1) ? response.data[0] : response.data
    // }

    async create (data) {
        const response = await axios.post(`${this.baseURL}`, data)
        return response.data
    }

    async update (item) {
        const response = await axios.patch(`${this.baseURL}/${item.id}`, item)
        return response.data
    }

    async delete (item) {
        const response = await axios.delete(`${this.baseURL}/${item.id}`)
    }

}

export default BaseRepository
