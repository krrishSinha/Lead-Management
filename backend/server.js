const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const leadRoutes = require('./routes/lead.routes')

const app = express()
app.use(express.json())
require('dotenv').config()

app.use(cors({ 
    origin: 'https://lead-management-1-15lg.onrender.com',
    credentials: true
 }))

const PORT = process.env.PORT || 8000

app.use('/api/v1/leads', leadRoutes)

connectDB(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(PORT, () => console.log(`Server running on ${PORT}`))
    })
    .catch(err => {
        console.error('DB connection error:', err)
        process.exit(1)
    })