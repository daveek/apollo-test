import axios from 'axios'

/**
 * General abstraction for retrieving records from a provided resource;
 * consumers of the service are unaware of the underlying implementation details.
 *
 * This service happens to wrap a standard REST resource, but the consumers
 * only demand an interface, meaning we can swap out the service's
 * implementation details at any time (e.g., the server design changes).
 */
class RESTService {
  constructor(baseURL) {
    if (typeof baseURL !== 'string') {
      throw new TypeError('baseURL is required when creating a service')
    }
    this._resource = axios.create({ baseURL })
    this._resource.interceptors.response.use(async res => res.data)
  }

  /**
   * Retrieves a single record by its id.
   *
   * @param {string} id - the id of the record to retrieve
   * @returns {Promise<object>} the resolved record
   */
  async get(id) {
    return this._resource.get(`/${id}`)
  }

  /**
   * Retrieves all records, with optional filters applied.
   *
   * @returns {Promise<object[]>} the list of resolved records
   */
  async list(opts = {}) {
    return this._resource.get('/', {
      params: opts,
    })
  }

  /**
   * Creates a new record.
   *
   * @param {object} data - the record to create
   * @returns {Promise<object>} the newly-created record
   */
  async create(data) {
    return this._resource.post('/', data)
  }

  /**
   * Deletes an existing record.
   *
   * @param {string} id - the id of the record to delete
   * @returns {Promise} promise that resolves or rejects depending
   * on whether or not the deletion was successful
   */
  async delete(id) {
    return this._resource.delete(`/${id}`)
  }

  /**
   * Updates an existing record.
   *
   * @param {string} id - the id of the record to update
   * @param {object} data - the keys/values to update (can be a partial record)
   * @returns {Promise<object>} the updated record
   */
  async update(id, data) {
    return this._resource.patch(`/${id}`, data)
  }
}

export default RESTService
