import express from 'express'
import bodyParser from 'body-parser'
import {getMoods, createMood, deleteMood, updateMood} from "./database.js"

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("dist"))

// const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

//returns all moods
app.get('/api/moods', async (req, res) => {
  const moods = await getMoods()
  let newMoods = moods.map(mood => {
    return {...mood, date: mood.date.toLocaleString("en-US")}
  })
  console.log(newMoods)
  res.send(newMoods)
})

//creates a new mood
app.post('/api/moods', async (req, res) => {
  let moodVal= req.body.mood;
  let rating= req.body.rating;
  const mood = await createMood(moodVal, rating)
  mood.date = mood.date.toLocaleString("en-US")
  res.status(201).send(mood)
})

//updates a new mood
app.put('/api/moods/:id', async (req, res) => {
  const id = req.params.id
  const newMood = req.body.newMood
  const newRating = req.body.newRating
  const newDate = new Date()
  const moods = await updateMood(id, newMood, newRating, newDate) 
  let newMoods = moods.map(mood => {
    return {...mood, date: mood.date.toLocaleString("en-US")}
  })
  console.log(newMoods)
  res.send(newMoods)
})

//deletes a new mood
app.delete('/api/moods/:id', async (req, res) => {
  const id = req.params.id
  const moods = await deleteMood(id)
  res.send(moods)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log('listening on port: ' + port))


