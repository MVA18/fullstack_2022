import express from 'express'
import { bmiCalculator } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (_req, res) => {

  const height = String(_req.query.height)
  const weight = String(_req.query.weight)

  const bmi = bmiCalculator(height, weight)

  res.send({
    weight: weight,
    height: height,
    bmi: bmi
  })

})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})