const uuid = (seed => () => `${++seed}`)(0)

module.exports = uuid
