const express = require('express');
const cors = require('cors');
const logger = require('./logger.js');

const app = express();

app.use(express.json())
app.use(cors())

app.use(logger)

let notes = [
    {
        id:1, 
        content:"Primera nota con node"
    },
    {
        id:2, 
        content:"Segunda nota con node"
    }, 
    {
        id:3, 
        content:"Tercera nota con node"
    }
]

app.get('/', (request, response)=> {
    response.send('<h1>Hellow world</h1>')
})

app.get('/notes', (request, response)=> {
    response.json(notes)
})

app.get('/notes/:id', (request, response)=> {
    const id = request.params.id;
    const resp = notes.find((note=> note.id === Number(id)))
    if(resp){
        response.json(resp);
    }else{
        response.status(404).end(' 404 note not found')
    }
    
})

app.delete('/notes/:id', (request, response)=> {
    const id = Number(request.params.id);
    notes = notes.filter((note=> note.id !== id))
    response.json(notes)
})

app.post('/notes/:post', (request, response)=> {
    const note = request.params.post;

    if(!note){
        response.status(400).end("content is missing");
    }

    const ids = notes.map((note) => note.id)
    const maxId = Math.max(...ids) 
    const newNote = {
        id: maxId + 1,
        content: note
    }
    notes = [...notes, newNote]
    response.json(notes);
})


const Port = process.env.Port || 3001
app.listen(Port, ()=> {
    console.log(`Server running on port ${Port}`)
});
