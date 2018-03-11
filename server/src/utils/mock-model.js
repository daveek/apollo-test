const _ = require('lodash')
const uuid = require('./uuid')

class MockModel {
  constructor() {
    this._db = new Map()
  }

  async get(id) {
    return this._db.get(id)
  }

  async list(filters = {}) {
    return _.filter([...this._db.values()], _.matches(filters))
  }

  async create(data) {
    const record = {
      id: uuid(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...data,
    }
    this._db.set(record.id, record)
    return record
  }

  async delete(id) {
    this._db.remove(id)
  }

  async update(id, data) {
    const record = {
      ...this._db.get(id),
      updatedAt: Date.now(),
      ...data,
    }
    return this.replace(id, record)
  }

  async replace(id, record) {
    this._db.set(id, record)
    return record
  }
}

module.exports = MockModel
