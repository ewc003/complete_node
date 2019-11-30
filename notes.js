const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => {
    return "your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('new note added'))
    } else {
        console.log(chalk.red.inverse('duplicate'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    if (notes.length == 0) {
        console.log(chalk.red.inverse('no notes loaded'))
    }

    const resultNotes = notes.filter((note) => note.title !== title)

    if (resultNotes.length < notes.length) {
        console.log(chalk.green.inverse('removed note'))
        saveNotes(resultNotes)
    } else {
        console.log(chalk.red.inverse('note does not exist'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    console.log(chalk.inverse('Your Notes'))
    const notesToList = loadNotes()
    if (notesToList.length == 0) {
        console.log(chalk.red.inverse('no notes to list'))
    }
    notesToList.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if (foundNote) {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    }
    else {
        console.log(chalk.red.inverse('note does not exists'))
    }
}

module.exports = { 
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}