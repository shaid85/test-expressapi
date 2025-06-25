// Server.js : - server handle like - server start, close, error handle etc.
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BookModel from './app/models/book.model.js';
import { dbConnect } from './lib/db.js'

// Load environment variables
dotenv.config();

const app = express()


app.get('/', (req, res) => {
    res.send('Welcome to - My Library Management System!')
})

app.get('/api/books', async (req, res) => {
    try {
        await dbConnect(process.env.MONGODB_URL);
        const data = await BookModel.find()
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
})

const port = process.env.PORT || 8080

async function main() {
    try {

        if (process.env.NODE_ENV !== 'production') {
            app.listen(process.env.PORT || 3000, () => {
                console.log(`Server running locally on port: ${port}`)
            })
        }

    } catch (error) {
        console.log('MongoDB connected Error: ', error)
        process.exit(1)
    }
}

main()


export default app