import express from 'express'
import { bmiCalculator } from './bmiCalculator'
import { exerciseCalculator } from './exerciseCalculator'

const app = express()

app.use(express.json());

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

app.post('/exercises', (_req, res) => {

  const { daily_exercises, target } = _req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const result = exerciseCalculator(daily_exercises, target);

  return res.send({ result })
  
});

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})