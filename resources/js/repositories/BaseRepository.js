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
        console.log(this.baseURL)
        return response.data

    }


    async create (data) {
        const response = await axios.post(`${this.baseURL}`, data)
        return response.data
    }

    async update (item) {
        const response = await axios.patch(`${this.baseURL}/${item.id}`, item)
        // console.log('item',`${this.baseURL}/${item.id}`)
        return response.data
    }

    async delete (item) {
        const response = await axios.delete(`${this.baseURL}/${item.id}`)
    }

}

export default BaseRepository
