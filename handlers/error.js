// Validation errors
module.exports = class ValidationError extends Error {
  constructor (message, name, res) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    res.status(400).json(message.replace(/"/g, '').replace('value', name))
  }
}
