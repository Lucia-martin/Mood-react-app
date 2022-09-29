import express from 'express'
import bodyParser from 'body-parser'
import {getMoods, getMood, createMood, deleteMood, updateMood} from "./database.js"

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("dist"))

// let sampleMoods = [
//   {
//     id: 1,
//     mood: "i can't",
//     rating: 4,
//     date: new Date().toLocaleString('en-US'),
//   },
//   {
//     id: 2,
//     mood: 'not good i would say',
//     rating: 3,
//     date: new Date().toLocaleString('en-US'),
//   },
// ]

//returns all moods
app.get('/api/moods', async (req, res) => {
  const moods = await getMoods()
  res.send(moods)
})

//creates a new mood
app.post('/api/moods', async (req, res) => {
  let mood= req.body.mood;
  let rating= req.body.rating;
  const newMood = await createMood(mood, rating)
  res.status(201).send(newMood)
})

//updates a new mood
app.put('/api/moods/:id', async (req, res) => {
  const id = req.params.id
  const newMood = req.body.newMood
  const newRating = req.body.newRating
  const moods = await updateMood(id, newMood, newRating) 
  res.send(moods)
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


