require('./mongoDB');

const express = require('express');
const cors = require('cors');
const logger = require('./logger.js');
const app = express();
const Note = require('./models/Note');

app.use(express.json())
app.use(cors())
app.use(logger)

app.get('/notes', (request, response)=> {
    Note.find({})
    .then(notes => {
        response.json(notes)
        mongoose.connection.close()
    })
    .catch( err => response.status(err.status))
    
})

app.get('/notes/:id', (request, response)=> {
    const id = request.params.id;
    Note.findById(id)
    .then(note => {
        if(note){
            response.json(note)
            mongoose.connection.close()
        }else{
            response.status(404).end('error 404, not found')
        }
    })
    .catch(err => {
        console.log(err)
        return response.end('error 400, bad request')})
})

app.delete('/notes/:id', (request, response)=> {
    const id = request.params.id;
    Note.findByIdAndDelete(id)
    .then(note => {
        if(note){
            response.json(note)
            mongoose.connection.close()
        }else{
            response.status(404).end('error 404, not found')
        }
    })
    .catch(err => {
        console.log(err)
        return response.end('error 400, bad request')})
    
})

app.post('/notes/:post', (request, response)=> {
    const notes = request.params.post;
    console.log('notas:', notes)
    
    if(!notes){
        response.status(400).end("content is missing");
    }

    const newNote = Note({
        content: notes,
        date: new Date()
    })

    newNote.save()
    .then(note => {
        response.json(note);
        mongoose.connection.close();
    })
    .catch(err => response.status(err.status))
    
})


const Port = process.env.PORT || 3001
app.listen(Port, ()=> {
    console.log(`Server running on port ${Port}`)
});
