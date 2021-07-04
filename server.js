const express = require('express')
const app = express()

const port = 8000

app.get('/', (req, res) => {
  console.log('Client connected')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Access-Control-Allow-Origin', '*')

  const intervalId = setInterval(() => {
    const date = new Date().toLocaleString()
    res.write(`data: ${date}\n\n`)
  }, 1000)

  res.on('close', () => {
    console.log('Client closed connection')
    clearInterval(intervalId)
    res.end()
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
