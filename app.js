const validator = require('validator')
const getNotes = require('./notes.js')

const note = getNotes()

console.log(note)

console.log(validator.isURL('https://mead.o'))