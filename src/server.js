// Server.js : - server handle like - server start, close, error handle etc.
import express from 'express';


const app = express()


app.get('/', (req, res) => {
    res.send('Welcome to - My Library Management System!')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})